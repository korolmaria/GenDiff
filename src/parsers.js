import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = {
  json: JSON.parse,
  yml: yaml.load,
};

const parseData = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  const format = path.extname(filepath).slice(1);
  return parser[format](data);
};

export default parseData;
