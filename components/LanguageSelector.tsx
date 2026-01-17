import React, { useState } from 'react';
import { View, Text, Pressable, Modal, FlatList, StyleSheet } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguageStore, useTranslation, SUPPORTED_LANGUAGES, Language } from '@/constants/i18n';
import { colors, spacing, typography, radius, getThemeColors } from '@/constants/design';

export const LanguageSelector = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { locale, setLocale } = useTranslation();
    const { isDark } = useTheme();
    const themeColors = getThemeColors(isDark);

    const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === locale) || SUPPORTED_LANGUAGES[1];

    const handleSelect = (code: Language) => {
        setLocale(code);
        setModalVisible(false);
    };

    return (
        <>
            <Pressable
                onPress={() => setModalVisible(true)}
                style={[styles.trigger, { backgroundColor: themeColors.borderSubtle }]}
            >
                <Text style={styles.flag}>{currentLang.flag}</Text>
                <Text style={[styles.code, { color: themeColors.text }]}>{currentLang.code.toUpperCase()}</Text>
                <ChevronDown size={14} color={themeColors.textMuted} />
            </Pressable>

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={[styles.modal, { backgroundColor: themeColors.surface }]}>
                        <Text style={[styles.modalTitle, { color: themeColors.text }]}>Seleziona Lingua</Text>
                        <FlatList
                            data={SUPPORTED_LANGUAGES}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => handleSelect(item.code)}
                                    style={[
                                        styles.option,
                                        item.code === locale && { backgroundColor: colors.primary + '20' }
                                    ]}
                                >
                                    <Text style={styles.optionFlag}>{item.flag}</Text>
                                    <Text style={[styles.optionLabel, { color: themeColors.text }]}>
                                        {item.label}
                                    </Text>
                                    {item.code === locale && (
                                        <Text style={styles.check}>✓</Text>
                                    )}
                                </Pressable>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.md,
    },
    flag: {
        fontSize: 16,
    },
    code: {
        fontSize: typography.xs,
        fontWeight: '600',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: 280,
        borderRadius: radius.lg,
        padding: spacing.md,
        maxHeight: 400,
    },
    modalTitle: {
        fontSize: typography.lg,
        fontWeight: '600',
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: radius.md,
        gap: spacing.sm,
    },
    optionFlag: {
        fontSize: 20,
    },
    optionLabel: {
        flex: 1,
        fontSize: typography.base,
    },
    check: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
