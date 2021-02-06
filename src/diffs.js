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
    const key = item;
    if (!_.has(data1, item) && _.has(data2, item)) {
      const status = 'added';
      return { status, key, afterValue };
    }
    if (!_.has(data2, item) && _.has(data1, item)) {
      const status = 'deleted';
      return { status, key, beforeValue };
    }
    if (beforeValue !== afterValue) {
      const status = 'changed';
      return {
        status, key, beforeValue, afterValue,
      };
    }
    const status = 'unchanged';
    return { status, key, afterValue };
  });
  return result;
};

export default getDiffs;
