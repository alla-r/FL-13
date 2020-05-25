'use strict'
const assign = function (target, ...sources) {
  for (const source of sources) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        target[`${key}`] = source[key];
      }
    }
  }
  return target;
}