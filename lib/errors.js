'use strict';

class DatabaseError extends Error {
  constructor(message, tableName, ...params) {
    super(...params);
    this.name = 'DatabaseError';
    this.message = message;
    this.tableName = tableName;
    this.date = new Date();
  }
}

class TableCreationError extends DatabaseError {
  constructor(...params) {
    super(...params);
    this.name = 'TableCreationError';
  }
}

exports.TableCreationError = TableCreationError;

class InsertionError extends DatabaseError {
  constructor(...params) {
    super(...params);
    this.name = 'InsertionError';
  }
}

exports.InsertionError = InsertionError;

class TableNotFoundError extends DatabaseError {
  constructor(...params) {
    super(...params);
    this.name = 'TableNotFoundError';
  }
}

exports.TableNotFoundError = TableNotFoundError;

class TypeException extends DatabaseError {
  constructor(...params) {
    super(...params);
    this.name = 'TypeException';
  }
}

exports.TypeException = TypeException;
