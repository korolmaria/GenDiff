import fs from 'fs';
import path from 'path';
import getDiffs from './ast.js';
import parseData from './parser.js';
import getFormatter from './formatters/index.js';

const getDataFile = (filepath) => {
  const normalPath = path.resolve(process.cwd(), filepath);
  const formatName = path.extname(filepath).slice(1);
  const data = fs.readFileSync(normalPath, 'utf-8');
  return parseData(formatName, data);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getDataFile(filepath1);
  const data2 = getDataFile(filepath2);
  const resultData = getDiffs(data1, data2);
  return getFormatter(formatName)(resultData);
};

export default genDiff;
