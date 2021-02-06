import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff', () => {
  const data1 = getFixturePath('file1.json');
  const data2 = getFixturePath('file2.json');
  const expectedData = readFile('expectedJson.txt');
  console.log(genDiff(data1, data2));
  console.log(expectedData);
  expect(genDiff(data1, data2)).toBe(expectedData);
});
