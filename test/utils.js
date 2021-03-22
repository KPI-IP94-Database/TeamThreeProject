'use strict';

const assert = require('assert').strict;

function equals(actual, expected, testName = '') {
  try {
    assert.strictEqual(actual, expected);
    console.log(`Test ${testName} passed!`);
    return true;
  } catch (exp) {
    console.log(`Test ${testName} failed! (${exp})`);
    return false;
  }
}

exports.equals = equals;
