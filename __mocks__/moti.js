const React = require('react');

const View = ({ style, ...props }) => {
    const flatStyle = Array.isArray(style) ? Object.assign({}, ...style) : style;
    return React.createElement('div', { style: flatStyle, ...props });
};

module.exports = {
    MotiView: View,
    useAnimationState: () => ({ transitionTo: () => { } }),
};
