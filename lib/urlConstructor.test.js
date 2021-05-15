'use strict';

const { urlConstructor } = require('./urlConstructor.js');

describe('urlConstructor valid arguments', () => {

  test('should return /one/two/three', () => {
    const preparedArg = {
      one: {
        two: 'three'
      }
    };

    const expectedRes = [
      '/one/two/three'
    ];

    expect(urlConstructor(preparedArg))
      .toStrictEqual(expectedRes);
  });

  test('should omit array indeces', () => {
    const preparedArg = {
      one: {
        two: [
          'three',
          'four'
        ]
      }
    };

    const expectedRes = [
      '/one/two/three',
      '/one/two/four'
    ];

    expect(urlConstructor(preparedArg))
      .toStrictEqual(expectedRes);
  });

  test('should create paths from array', () => {
    const preparedArg = [
      'one',
      {
        two: {
          three: 'four'
        }
      }
    ];

    const expectedRes = [
      '/one',
      '/two/three/four'
    ];

    expect(urlConstructor(preparedArg))
      .toStrictEqual(expectedRes);
  });

});

describe('urlConstructor strange arguments', () => {

  test('should return nothing on empty object', () => {
    expect(urlConstructor({}))
      .toBe(undefined);
  });

  test('should return nothing on string', () => {
    expect(urlConstructor('ooga booga'))
      .toBe(undefined);
  });

  test('should return nothing on number', () => {
    expect(urlConstructor(69))
      .toBe(undefined);
  });

  test('may contain boolean as path endpoint', () => {
    const preparedArg = {
      one: true,
      two: false
    };

    const expectedRes = [
      '/one/true',
      '/two/false'
    ];

    expect(urlConstructor(preparedArg))
      .toStrictEqual(expectedRes);
  });

  test('may contain null and undefined as path endpoints', () => {
    const preparedArg = {
      one: null,
      two: undefined
    };

    const expectedRes = [
      '/one/null',
      '/two/undefined'
    ];

    expect(urlConstructor(preparedArg))
      .toStrictEqual(expectedRes);
  });

  test('should omit empty containers', () => {
    const preparedArg = {
      one: {},
      two: []
    };

    const expectedRes = [
      '/one',
      '/two'
    ];

    expect(urlConstructor(preparedArg))
      .toStrictEqual(expectedRes);
  });

});
