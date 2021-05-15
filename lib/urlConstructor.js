'use strict';

// combinate(pathHandler[, parentPath])
//
// pathHandler - object (or array), which has the following
// structure:
//
// {
//   rootOne: {
//     subPath: 'endPoint'
//     pathSet: [
//       'first',
//       'second',
//       'third'
//     ]
//   },
//   rootTwo: 'endPoint',
//   rootThree: 1
// }
//
// `combinate` returns:
// [
//   '/rootOne/subPath/endPoint',
//   '/rootOne/pathSet/first',
//   '/rootOne/pathSet/second',
//   '/rootOne/pathSet/third',
//   '/rootTwo/endPoint',
//   '/rootThree/1'
// ]
//
// parentPath - optional string, that is appended to
// the start of every URL.
// Used for recursive calls of `combinate`.
// It is considered to be valid path part, so it is not checked.
// In order to save user from incorrect use of `parentPath`,
// `urlConstructor` has been implemented.

const combinate = (pathHolder, parentPath = '') => {
  // Only object and array are expected
  if (typeof pathHolder !== 'object') return;

  const keys = Object.keys(pathHolder);
  if (!keys.length) return;
  const result = [];

  for (const key of keys) {

    // The key may be index of an array.
    // If so, the key (index) will be omitted.
    const integerRegex = /[0-9]+/;
    const firstMatched = key.match(integerRegex);

    const pathPart = (firstMatched && key === firstMatched[0]) ?
      '' :
      '/' + key;

    const value = pathHolder[key];

    // `null` and `undefined` are considered to be primitive
    if (value && typeof value === 'object') {
      const subCombinations = combinate(value, parentPath + pathPart);
      if (subCombinations && subCombinations.length) {
        result.push(...subCombinations);
      } else {
        result.push(pathPart);
      }
    } else {
      const primitiveEl = parentPath + pathPart + '/' + value;
      result.push(primitiveEl);
    }
  }

  return result;
};

// So that, we can use only one argument
const urlConstructor = (pathHolder) => combinate(pathHolder);

module.exports = { urlConstructor };
