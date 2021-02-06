import _ from 'lodash';

const getUnionKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2).sort();
  return unionKeys;
};

const getDiffs = (data1, data2) => {
  const unionKeys = getUnionKeys(data1, data2);
  const result = unionKeys.map((item) => {
    const beforeValue = data1[item];
    const afterValue = data2[item];
    let status = ' ';
    let value = beforeValue;
    const key = item;
    if (!_.has(data1, item) && _.has(data2, item)) {
      status = '+';
      value = afterValue;
      return { status, key, value };
    }
    if (!_.has(data2, item) && _.has(data1, item)) {
      status = '-';
      value = beforeValue;
      return { status, key, value };
    }
    if (beforeValue !== afterValue) {
      status = '-';
      value = beforeValue;
      const oneItem = { status, key, value };
      status = '+';
      value = afterValue;
      const twoItem = { status, key, value };
      return [oneItem, twoItem];
    }
    return { status, key, value };
  });
  return result;
};

export default getDiffs;
