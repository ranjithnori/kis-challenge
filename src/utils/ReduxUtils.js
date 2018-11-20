// Utility function for normalization
const normalizeArrayToObject = (array = [], key = "", objectToAppend = {}) => {
  let normalizedObject = {};
  let keys = array.map(item => {
    normalizedObject[item[key]] = {
      ...item,
      ...objectToAppend
    };
    return item[key];
  });

  return {
    normalizedObject,
    keys
  };
};

export { normalizeArrayToObject };
