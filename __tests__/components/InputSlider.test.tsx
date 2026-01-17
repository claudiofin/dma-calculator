import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { InputSlider } from '../../components/InputSlider';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Mock Slider since it's a native component
vi.mock('@react-native-community/slider', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: class Slider extends React.Component {
            render() {
                return (
                    <input
                        data-testid={this.props.testID}
                        onChange={(e: any) => this.props.onValueChange(parseFloat(e.target.value))}
                        type="range"
                        min={this.props.minimumValue}
                        max={this.props.maximumValue}
                        value={this.props.value}
                    />
                );
            }
        },
    };
});

vi.mock('../../contexts/ThemeContext', () => ({
    useTheme: () => ({
        isDark: false,
    }),
    getThemeColors: () => ({
        primary: '#000',
        text: '#000',
        surface: '#fff',
    }),
}));

describe('InputSlider', () => {
    const mockOnValueChange = vi.fn();

    beforeEach(() => {
        mockOnValueChange.mockClear();
    });

    afterEach(() => {
        cleanup();
    });

    it('renders correctly with given label and value', () => {
        const { getByText } = render(
            <InputSlider
                label="Monthly Users"
                value={50}
                onValueChange={mockOnValueChange}
                min={0}
                max={100}
                suffix=" users"
            />
        );

        expect(getByText('Monthly Users')).toBeTruthy();
        expect(getByText('50 users')).toBeTruthy();
    });



    it('calls onValueChange when slider value changes', () => {
        const { getByTestId } = render(
            <InputSlider
                label="Test Slider"
                value={50}
                onValueChange={mockOnValueChange}
                min={0}
                max={100}
            />
        );

        const slider = getByTestId('slider');

        // Simulating the change event as defined in our mock
        fireEvent.change(slider, { target: { value: '75' } });

        expect(mockOnValueChange).toHaveBeenCalledWith(75);
    });
});
