module.exports = {
    requireNativeModule: jest.fn(),
    EventEmitter: jest.fn(),
    Platform: {
        OS: 'ios',
        select: (objs) => objs['ios'] || objs['default'],
    },
    NativeModulesProxy: {},
    ProxyNativeModule: jest.fn(),
    uuid: { v4: () => 'mock-uuid' },
};
