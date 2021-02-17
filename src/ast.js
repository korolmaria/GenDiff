import _ from 'lodash';

const getUnionKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  return _.sortBy(unionKeys);
};

const getDiffs = (data1, data2) => {
  const unionKeys = getUnionKeys(data1, data2);
  const result = unionKeys.map((key) => {
    const beforeValue = data1[key];
    const afterValue = data2[key];
    if (!_.has(data1, key)) {
      return { type: 'added', key, afterValue };
    }
    if (!_.has(data2, key)) {
      return { type: 'deleted', key, beforeValue };
    }

    if (_.isPlainObject(beforeValue) && _.isPlainObject(afterValue)) {
      const children = getDiffs(beforeValue, afterValue);
      return { type: 'node', key, children };
    }

    if (!_.isEqual(beforeValue, afterValue)) {
      return {
        type: 'changed', key, beforeValue, afterValue,
      };
    }
    return { type: 'unchanged', key, afterValue };
  });
  return result;
};

export default getDiffs;
