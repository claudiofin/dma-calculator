import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography, getThemeColors } from '@/constants/design';

interface InputSliderProps {
    label: string;
    value: number;
    onValueChange: (val: number) => void;
    min: number;
    max: number;
    step?: number;
    suffix?: string;
    description?: string;
}

export const InputSlider = ({
    label,
    value,
    onValueChange,
    min,
    max,
    step = 1,
    suffix = '',
    description,
}: InputSliderProps) => {
    const { isDark } = useTheme();
    const themeColors = getThemeColors(isDark);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.label, { color: themeColors.text }]}>{label}</Text>
                <Text
                    style={[styles.value, { color: colors.primary }]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                >
                    {value.toLocaleString()}{suffix}
                </Text>
            </View>
            <Slider
                testID="slider"
                style={styles.slider}
                minimumValue={min}
                maximumValue={max}
                step={step}
                value={value}
                onValueChange={onValueChange}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={themeColors.border}
                thumbTintColor={colors.primary}
            />
            {description && (
                <Text style={[styles.description, { color: themeColors.textMuted }]}>
                    {description}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    label: {
        flex: 1,
        fontSize: typography.base,
        fontWeight: typography.medium,
        marginRight: spacing.sm,
    },
    value: {
        fontSize: typography.lg,
        fontWeight: typography.bold,
        flexShrink: 0,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    description: {
        fontSize: typography.xs,
        marginTop: spacing.xs,
    },
});
