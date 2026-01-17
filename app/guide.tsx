import { colors, getThemeColors, radius, spacing, typography } from '@/constants/design';
import { useTheme } from '@/contexts/ThemeContext';
import { Stack, useRouter } from 'expo-router';
import { ExternalLink } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingTrigger } from '../components/OnboardingOverlay';
import { useTranslation } from '../constants/i18n';
import { openLink } from '../utils/openLink';

export default function GuideScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const { isDark } = useTheme();
    const themeColors = getThemeColors(isDark);

    const STEPS = [
        { title: t('guide_step1_title'), desc: t('guide_step1_desc'), icon: '📱' },
        { title: t('guide_step2_title'), desc: t('guide_step2_desc'), icon: '🔗' },
        { title: t('guide_step3_title'), desc: t('guide_step3_desc'), icon: '⚠️' },
        { title: t('guide_step4_title'), desc: t('guide_step4_desc'), icon: '💳' },
        { title: t('guide_step5_title'), desc: t('guide_step5_desc'), icon: '📊' },
    ];

    const APPLE_ENROLLMENT = [
        t('guide_apple_step1'),
        t('guide_apple_step2'),
        t('guide_apple_step3'),
        t('guide_apple_step4'),
        t('guide_apple_step5'),
        t('guide_apple_step6'),
    ];

    const GOOGLE_ENROLLMENT = [
        t('guide_google_step1'),
        t('guide_google_step2'),
        t('guide_google_step3'),
        t('guide_google_step4'),
        t('guide_google_step5'),
        t('guide_google_step6'),
    ];

    const SOURCES = [
        { label: 'Apple: DMA & Apps in the EU (Hub)', url: 'https://developer.apple.com/support/dma-and-apps-in-the-eu/' },
        { label: 'Google: Play Support (External Offers)', url: 'https://support.google.com/googleplay/android-developer/' },
        { label: 'Apple: Core Technology Fee Info', url: 'https://developer.apple.com/support/dma-and-apps-in-the-eu/#ctf' },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
            <Stack.Screen options={{
                title: t('guide_title'),
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: '#fff',
            }} />

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Tutorial Trigger */}
                <View style={styles.tutorialRow}>
                    <OnboardingTrigger />
                </View>

                <Text style={[styles.pageTitle, { color: themeColors.text }]}>
                    {t('guide_page_title')}
                </Text>
                <Text style={[styles.pageSubtitle, { color: themeColors.textSecondary }]}>
                    {t('guide_page_subtitle')}
                </Text>

                {/* Steps */}
                {STEPS.map((step, index) => (
                    <View
                        key={index}
                        style={[styles.stepCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
                    >
                        <View style={styles.stepHeader}>
                            <Text style={styles.stepIcon}>{step.icon}</Text>
                            <Text style={[styles.stepTitle, { color: themeColors.text }]}>{step.title}</Text>
                        </View>
                        <Text style={[styles.stepDesc, { color: themeColors.textSecondary }]}>
                            {step.desc}
                        </Text>
                    </View>
                ))}

                {/* When External Links are Allowed */}
                <View style={[styles.sectionCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                    <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                        {t('guide_when_title')}
                    </Text>

                    <Text style={[styles.listHeader, { color: colors.success }]}>{t('guide_pros_title')}</Text>
                    <Text style={[styles.listItem, { color: themeColors.textSecondary }]}>• {t('guide_pros_1')}</Text>
                    <Text style={[styles.listItem, { color: themeColors.textSecondary }]}>• {t('guide_pros_2')}</Text>
                    <Text style={[styles.listItem, { color: themeColors.textSecondary }]}>• {t('guide_pros_3')}</Text>

                    <Text style={[styles.listHeader, { color: colors.error, marginTop: spacing.md }]}>{t('guide_cons_title')}</Text>
                    <Text style={[styles.listItem, { color: themeColors.textSecondary }]}>• {t('guide_cons_1')}</Text>
                    <Text style={[styles.listItem, { color: themeColors.textSecondary }]}>• {t('guide_cons_2')}</Text>
                    <Text style={[styles.listItem, { color: themeColors.textSecondary }]}>• {t('guide_cons_3')}</Text>
                </View>

                {/* Rules */}
                <View style={[styles.sectionCard, { backgroundColor: colors.warningBg, borderColor: colors.warning }]}>
                    <Text style={[styles.sectionTitle, { color: '#92400e' }]}>
                        {t('guide_rules_title')}
                    </Text>
                    <Text style={[styles.ruleText, { color: '#92400e' }]}>• {t('guide_rule_1')}</Text>
                    <Text style={[styles.ruleText, { color: '#92400e' }]}>• {t('guide_rule_2')}</Text>
                    <Text style={[styles.ruleText, { color: '#92400e' }]}>• {t('guide_rule_3')}</Text>
                    <Text style={[styles.ruleText, { color: '#92400e' }]}>• {t('guide_rule_4')}</Text>
                </View>

                {/* Apple Enrollment */}
                <View style={[styles.sectionCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                    <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                        {t('guide_apple_title')}
                    </Text>
                    {APPLE_ENROLLMENT.map((step, idx) => (
                        <View key={idx} style={styles.enrollmentStep}>
                            <Text style={[styles.enrollmentNumber, { color: colors.primary }]}>{idx + 1}</Text>
                            <Text style={[styles.enrollmentText, { color: themeColors.textSecondary }]}>{step}</Text>
                        </View>
                    ))}
                </View>

                {/* Google Enrollment */}
                <View style={[styles.sectionCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                    <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                        {t('guide_google_title')}
                    </Text>
                    {GOOGLE_ENROLLMENT.map((step, idx) => (
                        <View key={idx} style={styles.enrollmentStep}>
                            <Text style={[styles.enrollmentNumber, { color: colors.primary }]}>{idx + 1}</Text>
                            <Text style={[styles.enrollmentText, { color: themeColors.textSecondary }]}>{step}</Text>
                        </View>
                    ))}
                </View>

                {/* Sources */}
                <View style={[styles.sourcesCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                    <Text style={[styles.sourcesTitle, { color: themeColors.text }]}>{t('guide_sources_title')}</Text>
                    {SOURCES.map((source, idx) => (
                        <Pressable key={idx} onPress={() => openLink(source.url)} style={styles.sourceRow}>
                            <Text style={[styles.sourceLink, { color: colors.primary }]}>
                                {source.label}
                            </Text>
                            <ExternalLink size={14} color={colors.primary} />
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
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
    tutorialRow: {
        alignItems: 'flex-end',
        marginBottom: spacing.md,
    },
    pageTitle: {
        fontSize: typography['2xl'],
        fontWeight: typography.bold,
        marginBottom: spacing.xs,
    },
    pageSubtitle: {
        fontSize: typography.base,
        marginBottom: spacing.xl,
    },
    stepCard: {
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
    },
    stepHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    stepIcon: {
        fontSize: 24,
    },
    stepTitle: {
        fontSize: typography.lg,
        fontWeight: typography.semibold,
        flex: 1,
    },
    stepDesc: {
        fontSize: typography.base,
        lineHeight: 24,
    },
    sectionCard: {
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginTop: spacing.lg,
        borderWidth: 1,
    },
    sectionTitle: {
        fontSize: typography.lg,
        fontWeight: typography.bold,
        marginBottom: spacing.md,
    },
    listHeader: {
        fontSize: typography.base,
        fontWeight: typography.semibold,
        marginBottom: spacing.xs,
    },
    listItem: {
        fontSize: typography.sm,
        lineHeight: 22,
        marginLeft: spacing.sm,
    },
    ruleText: {
        fontSize: typography.sm,
        lineHeight: 24,
        marginBottom: spacing.xs,
    },
    enrollmentStep: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    enrollmentNumber: {
        fontSize: typography.sm,
        fontWeight: typography.bold,
        width: 20,
    },
    enrollmentText: {
        fontSize: typography.sm,
        flex: 1,
        lineHeight: 20,
    },
    sourcesCard: {
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginTop: spacing.lg,
        marginBottom: spacing.xl,
        borderWidth: 1,
    },
    sourcesTitle: {
        fontSize: typography.lg,
        fontWeight: typography.semibold,
        marginBottom: spacing.md,
    },
    sourceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
    },
    sourceLink: {
        fontSize: typography.sm,
        flex: 1,
    },
});
