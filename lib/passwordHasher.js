'use strict';

const { randomBytes, createHash } = require('crypto');

// The DB string has maximum length of 255, so
// we have maximum count of bytes: 127.
// The hex representation will have 254 characters.
// You can choose another byte representation and byte amount.
const byteAmount = 127;
const byteRepresentation = 'hex';

// You can choose other algorithm.
const hashAlgorithm = 'shake256';

// hashPassword(password[, salt])
//
// Hash password using preffered algorithm.
// Salt is either passed to function
// or generated randomly and returned
// from a function with the hash.

const hashPassword = (password, salt) => {
  const passwordSalt = salt || randomBytes(byteAmount)
    .toString(byteRepresentation);

  const hash = createHash(hashAlgorithm);

  hash.update(password.toString() + passwordSalt);
  const passwordHash = hash.digest('hex');

  return {
    passwordHash,
    passwordSalt
  };
};

module.exports = { hashPassword };
