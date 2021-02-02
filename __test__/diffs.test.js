import fs from 'fs';
import path from 'path';
import getDiffs from '../src/diffs.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => JSON.parse(fs.readFileSync(getFixturePath(filename), 'utf-8'));

test('getdiffs', () => {
  const data1 = readFile('file1.json');
  const data2 = readFile('file2.json');
  const expectedData = readFile('expected_file.json');
  expect(getDiffs(data1, data2)).toEqual(expectedData);
});
