import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const beforeDataJson = getFixturePath('beforeFile.json');
const afterDataJson = getFixturePath('afterFile.json');
const beforeDataYaml = getFixturePath('beforeFile.yml');
const afterDataYaml = getFixturePath('afterFile.yml');

test('gendiff_stylish', () => {
  const expectedDataStylish = readFile('expectedStylish.txt');
  expect(genDiff(beforeDataJson, afterDataJson)).toBe(expectedDataStylish);
  expect(genDiff(beforeDataYaml, afterDataYaml)).toBe(expectedDataStylish);
});

test('gendiff_plain', () => {
  const expectedDataPlain = readFile('expectedPlain.txt');
  expect(genDiff(beforeDataJson, afterDataJson, 'plain')).toBe(expectedDataPlain);
  expect(genDiff(beforeDataYaml, afterDataYaml, 'plain')).toBe(expectedDataPlain);
});

test('gendiff_json', () => {
  const expectedDataJSON = readFile('expectedJSON.txt');
  expect(genDiff(beforeDataJson, afterDataJson, 'json')).toBe(expectedDataJSON);
  expect(genDiff(beforeDataYaml, afterDataYaml, 'json')).toBe(expectedDataJSON);
});
