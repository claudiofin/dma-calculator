import { useTranslation } from '../constants/i18n';

export type StoreModel = 'iap-standard' | 'external-tier1' | 'external-tier2';

export interface CalculatorInputs {
    monthlyUsers: number;
    monthlyPrice: number;
    conversionImpact: number; // 0-50% - only applies to external models
    userAgeMonths: number; // Months since install
    isSmallBusiness: boolean; // Annual revenue < 1M
    isSubscriptionAfterYear?: boolean; // After 1st year: 15% instead of 30%
}

export interface CalculationResult {
    grossRevenue: number;  // Revenue before commissions
    cost: number;          // Total commissions paid
    net: number;           // Revenue after commissions
    rate: number;          // Total commission rate %
    details: string[];     // Breakdown for display
}

// Payment processor fee (Stripe, etc.) - only for external purchases
const PAYMENT_PROCESSOR_FEE = 2.9;

export const useDMACalculator = (inputs: CalculatorInputs) => {
    const { t } = useTranslation();
    const {
        monthlyUsers,
        monthlyPrice,
        conversionImpact,
        userAgeMonths,
        isSmallBusiness,
        isSubscriptionAfterYear = false
    } = inputs;

    // Base revenue metrics for reference (using global inputs)
    const monthlyRevenue = monthlyUsers * monthlyPrice;
    const adjustedRevenue = monthlyRevenue * (1 - conversionImpact / 100);

    // --- Apple Calculations (DMA 2026) ---
    const calculateApple = (model: StoreModel, customUsers?: number): CalculationResult => {
        // Use custom user count if provided, otherwise use hook state
        const users = customUsers !== undefined ? customUsers : monthlyUsers;
        const revenue = users * monthlyPrice;
        // Adjusted revenue for external (conversion drop)
        const adjustedRev = revenue * (1 - conversionImpact / 100);

        let commissionRate = 0;
        let details: string[] = [];

        if (model === 'iap-standard') {
            // Standard IAP: 30% or 15% for Small Business Program
            if (isSmallBusiness) {
                commissionRate = 15;
            } else if (isSubscriptionAfterYear) {
                commissionRate = 15; // Reduced rate after 1st year
                details.push('Abbonamento dopo 1° anno: 15%');
            } else {
                commissionRate = 30;
            }

            const cost = revenue * (commissionRate / 100);

            details = [
                `${t('commission_apple')}: ${commissionRate}%`,
                t('discovery_full'),
                t('conversion_max'),
                ...details
            ];

            return {
                grossRevenue: revenue,
                cost,
                net: revenue - cost,
                rate: commissionRate,
                details
            };
        } else {
            // External Purchase Models (EU DMA 2026)
            const isTier2 = model === 'external-tier2';
            const ctcRate = 5;

            let iafRate = 0;
            if (userAgeMonths < 6 && !isSmallBusiness) {
                iafRate = 2; // Reduced IAF for External Link
            }

            let serviceRate: number;
            if (isTier2) {
                serviceRate = isSmallBusiness ? 10 : 13;
            } else {
                serviceRate = 5;
            }

            commissionRate = ctcRate + serviceRate + iafRate + PAYMENT_PROCESSOR_FEE;

            details = [
                `Core Tech Commission (CTC): ${ctcRate}%`,
                `Store Services (${isTier2 ? 'Tier 2' : 'Tier 1'}): ${serviceRate}%`,
            ];
            if (iafRate > 0) {
                details.push(`Initial Acquisition Fee: ${iafRate}%`);
            } else if (userAgeMonths < 6 && isSmallBusiness) {
                details.push(`IAF: Esentato (Small Business)`);
            }
            details.push(`Stripe/Payment: ~${PAYMENT_PROCESSOR_FEE}%`);

            if (conversionImpact > 0) {
                details.push(`Calo conversione: -${conversionImpact}%`);
            }

            const cost = adjustedRev * (commissionRate / 100);

            return {
                grossRevenue: adjustedRev,
                cost,
                net: adjustedRev - cost,
                rate: commissionRate,
                details
            };
        }
    };

    // --- Google Calculations (DMA 2026) ---
    const calculateGoogle = (model: StoreModel, customUsers?: number): CalculationResult => {
        // Use custom user count if provided
        const users = customUsers !== undefined ? customUsers : monthlyUsers;
        const revenue = users * monthlyPrice;
        const adjustedRev = revenue * (1 - conversionImpact / 100);

        let commissionRate = 0;
        let details: string[] = [];

        if (model === 'iap-standard') {
            if (isSmallBusiness) {
                commissionRate = 15;
            } else if (isSubscriptionAfterYear) {
                commissionRate = 15;
                details.push('Abbonamento dopo 1° anno: 15%');
            } else {
                commissionRate = 30;
            }

            const cost = revenue * (commissionRate / 100);

            details = [
                `${t('commission_google')}: ${commissionRate}%`,
                t('discovery_full'),
                ...details
            ];

            return {
                grossRevenue: revenue,
                cost,
                net: revenue - cost,
                rate: commissionRate,
                details
            };
        } else {
            // External Offers Program (EU DMA)
            const isTier2 = model === 'external-tier2';

            let iafRate = 0;
            if (userAgeMonths < 6) {
                // Google IAF limits? usually 3% for 6 months
                iafRate = 3;
            }

            let serviceRate = 10;
            if (isTier2) {
                serviceRate = 20; // Tier 1 (10%) + Tier 2 (10%) - Corrected to 20%
            }

            commissionRate = serviceRate + iafRate + PAYMENT_PROCESSOR_FEE;

            details = [
                `Ongoing Services (${isTier2 ? 'Tier 2' : 'Tier 1'}): ${serviceRate}%`,
            ];
            if (iafRate > 0) {
                details.push(`Initial Acquisition Fee: ${iafRate}%`);
            }
            details.push(`Stripe/Payment: ~${PAYMENT_PROCESSOR_FEE}%`);

            if (conversionImpact > 0) {
                details.push(`Calo conversione: -${conversionImpact}%`);
            }

            const cost = adjustedRev * (commissionRate / 100);

            return {
                grossRevenue: adjustedRev,
                cost,
                net: adjustedRev - cost,
                rate: commissionRate,
                details
            };
        }
    };

    return {
        calculateApple,
        calculateGoogle,
        metrics: {
            monthlyRevenue,
            adjustedRevenue
        }
    };
};
