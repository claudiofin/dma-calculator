module.exports = {
    registerRootComponent: jest.fn(),
    requireNativeModule: jest.fn(),
    requireOptionalNativeModule: jest.fn((name) => null), // Return null or mock
    isLoaded: jest.fn().mockReturnValue(true),
    loadAsync: jest.fn(),
    useFonts: () => [true, null],
};
