// Setup temporarily disabled for debugging
// require('react-native-reanimated').setUpTests();

// Mock main expo package to avoid runtime initialization errors
jest.mock('expo', () => ({
    registerRootComponent: jest.fn(),
    requireOptionalNativeModule: jest.fn(),
    requireNativeModule: jest.fn(),
}));

jest.mock('expo-localization', () => ({
    getLocales: () => [{ languageCode: 'en' }],
}));

jest.mock('expo-router', () => ({
    Stack: { Screen: () => null },
    Link: ({ children }) => children,
    useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('expo-constants', () => ({
    manifest: { extra: {} },
}));



// Global mocks
global.fetch = jest.fn();

// Mock Async Storage
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Reanimated
require('react-native-reanimated').setUpTests();
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => { };
    return Reanimated;
});

// Mock i18n-js
jest.mock('i18n-js', () => ({
    I18n: class {
        constructor() { }
        t = (key) => key;
        enableFallback = true;
        locale = 'en';
    },
}));

// Mock Moti
jest.mock('moti', () => ({
    MotiView: 'View',
    MotiText: 'Text',
}));
