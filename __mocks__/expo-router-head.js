const React = require('react');

const Head = ({ children }) => children;
// Assign default to the function itself to handle default import
Head.Head = Head;

module.exports = Head;
// Also Mock named export just in case
module.exports.Head = Head;
module.exports.default = Head;
