import getRenderStylish from './stylish.js';
import getRenderPlain from './plain.js';
import getRenderJSON from './json.js';

const formatter = {
  stylish: getRenderStylish,
  plain: getRenderPlain,
  json: getRenderJSON,
};

export default (format) => formatter[format];
