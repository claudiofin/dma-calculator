import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography, radius, getThemeColors } from '@/constants/design';
import { openLink } from '../utils/openLink';

// Last updated date for tariffs
export const LAST_UPDATED = '2026-01-17';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        question: "Cosa cambia con il DMA dal 1 Gennaio 2026?",
        answer: "Apple sostituisce il Core Technology Fee (€0.50/install) con il Core Technology Commission (5% sulle vendite). Google mantiene il modello External Offers ma aggiunge opzioni di Tier."
    },
    {
        question: "Conviene passare a External Purchase?",
        answer: "Dipende! Se sei Small Business (< 1M$ fatturato), IAP al 15% potrebbe convenire rispetto a External (~13%) considerando il calo di conversione dovuto ai warning screens. Usa il calcolatore per simulare il tuo caso."
    },
    {
        question: "Come funziona il warning screen?",
        answer: "Quando un utente clicca su un link di acquisto esterno, Apple/Google mostrano un avviso obbligatorio che spiega che sta lasciando l'app. Questo riduce la conversione del 10-30% secondo le stime."
    },
    {
        question: "Posso usare sia IAP che External nella stessa app?",
        answer: "No. Se scegli External Purchase per un paese EU, non puoi offrire anche IAP sullo stesso storefront. Devi scegliere un modello per tutta la regione."
    },
    {
        question: "Le tariffe sono uguali in tutta Europa?",
        answer: "Per Apple sì. Per Google le commissioni % sono uguali, ma le fee fisse per download esterno variano per paese (es. €0.10 in Romania vs €1.90 in Germania)."
    },
    {
        question: "Come aderisco al programma External Purchase?",
        answer: "Apple: Firma l'Alternative Terms Addendum in App Store Connect e implementa le StoreKit APIs. Google: Iscriviti all'External Offers Program nella Play Console e integra le APIs."
    },
];

const OFFICIAL_SOURCES = [
    { label: 'Apple: DMA & Apps in the EU (Hub)', url: 'https://developer.apple.com/support/dma-and-apps-in-the-eu/' },
    { label: 'Google: Play Support (Cerca "External Offers")', url: 'https://support.google.com/googleplay/android-developer/' },
    { label: 'Apple: Core Technology Fee Info', url: 'https://developer.apple.com/support/dma-and-apps-in-the-eu/#ctf' },
    { label: 'European Commission: DMA Website', url: 'https://digital-markets-act.ec.europa.eu/' },
];

const FAQItemComponent = ({ item }: { item: FAQItem }) => {
    const [expanded, setExpanded] = useState(false);
    const { isDark } = useTheme();
    const themeColors = getThemeColors(isDark);

    return (
        <View style={[styles.faqItem, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <Pressable onPress={() => setExpanded(!expanded)} style={styles.questionRow}>
                <Text style={[styles.question, { color: themeColors.text }]}>{item.question}</Text>
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
                    <Text style={[styles.answer, { color: themeColors.textSecondary }]}>{item.answer}</Text>
                </MotiView>
            )}
        </View>
    );
};

export const FAQSection = () => {
    const { isDark } = useTheme();
    const themeColors = getThemeColors(isDark);

    return (
        <View style={styles.container}>
            {/* Last Updated */}
            <View style={[styles.updatedBadge, { backgroundColor: colors.primary + '15' }]}>
                <Text style={[styles.updatedText, { color: colors.primary }]}>
                    📅 Tariffe aggiornate al: {LAST_UPDATED}
                </Text>
            </View>

            {/* FAQ */}
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>❓ Domande Frequenti</Text>
            {FAQ_DATA.map((item, idx) => (
                <FAQItemComponent key={idx} item={item} />
            ))}

            {/* Official Sources */}
            <Text style={[styles.sectionTitle, { color: themeColors.text, marginTop: spacing.xl }]}>
                🔗 Fonti Ufficiali
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
                <Text style={styles.disclaimerTitle}>⚠️ Disclaimer Legale</Text>
                <Text style={styles.disclaimerText}>
                    Questa applicazione fornisce stime basate sulle policy pubbliche di Apple e Google aggiornate al {LAST_UPDATED}.
                    {'\n\n'}
                    Le commissioni effettive potrebbero variare in base a:
                    {'\n'}• Accordi specifici con il developer
                    {'\n'}• Categorie speciali di app (giochi, media, ecc.)
                    {'\n'}• Promozioni temporanee
                    {'\n\n'}
                    Non costituisce consulenza fiscale, legale o commerciale. Consulta un professionista prima di prendere decisioni basate su queste stime.
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
