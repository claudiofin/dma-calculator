const React = require('react');

const IconMock = (name) => (props) => React.createElement('div', { ...props, 'data-testid': `icon-${name}` });

module.exports = {
    Sun: IconMock('Sun'),
    Moon: IconMock('Moon'),
    BookOpen: IconMock('BookOpen'),
    Info: IconMock('Info'),
    ChevronDown: IconMock('ChevronDown'),
    Check: IconMock('Check'),
    Globe: IconMock('Globe'),
    ExternalLink: IconMock('ExternalLink'),
};
