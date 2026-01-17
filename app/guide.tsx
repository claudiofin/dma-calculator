import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { CheckCircle, XCircle, ExternalLink, ArrowRight } from 'lucide-react-native';
import { useTranslation } from '../constants/i18n';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography, radius, getThemeColors } from '@/constants/design';
import { OnboardingTrigger } from '../components/OnboardingOverlay';
import { openLink } from '../utils/openLink';

export default function GuideScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const { isDark } = useTheme();
    const themeColors = getThemeColors(isDark);

    const STEPS = [
        {
            title: '1. Scegli il Modello di Business',
            desc: 'Decidi se rimanere nel sistema IAP (In-App Purchase) o utilizzare link esterni per i pagamenti sul web.',
            icon: '📱'
        },
        {
            title: '2. Implementa gli External Link',
            desc: 'Se scegli lo store esterno, devi implementare gli "External Purchase Link Entitlements" (Apple) o "External Offers" (Google). Questo richiede di mostrare uno schermo di avviso all\'utente.',
            icon: '🔗'
        },
        {
            title: '3. Gestisci lo Warning Screen',
            desc: 'L\'utente vedrà un avviso che sta lasciando l\'app. Questo riduce la conversione (stimata -15/30%). Ottimizza il design per rassicurarlo.',
            icon: '⚠️'
        },
        {
            title: '4. Pagamento Web (Stripe)',
            desc: 'L\'utente atterra sul tuo sito. Qui i costi di transazione sono molto più bassi (es. Stripe ~2.9% vs Apple 30%).',
            icon: '💳'
        },
        {
            title: '5. Calcolo della Commissione',
            desc: 'A fine mese, Apple/Google ti invieranno una fattura per le commissioni dovute (CTC + Store Services) sulle vendite digitali tracciate.',
            icon: '📊'
        }
    ];

    const APPLE_ENROLLMENT = [
        'Accedi a App Store Connect',
        'Vai su Agreements → "Alternative Terms Addendum for Apps in the EU"',
        'Firma l\'addendum (richiede Account Holder)',
        'In Xcode, aggiungi l\'entitlement: com.apple.developer.storekit.external-purchase-link',
        'Implementa le StoreKit External Purchase APIs',
        'Invia l\'app per review',
    ];

    const GOOGLE_ENROLLMENT = [
        'Accedi a Google Play Console',
        'Vai su Policy → External Offers Program',
        'Completa la registrazione come Business',
        'Scegli il Service Tier (1 o 2)',
        'Integra le External Offers APIs',
        'Reporta le transazioni entro 24 ore',
    ];

    const SOURCES = [
        { label: 'Apple: DMA & Apps in the EU (Hub)', url: 'https://developer.apple.com/support/dma-and-apps-in-the-eu/' },
        { label: 'Google: Play Support (Cerca "External Offers")', url: 'https://support.google.com/googleplay/android-developer/' },
        { label: 'Apple: Core Technology Fee Info', url: 'https://developer.apple.com/support/dma-and-apps-in-the-eu/#ctf' },
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
            <Stack.Screen options={{
                title: 'Guida',
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: '#fff',
            }} />

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Tutorial Trigger */}
                <View style={styles.tutorialRow}>
                    <OnboardingTrigger />
                </View>

                <Text style={[styles.pageTitle, { color: themeColors.text }]}>
                    Come Funziona il DMA?
                </Text>
                <Text style={[styles.pageSubtitle, { color: themeColors.textSecondary }]}>
                    Una guida passo-passo per integrare i pagamenti esterni e risparmiare sulle commissioni.
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
                        🤔 Quando Conviene External Purchase?
                    </Text>

                    <Text style={[styles.listHeader, { color: colors.success }]}>✅ Conviene se:</Text>
                    <Text style={[styles.listItem, { color: themeColors.textSecondary }]}>• Non sei Small Business (30% → ~15%)</Text>
                    <Text style={[styles.listItem, { color: themeColors.textSecondary }]}>• Hai già un sistema di pagamento web consolidato</Text>
                    <Text style={[styles.listItem, { color: themeColors.textSecondary }]}>• La tua app ha alta retention/fidelizzazione</Text>

                    <Text style={[styles.listHeader, { color: colors.error, marginTop: spacing.md }]}>❌ NON conviene se:</Text>
                    <Text style={[styles.listItem, { color: themeColors.textSecondary }]}>• Sei già Small Business (15% vs ~13%)</Text>
                    <Text style={[styles.listItem, { color: themeColors.textSecondary }]}>• La tua conversione è molto sensibile ai warning</Text>
                    <Text style={[styles.listItem, { color: themeColors.textSecondary }]}>• Non hai infrastruttura per gestire pagamenti</Text>
                </View>

                {/* Rules */}
                <View style={[styles.sectionCard, { backgroundColor: colors.warningBg, borderColor: colors.warning }]}>
                    <Text style={[styles.sectionTitle, { color: '#92400e' }]}>
                        ⚠️ Regole Importanti
                    </Text>
                    <Text style={[styles.ruleText, { color: '#92400e' }]}>
                        • NON puoi offrire IAP + External insieme nella stessa app
                    </Text>
                    <Text style={[styles.ruleText, { color: '#92400e' }]}>
                        • Solo per utenti nell'Unione Europea (EEA)
                    </Text>
                    <Text style={[styles.ruleText, { color: '#92400e' }]}>
                        • Devi mostrare il warning screen obbligatorio
                    </Text>
                    <Text style={[styles.ruleText, { color: '#92400e' }]}>
                        • Devi reportare TUTTE le transazioni a Apple/Google
                    </Text>
                </View>

                {/* Apple Enrollment */}
                <View style={[styles.sectionCard, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                    <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                        🍎 Come Aderire - Apple
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
                        🤖 Come Aderire - Google
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
                    <Text style={[styles.sourcesTitle, { color: themeColors.text }]}>🔗 Fonti Ufficiali</Text>
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
