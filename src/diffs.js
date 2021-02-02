import _ from 'lodash';

const getUnionKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2).sort();
  return unionKeys;
};

const getDiffs = (data1, data2) => {
  const unionKeys = getUnionKeys(data1, data2);
  const result = unionKeys.reduce((acc, item) => {
    const beforeValue = data1[item];
    const afterValue = data2[item];
    let status = ' ';
    let key = '';
    if (!_.has(data1, item) && _.has(data2, item)) {
      status = '+';
      key = `${status} ${item}`;
      acc[key] = afterValue;
      return acc;
    }
    if (!_.has(data2, item) && _.has(data1, item)) {
      status = '-';
      key = `${status} ${item}`;
      acc[key] = beforeValue;
      return acc;
    }
    if (beforeValue !== afterValue) {
      status = '-';
      key = `${status} ${item}`;
      acc[key] = beforeValue;
      status = '+';
      key = `${status} ${item}`;
      acc[key] = afterValue;
      return acc;
    }
    key = `${status} ${item}`;
    acc[key] = afterValue;
    return acc;
  }, {});
  return result;
};

export default getDiffs;
