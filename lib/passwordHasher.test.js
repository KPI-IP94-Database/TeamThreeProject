'use strict';

const { hashPassword } = require('./passwordHasher');

describe('hashPassword valid arguments', () => {
  test('it returns object containing hash and salt', () => {
    const password = 'password';
    const salt = 'salt';
    const hash = hashPassword(password, salt);

    expect(hash).toHaveProperty('passwordHash');
    expect(hash).toHaveProperty('passwordSalt');
  });

  test('different results for same passwords but no passed salt', () => {
    const password = 'password';

    const hashOne = hashPassword(password);
    const hashTwo = hashPassword(password);

    expect(hashOne).not.toStrictEqual(hashTwo);

    expect(hashOne.passwordHash).not.toEqual(hashTwo.passwordHash);
  });

  test('same results for same passwords and same salt', () => {
    const password = 'password';
    const salt = 'salt';

    const hashOne = hashPassword(password, salt);
    const hashTwo = hashPassword(password, salt);

    expect(hashOne).toStrictEqual(hashTwo);
  });
});

describe('hashPassword strange, but possible arguments', () => {
  test('blank salt string means no salt is passed', () => {
    const password = 'password';
    const salt = '';

    const hash = hashPassword(password, salt);

    expect(salt).not.toEqual(hash.passwordSalt);
  });

  test('undefined salt means no salt is passed', () => {
    const password = 'password';
    const salt = undefined;

    const hash = hashPassword(password, salt);

    expect(salt).not.toEqual(hash.passwordSalt);
  });

  test('null salt means no salt is passed', () => {
    const password = 'password';
    const salt = null;

    const hash = hashPassword(password, salt);

    expect(salt).not.toEqual(hash.passwordSalt);
  });

  test('blank password string is accepted', () => {
    const password = '';
    expect(() => hashPassword(password)).not.toThrow();
  });

  test('numeric value of password is accepted', () => {
    const password = 69;
    expect(() => hashPassword(password)).not.toThrow();
  });

  test('array value of password is accepted', () => {
    const password = [69, 'ababa'];
    expect(() => hashPassword(password)).not.toThrow();
  });

  test('object value of password is accepted', () => {
    const password = {
      a: 'boba',
    };
    expect(() => hashPassword(password)).not.toThrow();
  });
});
