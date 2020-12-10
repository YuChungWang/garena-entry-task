const camelizeStr = (str) => str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());

const snakifyStr = (str) => str.replace(/(?:^|\.?)([A-Z])/g, (_, x) => `_${x.toLowerCase()}`);

const convertCase = (convertFunc) => {
  function converter(thing) {
    if (thing instanceof Array) {
      return thing.map((i) => converter(i));
    }
    if (thing instanceof Object) {
      const newObj = {};
      Object.keys(thing).forEach((k) => {
        newObj[convertFunc(k)] = converter(thing[k]);
      });
      return newObj;
    }
    return thing;
  }
  return converter;
};

export default {
  camelizeKeys: convertCase(camelizeStr),
  snakifyKeys: convertCase(snakifyStr),
};
