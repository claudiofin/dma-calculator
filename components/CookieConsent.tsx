import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotiView } from 'moti';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography, radius } from '@/constants/design';

const CONSENT_KEY = '@dma_cookie_consent';

export const CookieConsent = () => {
    const [visible, setVisible] = useState(false);
    const { isDark } = useTheme();

    useEffect(() => {
        AsyncStorage.getItem(CONSENT_KEY).then((val) => {
            if (val !== 'accepted' && val !== 'declined') {
                setVisible(true);
            }
        });
    }, []);

    const handleConsent = (accepted: boolean) => {
        AsyncStorage.setItem(CONSENT_KEY, accepted ? 'accepted' : 'declined');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <MotiView
            from={{ opacity: 0, translateY: 100 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            style={[
                styles.container,
                { backgroundColor: isDark ? colors.dark.surface : colors.light.surface }
            ]}
        >
            <Text style={[styles.text, { color: isDark ? colors.dark.text : colors.light.text }]}>
                🍪 Questo sito utilizza localStorage per salvare le tue preferenze (lingua, tema).
                Non utilizziamo cookie di tracciamento.
            </Text>
            <View style={styles.buttons}>
                <Pressable
                    onPress={() => handleConsent(false)}
                    style={[styles.button, styles.declineButton]}
                >
                    <Text style={styles.declineText}>Rifiuta</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleConsent(true)}
                    style={[styles.button, styles.acceptButton]}
                >
                    <Text style={styles.acceptText}>Accetta</Text>
                </Pressable>
            </View>
            <Pressable onPress={async () => {
                const url = 'https://gdpr.eu/cookies/';
                try {
                    const canOpen = await Linking.canOpenURL(url);
                    if (canOpen) {
                        await Linking.openURL(url);
                    }
                } catch (e) {
                    // Silently fail on devices that can't open URLs
                    console.log('Could not open URL:', e);
                }
            }}>
                <Text style={styles.link}>Maggiori informazioni sul GDPR</Text>
            </Pressable>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: spacing.lg,
        left: spacing.lg,
        right: spacing.lg,
        padding: spacing.lg,
        borderRadius: radius.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        zIndex: 1000,
    },
    text: {
        fontSize: typography.sm,
        lineHeight: 20,
        marginBottom: spacing.md,
    },
    buttons: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    button: {
        flex: 1,
        paddingVertical: spacing.sm,
        borderRadius: radius.md,
        alignItems: 'center',
    },
    declineButton: {
        backgroundColor: '#e2e8f0',
    },
    declineText: {
        color: '#64748b',
        fontWeight: '500',
    },
    acceptButton: {
        backgroundColor: colors.primary,
    },
    acceptText: {
        color: '#fff',
        fontWeight: '600',
    },
    link: {
        color: colors.primary,
        fontSize: typography.xs,
        marginTop: spacing.sm,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});
