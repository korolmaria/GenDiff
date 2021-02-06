import fs from 'fs';
import path from 'path';
import getDiffs from './diffs.js';

const renderTree = (elements) => {
  const strElems = elements.map(({
    status, key, beforeValue, afterValue,
  }) => {
    switch (status) {
      case 'deleted':
        return `${' '}- ${key}: ${beforeValue}`;
      case 'added':
        return `${' '}+ ${key}: ${afterValue}`;

      case 'changed':
        return `${' '}- ${key}: ${beforeValue}\n${' '}+ ${key}: ${afterValue}`;

      case 'unchanged':
        return `${' '}  ${key}: ${afterValue}`;

      default:
        throw new Error(`Unknown status: ${status}`);
    }
  });
  const string = `{\n${strElems.join('\n')}\n}`;
  return string;
};

const getDataFile = (filepath) => {
  const normalPath = path.resolve(process.cwd(), filepath);
  const data = JSON.parse(fs.readFileSync(normalPath, 'utf8'));
  return data;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getDataFile(filepath1);
  const data2 = getDataFile(filepath2);
  const result = getDiffs(data1, data2);
  return renderTree(result);
};

export default genDiff;
