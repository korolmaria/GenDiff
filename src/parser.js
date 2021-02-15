import yaml from 'js-yaml';

const parser = {
  json: JSON.parse,
  yml: yaml.load,
};

export default (formatName, data) => parser[formatName](data);
