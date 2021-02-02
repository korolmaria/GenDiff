import fs from 'fs';
import path from 'path';
import getDiffs from './diffs.js';

const getDataFile = (filepath) => {
  const normalPath = path.resolve(process.cwd(), '__fixtures__/', filepath);
  const data = JSON.parse(fs.readFileSync(normalPath, 'utf8'));
  return data;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getDataFile(filepath1);
  const data2 = getDataFile(filepath2);
  return getDiffs(data1, data2);
};

export default genDiff;
