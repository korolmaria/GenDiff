import _ from 'lodash';

const stringifyData = (val) => {
  const wordsException = [true, false, null, undefined];
  if (!_.isObject(val) && !_.includes(wordsException, val)) {
    return `'${val}'`;
  }
  if (!_.isObject(val) && _.includes(wordsException, val)) {
    return val;
  }
  return '[complex value]';
};

const getRenderPlain = (elements, path = '') => {
  const resultElements = elements
    .filter((item) => item.status !== 'unchanged')
    .flatMap(({
      status, key, beforeValue, afterValue, children,
    }) => {
      const fullPathKey = `${path}${key}`;
      switch (status) {
        case 'deleted':
          return `Property '${fullPathKey}' was removed`;
        case 'added':
          return `Property '${fullPathKey}' was added with value: ${stringifyData(afterValue)}`;
        case 'changed':
          return `Property '${fullPathKey}' was updated. From ${stringifyData(beforeValue)} to ${stringifyData(afterValue)}`;
        case 'node':
          return `${getRenderPlain(children, `${fullPathKey}.`)}`;
        default:
          throw new Error(`Unknown status: ${status}`);
      }
    });
  return `${resultElements.join('\n')}`;
};

export default getRenderPlain;
