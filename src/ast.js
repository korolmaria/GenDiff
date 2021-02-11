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
    let status = '';
    if (!_.has(data1, item) && _.has(data2, item)) {
      status = 'added';
      return { status, key, afterValue };
    }
    if (!_.has(data2, item) && _.has(data1, item)) {
      status = 'deleted';
      return { status, key, beforeValue };
    }

    if (beforeValue === afterValue) {
      status = 'unchanged';
      return { status, key, afterValue };
    }

    if (beforeValue !== afterValue && _.isPlainObject(beforeValue) && _.isPlainObject(afterValue)) {
      const children = getDiffs(beforeValue, afterValue);
      status = 'node';
      return { status, key, children };
    }

    if (beforeValue !== afterValue) {
      status = 'changed';
      return {
        status, key, beforeValue, afterValue,
      };
    }
    return item;
  });
  return result;
};

export default getDiffs;
