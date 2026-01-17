import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HomeScreen from '../../app/index';
import { useDMACalculator } from '../../hooks/useDMACalculator';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock hooks
vi.mock('../../hooks/useDMACalculator', () => ({
    useDMACalculator: vi.fn(),
}));

vi.mock('../../contexts/ThemeContext', () => ({
    useTheme: () => ({
        isDark: false,
    }),
    getThemeColors: () => ({
        background: '#fff',
        text: '#000',
    }),
}));

// Mock child components that are complex or have their own tests
vi.mock('../../components/ComparisonCard', () => ({
    ComparisonCard: ({ title }: { title: string }) => <div>{title}</div>,
}));
vi.mock('../../components/OnboardingOverlay', () => ({
    OnboardingOverlay: () => null,
    OnboardingTrigger: () => null,
}));

describe('HomeScreen Integration', () => {
    const mockCalculatorReturn = {
        calculateApple: vi.fn().mockReturnValue({ cost: 100, net: 900, rate: 10 }),
        calculateGoogle: vi.fn().mockReturnValue({ cost: 100, net: 900, rate: 10 }),
        grossRevenue: 1000,
        settings: {},
    };

    beforeEach(() => {
        // Default mock implementation
        (useDMACalculator as any).mockReturnValue(mockCalculatorReturn);
    });

    it('renders main title correctly', () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText('DMA Calculator')).toBeTruthy();
    });

    it('renders language selector', () => {
        render(<HomeScreen />);
        // Basic check to ensure no crash
    });
});
