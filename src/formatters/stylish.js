import _ from 'lodash';

const insertSpace = (depth) => ' '.repeat(depth);
const insertSpaceBrace = (depth) => (depth <= 1 ? '' : insertSpace(depth - 2));

const stringifyData = (val, depth) => {
  if (!_.isObject(val)) {
    return val;
  }
  const valKeys = Object.keys(val);
  const strElems = valKeys.flatMap((key) => `\n${insertSpace(depth)}  ${key}: ${stringifyData(val[key], depth + 4)}`);
  return `{${strElems.join('')}\n${insertSpaceBrace(depth)}}`;
};

const getRenderStylish = (elements, depth = 2) => {
  const strElems = elements.flatMap(({
    type, key, beforeValue, afterValue, children,
  }) => {
    switch (type) {
      case 'deleted':
        return `${insertSpace(depth)}- ${key}: ${stringifyData(beforeValue, depth + 4)}`;
      case 'added':
        return `${insertSpace(depth)}+ ${key}: ${stringifyData(afterValue, depth + 4)}`;

      case 'changed':
        return `${insertSpace(depth)}- ${key}: ${stringifyData(beforeValue, depth + 4)}\n${insertSpace(depth)}+ ${key}: ${stringifyData(afterValue, depth + 4)}`;

      case 'unchanged':
        return `${insertSpace(depth)}  ${key}: ${stringifyData(afterValue, depth + 4)}`;

      default:
        return `${insertSpace(depth)}  ${key}: ${getRenderStylish(children, depth + 4)}`;
    }
  });
  return `{\n${strElems.join('\n')}\n${insertSpaceBrace(depth)}}`;
};

export default getRenderStylish;
