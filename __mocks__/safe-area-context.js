const React = require('react');

const View = ({ style, ...props }) => {
    const flatStyle = Array.isArray(style) ? Object.assign({}, ...style) : style;
    return React.createElement('div', { style: flatStyle, ...props });
};

module.exports = {
    SafeAreaView: ({ children, style }) => React.createElement(View, { style }, children),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    SafeAreaProvider: ({ children }) => children,
};
