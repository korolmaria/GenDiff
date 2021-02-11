import getRenderStylish from './stylish.js';
import getRenderPlain from './plain.js';

const formatter = {
  stylish: getRenderStylish,
  plain: getRenderPlain,
};

export default (format) => formatter[format];
