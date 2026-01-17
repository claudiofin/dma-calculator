const mockStorage = {
    setItem: () => Promise.resolve(),
    getItem: () => Promise.resolve(null),
    removeItem: () => Promise.resolve(),
};
export default mockStorage;
