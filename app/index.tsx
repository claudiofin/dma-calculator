import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { BookOpen, Info } from 'lucide-react-native';

import { useDMACalculator, StoreModel } from '../hooks/useDMACalculator';
import { InputSlider } from '../components/InputSlider';
import { ComparisonCard } from '../components/ComparisonCard';
import { ThemeToggle } from '../components/ThemeToggle';
import { LanguageSelector } from '../components/LanguageSelector';
import { FAQSection } from '../components/FAQSection';
import { CookieConsent } from '../components/CookieConsent';
import { OnboardingOverlay, OnboardingTrigger } from '../components/OnboardingOverlay';
// Import CustomSwitch if needed, checking existing imports
import { CustomSwitch } from '../components/CustomSwitch';
import { GLOSSARY_KEYS } from '../constants/glossary';
import { useLanguageStore, useTranslation } from '../constants/i18n';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography, radius, shadows, getThemeColors } from '@/constants/design';
import { SEOHead } from '../components/SEOHead';

type TabKey = 'Apple' | 'Google';

export default function HomeScreen() {
    const { t, locale, setLocale } = useTranslation();
    const { isDark } = useTheme();
    const router = useRouter();
    const themeColors = getThemeColors(isDark);

    const [monthlyUsers, setMonthlyUsers] = useState(3000);
    const [iosShare, setIosShare] = useState(50); // % of users on iOS
    const [monthlyPrice, setMonthlyPrice] = useState(50);
    const [conversionImpact, setConversionImpact] = useState(15);
    const [userAgeMonths, setUserAgeMonths] = useState(0);
    const [isSmallBusiness, setIsSmallBusiness] = useState(true);
    const [isSubscriptionAfterYear, setIsSubscriptionAfterYear] = useState(false);
    const [showGlossary, setShowGlossary] = useState(false);
    const [activeTab, setActiveTab] = useState<TabKey>('Apple');

    const [appleModel, setAppleModel] = useState<StoreModel>('external-tier1');
    const [googleModel, setGoogleModel] = useState<StoreModel>('external-tier1');

    const { calculateApple, calculateGoogle } = useDMACalculator({
        monthlyUsers,
        monthlyPrice,
        conversionImpact,
        userAgeMonths,
        isSmallBusiness,
        isSubscriptionAfterYear
    });

    // Platform Split Logic
    const iosUsers = Math.round(monthlyUsers * (iosShare / 100));
    const androidUsers = monthlyUsers - iosUsers;

    // Calculate results based on SPLIT users
    const appleResults = calculateApple(appleModel, iosUsers);
    const googleResults = calculateGoogle(googleModel, androidUsers);
    const appleBenchmark = calculateApple('iap-standard', iosUsers);
    const googleBenchmark = calculateGoogle('iap-standard', androidUsers);

    // CORRECT: Compare NET profits, not costs
    // Positive = external is better, Negative = IAP is better
    const appleSavings = appleResults.net - appleBenchmark.net;
    const googleSavings = googleResults.net - googleBenchmark.net;

    // Total Annual Savings = Sum of savings from both platforms (now correctly split)
    const totalAnnualSavings = (appleSavings + googleSavings) * 12;

    const formatEuro = (val: number) =>
        new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(Math.round(val)); // Round to nearest integer

    const ModelSelector = ({
        value,
        onChange
    }: {
        value: StoreModel;
        onChange: (m: StoreModel) => void
    }) => (
        <View style={[styles.modelSelector, { backgroundColor: themeColors.borderSubtle }]}>
            {(['iap-standard', 'external-tier1', 'external-tier2'] as StoreModel[]).map((model) => (
                <Pressable
                    key={model}
                    onPress={() => onChange(model)}
                    style={[
                        styles.modelButton,
                        value === model && { backgroundColor: themeColors.surface, ...shadows.sm }
                    ]}
                >
                    <Text style={[
                        styles.modelButtonText,
                        { color: value === model ? colors.primary : themeColors.textSecondary }
                    ]}>
                        {model === 'iap-standard' ? 'IAP' : model === 'external-tier1' ? 'Ext T1' : 'Ext T2'}
                    </Text>
                </Pressable>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
            <SEOHead
                title={`${t('app_title')} - Simulator`}
                description={t('app_subtitle')}
            />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Native-like Sticky Header */}
            <View style={[styles.stickyHeader, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }]}>
                <View style={styles.stickyHeaderContent}>
                    <View>
                        <Text style={[styles.stickyTitle, { color: themeColors.text }]}>DMA Calculator</Text>
                        <View style={styles.stickySubtitleRow}>
                            <Text style={[styles.stickyYear, { color: colors.primary }]}>2026</Text>
                        </View>
                    </View>
                    <View style={styles.stickyActions}>
                        <OnboardingTrigger variant="icon" />
                        <ThemeToggle />
                        <LanguageSelector />
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header removed from ScrollView */}
                <View style={{ height: spacing.md }} />

                {/* Savings Hero */}
                <View style={[styles.savingsCard, { backgroundColor: colors.primary }]}>
                    <Text style={styles.savingsLabel}>{t('annual_savings')}</Text>
                    <Text
                        style={styles.savingsValue}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.5}
                    >
                        {formatEuro(totalAnnualSavings)}
                    </Text>
                    <Text style={styles.savingsNote}>
                        vs IAP Standard ({isSmallBusiness || isSubscriptionAfterYear ? '15' : '30'}%)
                    </Text>
                </View>

                {/* Input Card */}
                <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                    <Text style={[styles.cardTitle, { color: themeColors.text }]}>
                        {t('business_params')}
                    </Text>

                    <InputSlider
                        label={`${t('monthly_users')} (Totali)`}
                        value={monthlyUsers}
                        onValueChange={setMonthlyUsers}
                        min={100}
                        max={50000}
                        step={100}
                    />

                    <InputSlider
                        label={`Split Piattaforme: iOS ${iosShare}% / Android ${100 - iosShare}%`}
                        value={iosShare}
                        onValueChange={setIosShare}
                        min={0}
                        max={100}
                        step={5}
                        suffix="%"
                    />

                    <InputSlider
                        label={t('monthly_price')}
                        value={monthlyPrice}
                        onValueChange={setMonthlyPrice}
                        min={1}
                        max={200}
                        suffix="€"
                    />

                    <InputSlider
                        label={t('conversion_impact')}
                        value={conversionImpact}
                        onValueChange={setConversionImpact}
                        min={0}
                        max={50}
                        suffix="%"
                        description={t('conversion_desc')}
                    />

                    <InputSlider
                        label={t('user_age')}
                        value={userAgeMonths}
                        onValueChange={setUserAgeMonths}
                        min={0}
                        max={36}
                        description={t('user_age_desc')}
                    />

                    <View style={[styles.switchRow, { borderTopColor: themeColors.border }]}>
                        <Text style={[styles.switchLabel, { color: themeColors.text }]}>
                            {t('small_business')}
                        </Text>
                        <CustomSwitch
                            value={isSmallBusiness}
                            onValueChange={setIsSmallBusiness}
                        />
                    </View>
                    {monthlyUsers * monthlyPrice * 12 > 1000000 && isSmallBusiness && (
                        <View style={[styles.warningBox, { backgroundColor: colors.warningBg }]}>
                            <Info size={16} color={colors.warning} />
                            <Text style={styles.warningText}>{t('small_business_warning')}</Text>
                        </View>
                    )}

                    {/* Subscription After Year Toggle */}
                    <View style={[styles.switchRow, { borderTopColor: themeColors.border }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.switchLabel, { color: themeColors.text }]}>
                                Abbonamento dopo 1° anno
                            </Text>
                            <Text style={[styles.switchDesc, { color: themeColors.textMuted }]}>
                                IAP scende al 15% dopo il primo anno
                            </Text>
                        </View>
                        <CustomSwitch
                            value={isSubscriptionAfterYear}
                            onValueChange={setIsSubscriptionAfterYear}
                        />
                    </View>
                </View>

                {/* Tabs */}
                <View style={[styles.tabBar, { backgroundColor: themeColors.borderSubtle }]}>
                    {(['Apple', 'Google'] as TabKey[]).map((tab) => (
                        <Pressable
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={[
                                styles.tab,
                                activeTab === tab && { backgroundColor: themeColors.surface, ...shadows.sm }
                            ]}
                        >
                            <View style={{ alignItems: 'center' }}>
                                <Text style={[
                                    styles.tabTitle,
                                    { color: activeTab === tab ? colors.primary : themeColors.textSecondary }
                                ]}>
                                    {tab === 'Apple' ? '🍎 Apple' : '🤖 Google'}
                                </Text>
                                <Text style={[
                                    styles.tabSubtitle,
                                    { color: activeTab === tab ? colors.primary : themeColors.textMuted }
                                ]}>
                                    {tab === 'Apple' ? iosUsers.toLocaleString() : androidUsers.toLocaleString()} utenti
                                </Text>
                            </View>
                        </Pressable>
                    ))}
                </View>

                {/* Results */}
                {activeTab === 'Apple' ? (
                    <>
                        <ComparisonCard
                            storeName={t('apple_store')}
                            modelName={appleModel === 'iap-standard' ? t('iap_standard') : appleModel === 'external-tier1' ? t('ext_tier1') : t('ext_tier2')}
                            commissionRate={appleResults.rate}
                            cost={appleResults.cost}
                            net={appleResults.net}
                            savings={appleSavings}
                            accentColor="#007AFF"
                            details={appleResults.details}
                        />
                        <ModelSelector value={appleModel} onChange={setAppleModel} />
                    </>
                ) : (
                    <>
                        <ComparisonCard
                            storeName={t('google_store')}
                            modelName={googleModel === 'iap-standard' ? t('iap_standard') : googleModel === 'external-tier1' ? t('ext_tier1') : t('ext_tier2')}
                            commissionRate={googleResults.rate}
                            cost={googleResults.cost}
                            net={googleResults.net}
                            savings={googleSavings}
                            accentColor="#34A853"
                            details={googleResults.details}
                        />
                        <ModelSelector value={googleModel} onChange={setGoogleModel} />
                    </>
                )}

                {/* Actions */}
                <Pressable
                    onPress={() => router.push('/guide')}
                    style={[styles.actionButton, { backgroundColor: colors.primary }]}
                >
                    <BookOpen size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Guida all'Implementazione</Text>
                </Pressable>

                <Pressable
                    onPress={() => setShowGlossary(!showGlossary)}
                    style={[styles.secondaryButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
                >
                    <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>
                        {showGlossary ? 'Chiudi Glossario' : 'Apri Glossario'}
                    </Text>
                </Pressable>

                {/* Glossary */}
                {showGlossary && (
                    <View style={styles.glossaryContainer}>
                        {GLOSSARY_KEYS.map((key) => (
                            <View
                                key={key}
                                style={[styles.glossaryItem, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
                            >
                                <Text style={[styles.glossaryTitle, { color: colors.primary }]}>
                                    {t(`glossary_${key}_title`)}
                                </Text>
                                <Text style={[styles.glossaryDesc, { color: themeColors.textSecondary }]}>
                                    {t(`glossary_${key}_desc`)}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* FAQ Section with official sources and disclaimer */}
                <FAQSection />

                <View style={styles.footer} />
            </ScrollView>
            <CookieConsent />
            <OnboardingOverlay />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.lg,
    },
    header: {
        marginBottom: spacing.lg,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1, // Allow title to take up available space
        flexDirection: 'column', // Stack title and year on small screens if needed, actually row is fine but with wrap
        justifyContent: 'center',
        paddingRight: spacing.sm,
    },
    title: {
        fontSize: typography['2xl'],
        fontWeight: typography.bold,
    },
    year: {
        fontSize: typography.sm, // Smaller year
        fontWeight: typography.bold,
        backgroundColor: 'rgba(79, 70, 229, 0.1)', // Light primary bg
        paddingHorizontal: spacing.xs,
        paddingVertical: 2,
        borderRadius: radius.sm,
        marginTop: 2, // Align slightly better if wrapping
        overflow: 'hidden',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    stickyHeader: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        ...shadows.sm,
        zIndex: 10,
    },
    stickyHeaderContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stickyTitle: {
        fontSize: typography.xl,
        fontWeight: typography.bold,
    },
    stickySubtitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    stickyYear: {
        fontSize: typography.xs,
        fontWeight: typography.bold,
        color: colors.primary,
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: radius.full,
        marginTop: 2,
        overflow: 'hidden',
    },
    stickyActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2, // Tighter gap for navbar actions
    },
    langSwitch: {
        flexDirection: 'row',
        borderRadius: radius.md,
        padding: 2,
    },
    langBtn: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.sm,
    },
    langBtnActive: {
        backgroundColor: colors.primary,
    },
    langText: {
        fontSize: typography.xs,
        fontWeight: typography.semibold,
        color: '#64748b',
    },
    langTextActive: {
        color: '#fff',
    },
    subtitle: {
        fontSize: typography.base,
        marginTop: spacing.xs,
    },
    savingsCard: {
        borderRadius: radius.xl,
        padding: spacing.xl,
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    savingsLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: typography.sm,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    savingsValue: {
        color: '#fff',
        fontSize: typography['4xl'],
        fontWeight: typography.bold,
        marginVertical: spacing.xs,
    },
    savingsNote: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: typography.xs,
    },
    card: {
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        borderWidth: 1,
    },
    cardTitle: {
        fontSize: typography.lg,
        fontWeight: typography.semibold,
        marginBottom: spacing.lg,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: spacing.md,
        marginTop: spacing.md,
        borderTopWidth: 1,
    },
    switchLabel: {
        fontSize: typography.base,
        fontWeight: typography.medium,
    },
    switchDesc: {
        fontSize: typography.xs,
        marginTop: 2,
    },
    warningBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        padding: spacing.sm,
        borderRadius: radius.md,
        marginTop: spacing.sm,
    },
    warningText: {
        flex: 1,
        fontSize: typography.xs,
        color: '#92400e',
    },
    tabBar: {
        flexDirection: 'row',
        borderRadius: radius.lg,
        padding: spacing.xs,
        marginBottom: spacing.lg,
    },
    tab: {
        flex: 1,
        paddingVertical: spacing.sm,
        borderRadius: radius.md,
        alignItems: 'center',
    },
    tabTitle: {
        fontSize: typography.base,
        fontWeight: typography.bold,
        marginBottom: 2,
    },
    tabSubtitle: {
        fontSize: typography.xs,
        fontWeight: typography.medium,
        opacity: 0.8,
    },
    modelSelector: {
        flexDirection: 'row',
        borderRadius: radius.md,
        padding: spacing.xs,
        marginBottom: spacing.lg,
    },
    modelButton: {
        flex: 1,
        paddingVertical: spacing.sm,
        borderRadius: radius.sm,
        alignItems: 'center',
    },
    modelButtonText: {
        fontSize: typography.sm,
        fontWeight: typography.medium,
    },
    disclaimer: {
        borderRadius: radius.md,
        padding: spacing.md,
        marginBottom: spacing.lg,
        borderWidth: 1,
    },
    disclaimerText: {
        fontSize: typography.xs,
        color: '#92400e',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        padding: spacing.md,
        borderRadius: radius.lg,
        marginBottom: spacing.md,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: typography.base,
        fontWeight: typography.semibold,
    },
    secondaryButton: {
        padding: spacing.md,
        borderRadius: radius.lg,
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: spacing.lg,
    },
    secondaryButtonText: {
        fontSize: typography.base,
        fontWeight: typography.medium,
    },
    glossaryContainer: {
        gap: spacing.sm,
    },
    glossaryItem: {
        borderRadius: radius.md,
        padding: spacing.md,
        borderWidth: 1,
    },
    glossaryTitle: {
        fontSize: typography.base,
        fontWeight: typography.semibold,
        marginBottom: spacing.xs,
    },
    glossaryDesc: {
        fontSize: typography.sm,
    },
    footer: {
        height: spacing.xxl,
    },
});
