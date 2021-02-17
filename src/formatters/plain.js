const stringifyData = (val) => {
  if (val === null) {
    return 'null';
  }
  switch (typeof val) {
    case 'string':
      return `'${val}'`;
    case 'object':
      return '[complex value]';
    default:
      return val;
  }
};

const getRenderPlain = (elements, path = '') => {
  const strElems = elements
    .filter((item) => item.type !== 'unchanged')
    .flatMap(({
      type, key, beforeValue, afterValue, children,
    }) => {
      const fullPathKey = `${path}${key}`;
      switch (type) {
        case 'deleted':
          return `Property '${fullPathKey}' was removed`;
        case 'added':
          return `Property '${fullPathKey}' was added with value: ${stringifyData(afterValue)}`;
        case 'changed':
          return `Property '${fullPathKey}' was updated. From ${stringifyData(beforeValue)} to ${stringifyData(afterValue)}`;
        default:
          return `${getRenderPlain(children, `${fullPathKey}.`)}`;
      }
    });
  return `${strElems.join('\n')}`;
};

export default getRenderPlain;
