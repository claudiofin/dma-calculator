import { vi } from 'vitest';


// Shim jest for compatibility
(global as any).jest = vi;

// Mock React Native / Expo modules that Vitest/HappyDOM can't handle locally
vi.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock Expo constants
vi.mock('expo-constants', () => ({
    default: {
        manifest: {
            extra: {},
        },
    },
}));

// Mock Expo localization
vi.mock('expo-localization', () => ({
    getLocales: () => [{ languageCode: 'en' }],
}));

// Mock Expo Haptics
vi.mock('expo-haptics', () => ({
    selectionAsync: vi.fn(),
    impactAsync: vi.fn(),
    notificationAsync: vi.fn(),
}));

// Mock Expo Web Browser
vi.mock('expo-web-browser', () => ({
    openBrowserAsync: vi.fn(),
}));

// Mock AsyncStorage with default export
vi.mock('@react-native-async-storage/async-storage', () => {
    const mockStorage = {
        setItem: vi.fn(() => Promise.resolve()),
        getItem: vi.fn(() => Promise.resolve(null)),
        removeItem: vi.fn(() => Promise.resolve()),
        mergeItem: vi.fn(() => Promise.resolve()),
        clear: vi.fn(() => Promise.resolve()),
        getAllKeys: vi.fn(() => Promise.resolve([])),
        multiGet: vi.fn(() => Promise.resolve([])),
        multiSet: vi.fn(() => Promise.resolve()),
        multiRemove: vi.fn(() => Promise.resolve()),
        multiMerge: vi.fn(() => Promise.resolve()),
    };
    return {
        default: mockStorage,
        ...mockStorage,
    };
});

// Mock Reanimated (handled by alias to __mocks__/reanimated.js)
// vi.mock('react-native-reanimated', () => {
//     const Reanimated = require('react-native-reanimated/mock');
//     Reanimated.default.call = () => { };
//     return Reanimated;
// });

// Mock Moti - must flatten style arrays for DOM compatibility
vi.mock('moti', () => {
    const React = require('react');
    const MotiView = ({ style, children, ...props }: any) => {
        const flatStyle = Array.isArray(style)
            ? Object.assign({}, ...style.filter(Boolean))
            : style;
        return React.createElement('div', { style: flatStyle, ...props }, children);
    };
    return {
        MotiView,
        useAnimationState: () => ({ transitionTo: vi.fn() }),
    };
});

// Mock Navigation
vi.mock('expo-router', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        back: vi.fn(),
    }),
    Stack: {
        Screen: () => null,
    },
}));

// Mock i18n-js if needed
vi.mock('i18n-js', () => {
    return {
        I18n: class {
            constructor() { }
            t = (key: string) => key;
            enableFallback = true;
            locale = 'en';
        }
    };
});
