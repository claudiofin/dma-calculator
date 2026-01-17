// Design Tokens - Universal Design System
// 4px baseline grid for consistent spacing

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
} as const;

export const radius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
} as const;

export const colors = {
    // Brand
    primary: '#4f46e5',
    primaryLight: '#818cf8',
    primaryDark: '#3730a3',

    // Semantic
    success: '#10b981',
    successBg: '#d1fae5',
    warning: '#f59e0b',
    warningBg: '#fef3c7',
    error: '#ef4444',
    errorBg: '#fee2e2',

    // Light Theme
    light: {
        background: '#f8fafc',
        surface: '#ffffff',
        surfaceElevated: '#ffffff',
        border: '#e2e8f0',
        borderSubtle: '#f1f5f9',
        text: '#0f172a',
        textSecondary: '#64748b',
        textMuted: '#94a3b8',
    },

    // Dark Theme
    dark: {
        background: '#0f172a',
        surface: '#1e293b',
        surfaceElevated: '#334155',
        border: '#334155',
        borderSubtle: '#1e293b',
        text: '#f8fafc',
        textSecondary: '#94a3b8',
        textMuted: '#64748b',
    },
} as const;

export const typography = {
    // Font sizes
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,

    // Font weights
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
} as const;

export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
} as const;

// Helper to get theme-aware colors
export function getThemeColors(isDark: boolean) {
    return isDark ? colors.dark : colors.light;
}
