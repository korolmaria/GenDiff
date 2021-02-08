import path from 'path';
import getDiffs from './diffs.js';
import parseData from './parsers.js';

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
  return parseData(normalPath);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getDataFile(filepath1);
  console.log(data1);
  const data2 = getDataFile(filepath2);
  console.log(data2);
  const result = getDiffs(data1, data2);
  return renderTree(result);
};

export default genDiff;
