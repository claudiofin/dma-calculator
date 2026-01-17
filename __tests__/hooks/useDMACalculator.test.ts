/**
 * Unit tests for useDMACalculator hook
 * Tests all commission calculations for Apple and Google under DMA 2026
 */
import { vi, describe, it, expect } from 'vitest';

// Mock i18n
vi.mock('../../constants/i18n', () => ({
    useLanguageStore: () => ({
        t: (key: string) => key,
    }),
    useTranslation: () => ({
        t: (key: string) => key,
        locale: 'en',
    }),
}));

import { renderHook } from '@testing-library/react';
import { useDMACalculator } from '../../hooks/useDMACalculator';

describe('useDMACalculator', () => {
    const baseInputs = {
        monthlyUsers: 1000,
        monthlyPrice: 10,
        conversionImpact: 0,
        userAgeMonths: 12,
        isSmallBusiness: false,
        isSubscriptionAfterYear: false,
    };

    describe('Apple IAP Standard', () => {
        it('should calculate 30% commission for non-Small Business', () => {
            const { result } = renderHook(() => useDMACalculator(baseInputs));
            const appleResult = result.current.calculateApple('iap-standard');

            expect(appleResult.rate).toBe(30);
            expect(appleResult.grossRevenue).toBe(10000);
            expect(appleResult.cost).toBe(3000);
            expect(appleResult.net).toBe(7000);
        });

        it('should calculate 15% commission for Small Business', () => {
            const { result } = renderHook(() =>
                useDMACalculator({ ...baseInputs, isSmallBusiness: true })
            );
            const appleResult = result.current.calculateApple('iap-standard');

            expect(appleResult.rate).toBe(15);
            expect(appleResult.cost).toBe(1500);
            expect(appleResult.net).toBe(8500);
        });

        it('should calculate 15% commission after first subscription year', () => {
            const { result } = renderHook(() =>
                useDMACalculator({ ...baseInputs, isSubscriptionAfterYear: true })
            );
            const appleResult = result.current.calculateApple('iap-standard');

            expect(appleResult.rate).toBe(15);
            expect(appleResult.cost).toBe(1500);
        });
    });

    describe('Apple External Tier 1', () => {
        it('should calculate CTC 5% + Store 5% + Stripe 2.9%', () => {
            const { result } = renderHook(() => useDMACalculator(baseInputs));
            const appleResult = result.current.calculateApple('external-tier1');

            // CTC 5% + Store Services Tier 1 5% + Stripe 2.9% = 12.9%
            expect(appleResult.rate).toBe(12.9);
        });

        it('should add IAF 2% for users under 6 months (non-SB)', () => {
            const { result } = renderHook(() =>
                useDMACalculator({ ...baseInputs, userAgeMonths: 3 })
            );
            const appleResult = result.current.calculateApple('external-tier1');

            // CTC 5% + Store 5% + IAF 2% + Stripe 2.9% = 14.9%
            expect(appleResult.rate).toBe(14.9);
        });

        it('should NOT add IAF for Small Business', () => {
            const { result } = renderHook(() =>
                useDMACalculator({ ...baseInputs, userAgeMonths: 3, isSmallBusiness: true })
            );
            const appleResult = result.current.calculateApple('external-tier1');

            // CTC 5% + Store 5% + Stripe 2.9% = 12.9% (no IAF)
            expect(appleResult.rate).toBe(12.9);
        });
    });

    describe('Apple External Tier 2', () => {
        it('should calculate 13% Store Services for non-SB', () => {
            const { result } = renderHook(() => useDMACalculator(baseInputs));
            const appleResult = result.current.calculateApple('external-tier2');

            // CTC 5% + Store Services Tier 2 13% + Stripe 2.9% = 20.9%
            expect(appleResult.rate).toBe(20.9);
        });

        it('should calculate 10% Store Services for Small Business', () => {
            const { result } = renderHook(() =>
                useDMACalculator({ ...baseInputs, isSmallBusiness: true })
            );
            const appleResult = result.current.calculateApple('external-tier2');

            // CTC 5% + Store Services Tier 2 SB 10% + Stripe 2.9% = 17.9%
            expect(appleResult.rate).toBe(17.9);
        });
    });

    describe('Google IAP Standard', () => {
        it('should calculate 30% commission for non-Small Business', () => {
            const { result } = renderHook(() => useDMACalculator(baseInputs));
            const googleResult = result.current.calculateGoogle('iap-standard');

            expect(googleResult.rate).toBe(30);
            expect(googleResult.cost).toBe(3000);
        });

        it('should calculate 15% commission for Small Business', () => {
            const { result } = renderHook(() =>
                useDMACalculator({ ...baseInputs, isSmallBusiness: true })
            );
            const googleResult = result.current.calculateGoogle('iap-standard');

            expect(googleResult.rate).toBe(15);
        });
    });

    describe('Google External Tier 1', () => {
        it('should calculate Ongoing 10% + Stripe 2.9%', () => {
            const { result } = renderHook(() => useDMACalculator(baseInputs));
            const googleResult = result.current.calculateGoogle('external-tier1');

            // Ongoing Services 10% + Stripe 2.9% = 12.9%
            expect(googleResult.rate).toBe(12.9);
        });

        it('should add IAF 3% for users under 6 months', () => {
            const { result } = renderHook(() =>
                useDMACalculator({ ...baseInputs, userAgeMonths: 3 })
            );
            const googleResult = result.current.calculateGoogle('external-tier1');

            // Ongoing 10% + IAF 3% + Stripe 2.9% = 15.9%
            expect(googleResult.rate).toBe(15.9);
        });
    });

    describe('Google External Tier 2', () => {
        it('should calculate Ongoing 20% + Stripe 2.9%', () => {
            const { result } = renderHook(() => useDMACalculator(baseInputs));
            const googleResult = result.current.calculateGoogle('external-tier2');

            // Ongoing Services 20% + Stripe 2.9% = 22.9%
            expect(googleResult.rate).toBe(22.9);
        });
    });

    describe('Conversion Impact', () => {
        it('should reduce revenue for external purchases', () => {
            const { result } = renderHook(() =>
                useDMACalculator({ ...baseInputs, conversionImpact: 15 })
            );
            const appleResult = result.current.calculateApple('external-tier1');

            // Revenue should be 85% of original
            expect(appleResult.grossRevenue).toBe(8500);
        });

        it('should NOT affect IAP standard revenue', () => {
            const { result } = renderHook(() =>
                useDMACalculator({ ...baseInputs, conversionImpact: 15 })
            );
            const appleResult = result.current.calculateApple('iap-standard');

            // IAP should use full revenue
            expect(appleResult.grossRevenue).toBe(10000);
        });
    });

    describe('Platform Split (Custom Users)', () => {
        it('should calculate revenue based on custom user count', () => {
            const { result } = renderHook(() => useDMACalculator(baseInputs));
            // Default input is 1000 users. Test custom count of 500.
            const appleResult = result.current.calculateApple('iap-standard', 500);

            // 500 users * 10 price = 5000 revenue
            expect(appleResult.grossRevenue).toBe(5000);
            expect(appleResult.cost).toBe(1500); // 30% of 5000
        });
    });
});
