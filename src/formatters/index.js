import getRenderStylish from './stylish.js';

const formatter = {
  stylish: getRenderStylish,
};

export default (format) => formatter[format];
