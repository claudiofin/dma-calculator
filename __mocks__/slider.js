const React = require('react');
const Slider = (props) => React.createElement('input', { type: 'range', ...props });
module.exports = Slider;
module.exports.default = Slider;
