import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Moon, Sun } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, radius } from '@/constants/design';

export const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <Pressable
            onPress={toggleTheme}
            style={[
                styles.button,
                { backgroundColor: isDark ? colors.dark.surfaceElevated : colors.light.surface }
            ]}
            accessibilityLabel="Toggle Dark Mode"
            accessibilityRole="button"
        >
            <MotiView
                from={{ opacity: 0, scale: 0.5, rotate: '-180deg' }}
                animate={{ opacity: 1, scale: 1, rotate: '0deg' }}
                transition={{ type: 'spring', damping: 15 }}
                key={isDark ? 'dark' : 'light'}
            >
                {isDark ? (
                    <Moon size={20} color={colors.primaryLight} />
                ) : (
                    <Sun size={20} color={colors.primary} />
                )}
            </MotiView>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: spacing.sm,
        borderRadius: radius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
