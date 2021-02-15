import getRenderStylish from './stylish.js';
import getRenderPlain from './plain.js';
import getRenderJSON from './json.js';

const formatter = {
  stylish: getRenderStylish,
  plain: getRenderPlain,
  json: getRenderJSON,
};

export default (formatName) => {
  try {
    return formatter[formatName];
  } catch {
    throw new Error(`Error! Unknown format: ${formatName}`);
  }
};
