// import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('gendiff', () => {
  const expectedData = `{
   common: {
     + follow: false
       setting1: Value 1
     - setting2: 200
     - setting3: true
     + setting3: null
     + setting4: blah blah
     + setting5: {
           key5: value5
       }
       setting6: {
           doge: {
             - wow: 
             + wow: so much
           }
           key: value
         + ops: vops
       }
   }
   group1: {
     - baz: bas
     + baz: bars
       foo: bar
     - nest: {
           key: value
       }
     + nest: str
   }
 - group2: {
       abc: 12345
   }
 + group3: {
       deep: {
           id: {
               number: 45
           }
       }
   }
}`;
  const beforeDataJson = getFixturePath('bigFile1.json');
  const afterDataJson = getFixturePath('bigfile2.json');
  const beforeDataYaml = getFixturePath('file1.yml');
  const afterDataYaml = getFixturePath('file2.yml');
  expect(genDiff(beforeDataJson, afterDataJson)).toBe(expectedData);
  expect(genDiff(beforeDataYaml, afterDataYaml)).toBe(expectedData);
});
