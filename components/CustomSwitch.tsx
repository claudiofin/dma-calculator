import React from 'react';
import { Pressable, View, StyleSheet, Platform } from 'react-native';
import { MotiView } from 'moti';
import { colors, getThemeColors } from '@/constants/design';
import { useTheme } from '@/contexts/ThemeContext';

interface CustomSwitchProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    disabled?: boolean;
}

export const CustomSwitch = ({ value, onValueChange, disabled = false }: CustomSwitchProps) => {
    const { isDark } = useTheme();
    const themeColors = getThemeColors(isDark);

    const trackColor = value ? colors.primary : themeColors.border;
    const thumbColor = '#ffffff';

    return (
        <Pressable
            onPress={() => !disabled && onValueChange(!value)}
            style={[
                styles.track,
                { backgroundColor: trackColor },
                disabled && styles.disabled,
            ]}
            accessibilityRole="switch"
            accessibilityState={{ checked: value, disabled }}
        >
            <MotiView
                animate={{
                    translateX: value ? 20 : 2,
                }}
                transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 300,
                }}
                style={[styles.thumb, { backgroundColor: thumbColor }]}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    track: {
        width: 50,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        padding: 2,
    },
    thumb: {
        width: 26,
        height: 26,
        borderRadius: 13,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    disabled: {
        opacity: 0.5,
    },
});
