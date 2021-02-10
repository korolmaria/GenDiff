import _ from 'lodash';
import path from 'path';
import getDiffs from './diffs.js';
import parseData from './parsers.js';
import getRenderStylish from './formatters/stylish.js';

const getDataFile = (filepath) => {
  const normalPath = path.resolve(process.cwd(), filepath);
  return parseData(normalPath);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getDataFile(filepath1);
  const data2 = getDataFile(filepath2);
  const result = getDiffs(data1, data2);
  return getRenderStylish(result);
};

export default genDiff;
