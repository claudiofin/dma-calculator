import { create } from 'twrnc';

// Create a singleton instance using the project's config
const tw = create(require('../tailwind.config.js'));

export default tw;
