import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotiView } from 'moti';
import { X, ChevronRight, ChevronLeft, HelpCircle } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguageStore } from '@/constants/i18n';
import { colors, spacing, typography, radius, getThemeColors } from '@/constants/design';

const ONBOARDING_KEY = '@dma_onboarding_seen';

// Translations for onboarding steps
const ONBOARDING_TRANSLATIONS = {
    it: {
        steps: [
            { title: 'Benvenuto nel DMA Calculator', description: 'Questo strumento ti aiuta a calcolare i risparmi potenziali usando i nuovi sistemi di pagamento esterni introdotti dal Digital Markets Act europeo.', icon: '🇪🇺' },
            { title: 'Core Technology Commission (CTC)', description: 'Dal 2026, Apple applica il 5% su tutte le vendite digitali effettuate tramite External Purchase, sia su App Store, Web Distribution che marketplace alternativi.', icon: '💰' },
            { title: 'Store Services Tier 1 vs Tier 2', description: 'Tier 1 (5%): Servizi base - hosting, sicurezza.\nTier 2 (13%): Servizi completi - discovery, featuring, aggiornamenti auto. Small Business: 10%.', icon: '📦' },
            { title: 'Initial Acquisition Fee (IAF)', description: 'Commissione temporanea sui nuovi utenti nei primi 6 mesi.\n• Apple: 2% (esentato per Small Business)\n• Google: 3%', icon: '⏱️' },
            { title: 'Calo Conversion Rate', description: 'Quando usi External Purchase, Apple/Google mostrano un warning screen obbligatorio. Questo riduce la conversione del 10-30% stimato.', icon: '📉' },
            { title: 'Small Business Program', description: 'Se fatturi meno di 1M$/anno, puoi accedere al programma Small Business che riduce le commissioni IAP dal 30% al 15%.', icon: '🏪' },
            { title: 'External Purchase: Quando Conviene?', description: '✅ Non sei Small Business (30% → ~15%)\n✅ Hai già un sistema di pagamento web\n❌ Sei già Small Business (15% vs ~13%)\n❌ La tua conversione è sensibile ai warning', icon: '🤔' },
        ],
        back: 'Indietro',
        next: 'Avanti',
        start: 'Inizia',
        reopen: 'Rivedi Tutorial',
    },
    en: {
        steps: [
            { title: 'Welcome to DMA Calculator', description: 'This tool helps you calculate potential savings using the new external payment systems introduced by the Digital Markets Act in Europe.', icon: '🇪🇺' },
            { title: 'Core Technology Commission (CTC)', description: 'From 2026, Apple charges 5% on all digital sales made via External Purchase, on App Store, Web Distribution and alternative marketplaces.', icon: '💰' },
            { title: 'Store Services Tier 1 vs Tier 2', description: 'Tier 1 (5%): Basic services - hosting, security.\nTier 2 (13%): Full services - discovery, featuring, auto-updates. Small Business: 10%.', icon: '📦' },
            { title: 'Initial Acquisition Fee (IAF)', description: 'Temporary commission on new users in the first 6 months.\n• Apple: 2% (exempt for Small Business)\n• Google: 3%', icon: '⏱️' },
            { title: 'Conversion Rate Drop', description: 'When using External Purchase, Apple/Google show a mandatory warning screen. This reduces conversion by an estimated 10-30%.', icon: '📉' },
            { title: 'Small Business Program', description: 'If you earn less than $1M/year, you can access the Small Business program which reduces IAP commissions from 30% to 15%.', icon: '🏪' },
            { title: 'External Purchase: When to Use?', description: '✅ Not a Small Business (30% → ~15%)\n✅ Have existing web payment system\n❌ Already Small Business (15% vs ~13%)\n❌ Conversion sensitive to warnings', icon: '🤔' },
        ],
        back: 'Back',
        next: 'Next',
        start: 'Start',
        reopen: 'Review Tutorial',
    },
    de: {
        steps: [
            { title: 'Willkommen beim DMA Calculator', description: 'Dieses Tool hilft Ihnen, potenzielle Einsparungen mit den neuen externen Zahlungssystemen des Digital Markets Act in Europa zu berechnen.', icon: '🇪🇺' },
            { title: 'Core Technology Commission (CTC)', description: 'Ab 2026 erhebt Apple 5% auf alle digitalen Verkäufe über External Purchase, im App Store, Web Distribution und alternativen Marktplätzen.', icon: '💰' },
            { title: 'Store Services Tier 1 vs Tier 2', description: 'Tier 1 (5%): Basisdienste - Hosting, Sicherheit.\nTier 2 (13%): Volldienste - Discovery, Featuring, Auto-Updates. Small Business: 10%.', icon: '📦' },
            { title: 'Initial Acquisition Fee (IAF)', description: 'Temporäre Provision für Neukunden in den ersten 6 Monaten.\n• Apple: 2% (befreit für Small Business)\n• Google: 3%', icon: '⏱️' },
            { title: 'Conversion-Rate-Rückgang', description: 'Bei External Purchase zeigen Apple/Google einen obligatorischen Warnbildschirm. Dies reduziert die Conversion um geschätzte 10-30%.', icon: '📉' },
            { title: 'Small Business Programm', description: 'Bei weniger als 1M$/Jahr können Sie das Small Business Programm nutzen, das die IAP-Provisionen von 30% auf 15% reduziert.', icon: '🏪' },
            { title: 'External Purchase: Wann lohnt es sich?', description: '✅ Kein Small Business (30% → ~15%)\n✅ Bestehendes Web-Zahlungssystem\n❌ Bereits Small Business (15% vs ~13%)\n❌ Conversion empfindlich gegenüber Warnungen', icon: '🤔' },
        ],
        back: 'Zurück',
        next: 'Weiter',
        start: 'Starten',
        reopen: 'Tutorial wiederholen',
    },
    fr: {
        steps: [
            { title: 'Bienvenue dans DMA Calculator', description: 'Cet outil vous aide à calculer les économies potentielles en utilisant les nouveaux systèmes de paiement externes introduits par le Digital Markets Act européen.', icon: '🇪🇺' },
            { title: 'Core Technology Commission (CTC)', description: 'À partir de 2026, Apple applique 5% sur toutes les ventes numériques via External Purchase, sur l\'App Store, Web Distribution et les marketplaces alternatifs.', icon: '💰' },
            { title: 'Store Services Tier 1 vs Tier 2', description: 'Tier 1 (5%): Services de base - hébergement, sécurité.\nTier 2 (13%): Services complets - découverte, mise en avant, mises à jour auto. Small Business: 10%.', icon: '📦' },
            { title: 'Initial Acquisition Fee (IAF)', description: 'Commission temporaire sur les nouveaux utilisateurs les 6 premiers mois.\n• Apple: 2% (exempté pour Small Business)\n• Google: 3%', icon: '⏱️' },
            { title: 'Baisse du taux de conversion', description: 'Avec External Purchase, Apple/Google affichent un écran d\'avertissement obligatoire. Cela réduit la conversion de 10-30% estimé.', icon: '📉' },
            { title: 'Programme Small Business', description: 'Si vous gagnez moins d\'1M$/an, vous pouvez accéder au programme Small Business qui réduit les commissions IAP de 30% à 15%.', icon: '🏪' },
            { title: 'External Purchase: Quand l\'utiliser?', description: '✅ Pas Small Business (30% → ~15%)\n✅ Système de paiement web existant\n❌ Déjà Small Business (15% vs ~13%)\n❌ Conversion sensible aux avertissements', icon: '🤔' },
        ],
        back: 'Retour',
        next: 'Suivant',
        start: 'Commencer',
        reopen: 'Revoir le tutoriel',
    },
    es: {
        steps: [
            { title: 'Bienvenido a DMA Calculator', description: 'Esta herramienta te ayuda a calcular los ahorros potenciales usando los nuevos sistemas de pago externos introducidos por el Digital Markets Act europeo.', icon: '🇪🇺' },
            { title: 'Core Technology Commission (CTC)', description: 'Desde 2026, Apple aplica el 5% sobre todas las ventas digitales realizadas mediante External Purchase, en App Store, Web Distribution y marketplaces alternativos.', icon: '💰' },
            { title: 'Store Services Tier 1 vs Tier 2', description: 'Tier 1 (5%): Servicios básicos - hosting, seguridad.\nTier 2 (13%): Servicios completos - descubrimiento, destacados, actualizaciones auto. Small Business: 10%.', icon: '📦' },
            { title: 'Initial Acquisition Fee (IAF)', description: 'Comisión temporal sobre nuevos usuarios los primeros 6 meses.\n• Apple: 2% (exento para Small Business)\n• Google: 3%', icon: '⏱️' },
            { title: 'Caída del ratio de conversión', description: 'Al usar External Purchase, Apple/Google muestran una pantalla de advertencia obligatoria. Esto reduce la conversión un 10-30% estimado.', icon: '📉' },
            { title: 'Programa Small Business', description: 'Si facturas menos de 1M$/año, puedes acceder al programa Small Business que reduce las comisiones IAP del 30% al 15%.', icon: '🏪' },
            { title: 'External Purchase: ¿Cuándo usarlo?', description: '✅ No eres Small Business (30% → ~15%)\n✅ Tienes sistema de pago web existente\n❌ Ya eres Small Business (15% vs ~13%)\n❌ Conversión sensible a advertencias', icon: '🤔' },
        ],
        back: 'Atrás',
        next: 'Siguiente',
        start: 'Empezar',
        reopen: 'Revisar Tutorial',
    },
};

// Global event for reopening
let reopenCallback: (() => void) | null = null;

export const reopenOnboarding = () => {
    if (reopenCallback) {
        reopenCallback();
    }
};

export const OnboardingOverlay = () => {
    const [visible, setVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const { isDark } = useTheme();
    const { locale } = useLanguageStore();
    const themeColors = getThemeColors(isDark);

    const translations = ONBOARDING_TRANSLATIONS[locale] || ONBOARDING_TRANSLATIONS.en;
    const steps = translations.steps;

    useEffect(() => {
        AsyncStorage.getItem(ONBOARDING_KEY).then((val) => {
            if (val !== 'seen') {
                setVisible(true);
            }
        });
    }, []);

    // Register reopen callback
    useEffect(() => {
        reopenCallback = () => {
            setCurrentStep(0);
            setVisible(true);
        };
        return () => {
            reopenCallback = null;
        };
    }, []);

    const handleClose = () => {
        AsyncStorage.setItem(ONBOARDING_KEY, 'seen');
        setVisible(false);
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleClose();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const step = steps[currentStep];

    if (!visible) return null;

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <MotiView
                    from={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                    style={[styles.modal, { backgroundColor: themeColors.surface }]}
                >
                    {/* Close Button */}
                    <Pressable onPress={handleClose} style={styles.closeButton}>
                        <X size={20} color={themeColors.textMuted} />
                    </Pressable>

                    {/* Icon */}
                    <Text style={styles.icon}>{step.icon}</Text>

                    {/* Title */}
                    <Text style={[styles.title, { color: themeColors.text }]}>{step.title}</Text>

                    {/* Description */}
                    <Text style={[styles.description, { color: themeColors.textSecondary }]}>
                        {step.description}
                    </Text>

                    {/* Progress Dots */}
                    <View style={styles.dots}>
                        {steps.map((_, idx) => (
                            <View
                                key={idx}
                                style={[
                                    styles.dot,
                                    { backgroundColor: idx === currentStep ? colors.primary : themeColors.border }
                                ]}
                            />
                        ))}
                    </View>

                    {/* Navigation */}
                    <View style={styles.navigation}>
                        <Pressable
                            onPress={handlePrev}
                            style={[styles.navButton, { opacity: currentStep === 0 ? 0.3 : 1 }]}
                            disabled={currentStep === 0}
                        >
                            <ChevronLeft size={20} color={themeColors.text} />
                            <Text style={[styles.navText, { color: themeColors.text }]}>{translations.back}</Text>
                        </Pressable>

                        <Pressable onPress={handleNext} style={[styles.navButton, styles.nextButton]}>
                            <Text style={styles.nextText}>
                                {currentStep === steps.length - 1 ? translations.start : translations.next}
                            </Text>
                            <ChevronRight size={20} color="#fff" />
                        </Pressable>
                    </View>
                </MotiView>
            </View>
        </Modal>
    );
};

// Trigger button for reopening onboarding - works on mobile and web
// Trigger button for reopening onboarding - works on mobile and web
export const OnboardingTrigger = ({ variant = 'default' }: { variant?: 'default' | 'icon' }) => {
    const { isDark } = useTheme();
    const { locale } = useLanguageStore();
    const themeColors = getThemeColors(isDark);
    const translations = ONBOARDING_TRANSLATIONS[locale] || ONBOARDING_TRANSLATIONS.en;

    const handleReopen = () => {
        reopenOnboarding();
    };

    if (variant === 'icon') {
        return (
            <Pressable onPress={handleReopen} style={styles.iconTrigger}>
                <HelpCircle size={22} color={themeColors.text} />
            </Pressable>
        );
    }

    return (
        <Pressable onPress={handleReopen} style={[styles.trigger, { borderColor: themeColors.border }]}>
            <HelpCircle size={16} color={colors.primary} />
            <Text style={[styles.triggerText, { color: colors.primary }]}>{translations.reopen}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
    },
    modal: {
        width: '100%',
        maxWidth: 400,
        borderRadius: radius.xl,
        padding: spacing.xl,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
        padding: spacing.xs,
    },
    icon: {
        fontSize: 48,
        marginBottom: spacing.lg,
    },
    title: {
        fontSize: typography.xl,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    description: {
        fontSize: typography.base,
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    dots: {
        flexDirection: 'row',
        gap: spacing.xs,
        marginBottom: spacing.lg,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: spacing.md,
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        gap: spacing.xs,
    },
    navText: {
        fontSize: typography.base,
    },
    nextButton: {
        backgroundColor: colors.primary,
        borderRadius: radius.md,
        paddingHorizontal: spacing.lg,
    },
    nextText: {
        color: '#fff',
        fontSize: typography.base,
        fontWeight: '600',
    },
    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        padding: spacing.sm,
        borderRadius: radius.md,
        borderWidth: 1,
    },
    triggerText: {
        fontSize: typography.sm,
        fontWeight: '500',
    },
    iconTrigger: {
        padding: spacing.xs,
    },
});
