import _ from 'lodash';

const getUnionKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  return unionKeys.sort();
};

const getDiffs = (data1, data2) => {
  const unionKeys = getUnionKeys(data1, data2);
  const result = unionKeys.map((item) => {
    const beforeValue = data1[item];
    const afterValue = data2[item];
    const key = item;
    if (!_.has(data1, item) && _.has(data2, item)) {
      return { status: 'added', key, afterValue };
    }
    if (!_.has(data2, item) && _.has(data1, item)) {
      return { status: 'deleted', key, beforeValue };
    }

    if (beforeValue === afterValue) {
      return { status: 'unchanged', key, afterValue };
    }

    if (beforeValue !== afterValue && _.isPlainObject(beforeValue) && _.isPlainObject(afterValue)) {
      const children = getDiffs(beforeValue, afterValue);
      return { status: 'node', key, children };
    }

    if (beforeValue !== afterValue) {
      return {
        status: 'changed', key, beforeValue, afterValue,
      };
    }
    return item;
  });
  return result;
};

export default getDiffs;
