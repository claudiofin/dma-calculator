import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { ChevronDown, ChevronUp, TrendingDown, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors, spacing, typography, radius, shadows, getThemeColors } from '@/constants/design';

interface ComparisonCardProps {
    storeName: string;
    modelName: string;
    commissionRate: number;
    cost: number;
    net: number;
    savings?: number;
    accentColor: string;
    details: string[];
}

export const ComparisonCard = ({
    storeName,
    modelName,
    commissionRate,
    cost,
    net,
    savings,
    accentColor,
    details,
}: ComparisonCardProps) => {
    const [expanded, setExpanded] = useState(false);
    const { isDark } = useTheme();
    const themeColors = getThemeColors(isDark);

    const formatEuro = (val: number) =>
        new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(val);

    return (
        <View style={[
            styles.card,
            {
                backgroundColor: themeColors.surface,
                borderColor: themeColors.border,
            },
            shadows.md
        ]}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={[styles.storeName, { color: themeColors.text }]}>{storeName}</Text>
                    <Text style={[styles.modelName, { color: themeColors.textSecondary }]}>{modelName}</Text>
                </View>
                <Pressable onPress={() => setExpanded(!expanded)} style={styles.expandButton}>
                    {expanded ? (
                        <ChevronUp size={20} color={themeColors.textMuted} />
                    ) : (
                        <ChevronDown size={20} color={themeColors.textMuted} />
                    )}
                </Pressable>
            </View>

            {/* Commission Rate - Big Number */}
            <View style={styles.rateContainer}>
                <Text style={[styles.rateNumber, { color: accentColor }]}>
                    {commissionRate.toFixed(1)}%
                </Text>
                <Text style={[styles.rateLabel, { color: themeColors.textMuted }]}>
                    Commissione Totale
                </Text>
            </View>

            {/* Expanded Details */}
            {expanded && (
                <MotiView
                    from={{ opacity: 0, translateY: -10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 200 }}
                    style={[styles.detailsContainer, { backgroundColor: themeColors.borderSubtle }]}
                >
                    {details.map((detail, idx) => (
                        <Text key={idx} style={[styles.detailText, { color: themeColors.textSecondary }]}>
                            • {detail}
                        </Text>
                    ))}
                </MotiView>
            )}

            {/* Financial Summary */}
            <View style={[styles.divider, { backgroundColor: themeColors.border }]} />

            <View style={styles.financialRow}>
                <View style={styles.financialItem}>
                    <TrendingDown size={16} color={colors.error} />
                    <Text style={[styles.financialLabel, { color: themeColors.textSecondary }]}>Costi</Text>
                    <Text
                        style={[styles.financialValue, { color: colors.error }]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        -{formatEuro(cost)}
                    </Text>
                </View>
                <View style={styles.financialItem}>
                    <TrendingUp size={16} color={colors.success} />
                    <Text style={[styles.financialLabel, { color: themeColors.textSecondary }]}>Netto</Text>
                    <Text
                        style={[styles.financialValue, { color: colors.success }]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        {formatEuro(net)}
                    </Text>
                </View>
            </View>

            {/* Savings Badge */}
            {savings !== undefined && savings > 0 && (
                <View style={[styles.savingsBadge, { backgroundColor: colors.successBg }]}>
                    <Text style={styles.savingsText}>
                        💰 Risparmio: {formatEuro(savings)}/mese
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    storeName: {
        fontSize: typography.xl,
        fontWeight: typography.bold,
    },
    modelName: {
        fontSize: typography.sm,
        marginTop: spacing.xs,
    },
    expandButton: {
        padding: spacing.xs,
    },
    rateContainer: {
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    rateNumber: {
        fontSize: typography['4xl'],
        fontWeight: typography.bold,
    },
    rateLabel: {
        fontSize: typography.xs,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: spacing.xs,
    },
    detailsContainer: {
        padding: spacing.md,
        borderRadius: radius.md,
        marginBottom: spacing.md,
    },
    detailText: {
        fontSize: typography.sm,
        marginBottom: spacing.xs,
    },
    divider: {
        height: 1,
        marginVertical: spacing.md,
    },
    financialRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    financialItem: {
        alignItems: 'center',
        gap: spacing.xs,
    },
    financialLabel: {
        fontSize: typography.xs,
    },
    financialValue: {
        fontSize: typography.lg,
        fontWeight: typography.semibold,
    },
    savingsBadge: {
        marginTop: spacing.md,
        padding: spacing.sm,
        borderRadius: radius.md,
        alignItems: 'center',
    },
    savingsText: {
        color: '#065f46',
        fontWeight: typography.semibold,
        fontSize: typography.sm,
    },
});
