// import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff', () => {
  const expectedData = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}';
  const beforeDataJson = getFixturePath('file1.json');
  const afterDataJson = getFixturePath('file2.json');
  const beforeDataYaml = getFixturePath('file1.yml');
  const afterDataYaml = getFixturePath('file2.yml');
  expect(genDiff(beforeDataJson, afterDataJson)).toBe(expectedData);
  expect(genDiff(beforeDataYaml, afterDataYaml)).toBe(expectedData);
});
