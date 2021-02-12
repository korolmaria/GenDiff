import _ from 'lodash';

const insertSpace = (depth) => ' '.repeat(depth);
const insertSpaceBrace = (depth) => {
  const result = depth <= 1 ? '' : insertSpace(depth - 2);
  return result;
};

const stringifyData = (val, depth) => {
  if (!_.isObject(val)) {
    return val;
  }
  const dataKeys = Object.keys(val);
  const elements = dataKeys.flatMap((key) => `\n${insertSpace(depth)}  ${key}: ${stringifyData(val[key], depth + 4)}`);
  return `{${elements.join('')}\n${insertSpaceBrace(depth)}}`;
};

const getRenderStylish = (elements, depth = 2) => {
  const strElems = elements.flatMap(({
    status, key, beforeValue, afterValue, children,
  }) => {
    switch (status) {
      case 'deleted':
        return `${insertSpace(depth)}- ${key}: ${stringifyData(beforeValue, depth + 4)}`;
      case 'added':
        return `${insertSpace(depth)}+ ${key}: ${stringifyData(afterValue, depth + 4)}`;

      case 'changed':
        return `${insertSpace(depth)}- ${key}: ${stringifyData(beforeValue, depth + 4)}\n${insertSpace(depth)}+ ${key}: ${stringifyData(afterValue, depth + 4)}`;

      case 'unchanged':
        return `${insertSpace(depth)}  ${key}: ${stringifyData(afterValue, depth + 4)}`;

      case 'node':
        return `${insertSpace(depth)}  ${key}: ${getRenderStylish(children, depth + 4)}`;

      default:
        throw new Error(`Unknown status: ${status}`);
    }
  });
  return `{\n${strElems.join('\n')}\n${insertSpaceBrace(depth)}}`;
};

export default getRenderStylish;
