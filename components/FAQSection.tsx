import { colors, getThemeColors, radius, spacing, typography } from '@/constants/design';
import { useTranslation } from '@/constants/i18n';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react-native';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { openLink } from '../utils/openLink';

// Last updated date for tariffs
export const LAST_UPDATED = '2026-01-17';

interface FAQItem {
    questionKey: string;
    answerKey: string;
}

const FAQ_KEYS: FAQItem[] = [
    { questionKey: 'faq_q1', answerKey: 'faq_a1' },
    { questionKey: 'faq_q2', answerKey: 'faq_a2' },
    { questionKey: 'faq_q3', answerKey: 'faq_a3' },
    { questionKey: 'faq_q4', answerKey: 'faq_a4' },
    { questionKey: 'faq_q5', answerKey: 'faq_a5' },
    { questionKey: 'faq_q6', answerKey: 'faq_a6' },
];

const OFFICIAL_SOURCES = [
    { label: 'Apple: DMA & Apps in the EU (Hub)', url: 'https://developer.apple.com/support/dma-and-apps-in-the-eu/' },
    { label: 'Google: Play Support (External Offers)', url: 'https://support.google.com/googleplay/android-developer/' },
    { label: 'Apple: Core Technology Fee Info', url: 'https://developer.apple.com/support/dma-and-apps-in-the-eu/#ctf' },
    { label: 'European Commission: DMA Website', url: 'https://digital-markets-act.ec.europa.eu/' },
];

const FAQItemComponent = ({ item }: { item: FAQItem }) => {
    const [expanded, setExpanded] = useState(false);
    const { isDark } = useTheme();
    const { t } = useTranslation();
    const themeColors = getThemeColors(isDark);

    return (
        <View style={[styles.faqItem, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <Pressable onPress={() => setExpanded(!expanded)} style={styles.questionRow}>
                <Text style={[styles.question, { color: themeColors.text }]}>{t(item.questionKey)}</Text>
                {expanded ? (
                    <ChevronUp size={20} color={themeColors.textMuted} />
                ) : (
                    <ChevronDown size={20} color={themeColors.textMuted} />
                )}
            </Pressable>
            {expanded && (
                <MotiView
                    from={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ type: 'timing', duration: 200 }}
                >
                    <Text style={[styles.answer, { color: themeColors.textSecondary }]}>{t(item.answerKey)}</Text>
                </MotiView>
            )}
        </View>
    );
};

export const FAQSection = () => {
    const { isDark } = useTheme();
    const { t } = useTranslation();
    const themeColors = getThemeColors(isDark);

    return (
        <View style={styles.container}>
            {/* Last Updated */}
            <View style={[styles.updatedBadge, { backgroundColor: colors.primary + '15' }]}>
                <Text style={[styles.updatedText, { color: colors.primary }]}>
                    {t('faq_updated')} {LAST_UPDATED}
                </Text>
            </View>

            {/* FAQ */}
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('faq_title')}</Text>
            {FAQ_KEYS.map((item, idx) => (
                <FAQItemComponent key={idx} item={item} />
            ))}

            {/* Official Sources */}
            <Text style={[styles.sectionTitle, { color: themeColors.text, marginTop: spacing.xl }]}>
                {t('faq_sources_title')}
            </Text>
            <View style={[styles.sourcesCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                {OFFICIAL_SOURCES.map((source, idx) => (
                    <Pressable key={idx} onPress={() => openLink(source.url)} style={styles.sourceRow}>
                        <Text style={[styles.sourceLabel, { color: colors.primary }]}>{source.label}</Text>
                        <ExternalLink size={14} color={colors.primary} />
                    </Pressable>
                ))}
            </View>

            {/* Detailed Disclaimer */}
            <View style={[styles.disclaimer, { backgroundColor: colors.warningBg, borderColor: colors.warning }]}>
                <Text style={styles.disclaimerTitle}>{t('disclaimer_title')}</Text>
                <Text style={styles.disclaimerText}>
                    {t('disclaimer_intro')} {LAST_UPDATED}.
                    {'\n\n'}
                    {t('disclaimer_factors')}
                    {'\n'}• {t('disclaimer_factor1')}
                    {'\n'}• {t('disclaimer_factor2')}
                    {'\n'}• {t('disclaimer_factor3')}
                    {'\n\n'}
                    {t('disclaimer_vat')}
                    {'\n\n'}
                    {t('disclaimer_warning')}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.xl,
    },
    updatedBadge: {
        padding: spacing.md,
        borderRadius: radius.md,
        marginBottom: spacing.lg,
        alignItems: 'center',
    },
    updatedText: {
        fontSize: typography.sm,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: typography.lg,
        fontWeight: '700',
        marginBottom: spacing.md,
    },
    faqItem: {
        borderRadius: radius.md,
        padding: spacing.md,
        marginBottom: spacing.sm,
        borderWidth: 1,
    },
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    question: {
        flex: 1,
        fontSize: typography.base,
        fontWeight: '600',
        marginRight: spacing.sm,
    },
    answer: {
        fontSize: typography.sm,
        lineHeight: 22,
        marginTop: spacing.sm,
    },
    sourcesCard: {
        borderRadius: radius.md,
        padding: spacing.md,
        borderWidth: 1,
    },
    sourceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
    },
    sourceLabel: {
        fontSize: typography.sm,
        flex: 1,
    },
    disclaimer: {
        borderRadius: radius.md,
        padding: spacing.lg,
        marginTop: spacing.xl,
        borderWidth: 1,
    },
    disclaimerTitle: {
        fontSize: typography.base,
        fontWeight: '700',
        color: '#92400e',
        marginBottom: spacing.sm,
    },
    disclaimerText: {
        fontSize: typography.sm,
        color: '#92400e',
        lineHeight: 20,
    },
});
