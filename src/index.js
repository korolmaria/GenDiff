import path from 'path';
import getDiffs from './diffs.js';
import parseData from './parsers.js';
import getFormatter from './formatters/index.js';

const getDataFile = (filepath) => {
  const normalPath = path.resolve(process.cwd(), filepath);
  return parseData(normalPath);
};

const genDiff = (filepath1, filepath2, formatName) => {
  const data1 = getDataFile(filepath1);
  const data2 = getDataFile(filepath2);
  const resultData = getDiffs(data1, data2);
  const formatRender = getFormatter(formatName);
  const resultRender = formatRender(resultData);
  return resultRender;
};

export default genDiff;
