'use strict';

const sqlite3 = require('sqlite3');
module.exports = exports = sqlite3;
const { Database } = sqlite3;
const dbJson = require('../db/dbModel.json');

// throwErrorTemplate
const throwET = (text, err, tableName = false) => {
  let errText = text + err;
  if (tableName)
    errText += `, table ${tableName}`;
  throw new Error(errText);
};

exports.throwET = throwET;

// throwCreateTableError
const throwCTE = (err, tableName = false) => {
  throwET('Attempt to create table ',
    err, tableName);
};

// throwInsertError
const throwIE = (err, tableName = false) => {
  throwET('Insertion failed: ',
    err, tableName);
};

// throwNoTableError
const throwNTE = (tableName = false) => {
  throwET('No such a table found',
    '', tableName);
};

/**
 * sqlWrapValue(value, type)
 * value - value to wrap, typed
 * type - defined by SQL type of the value, string
 * Returns value (surrounded by "", if the type is
 * either VARCHAR or TEXT).
 */
const sqlWrapValue = (value, type) =>
  (type.includes('VARCHAR') || type.includes('TEXT') ?
    `"${value}"` :
    value);

/**
 * getTableFields(table)
 * table - name of the table, string
 * Returns fields of the table (see the JSON scheme).
 */
const getTableFields = table => {
  const foundTable = dbJson
    .filter(tbl => tbl.name === table);

  if (!foundTable.length)
    throwNTE(table);

  const fields = foundTable[0]['fields'];
  return fields;
};

/**
 * wrapValue(table, field, value)
 * table - name of the table, string
 * field - name of the field of wrapped value, string
 * value - needed value to wrap, typed
 * Wraps the value using predefined JSON scheme.
 */
const wrapValue = (table, field, value) => {
  const valueType = getTableFields(table)
    .filter(el => el.name === field)[0]['type'];
  return sqlWrapValue(value, valueType);
};

/**
 * Database.createTable({
 *   name: 'name of the table',
 *   fields: [
 *     {
 *       name: 'name of the field',
 *       type: 'VARCHAR(50)', // for example
 *       primary: false,
 *       fkey: {
 *         table: 'name of referenced table',
 *         pkey: 'name of referenced primary key'
 *       }
 *       // fkey - foreign key
 *       // pkey - primary key
 *       // You can use either `primary: true` or
 *       // `fkey: {}`
 *     }
 *   ]
 * })
 *
 */
Database.prototype.createTable = function(tableModel) {

  let statement = '';
  let fkeyStatement = '';
  // The tableModel may be undefined
  if (!tableModel.name)
    throwCTE('without a name');

  const tblName = tableModel.name;

  statement += `CREATE TABLE ${tblName} (`;

  if (!tableModel.fields || !tableModel.fields.length)
    throwCTE('without fields', tblName);

  for (const field of tableModel.fields) {

    if (!field.name)
      throwCTE('with a nameless field', tblName);
    if (!field.type)
      // Now we know that `field.name` is defined, so we don't need ?.
      throwCTE(`with a typeless field ${field.name}`, tblName);

    if (field.primary && field.fkey)
      throwCTE(`with a primary and foreign key field ${field.name}`,
        tblName);

    const keyDeclaration = `${field.name} ${field.type}`;
    const pkeyStatement = (field.primary) ? ' PRIMARY KEY' : '';
    fkeyStatement += (field.fkey) ?
      `FOREIGN KEY (${field.name})` +
        ` REFERENCES ${field.fkey.table} (${field.fkey.pkey}), ` :
      '';

    statement += keyDeclaration + pkeyStatement + ', ';
  }

  // Add fkey statements, replace the ', ' with the closing parenthesis
  statement = statement
    .concat(fkeyStatement)
    .replace(/.{2}$/, ')');

  this.run(statement);
  return this;
};

/**
 * Database.insert(table, values)
 * table - name of the table, string
 * values - array of values of the fields, [multiple types]
 * Creates new row and inserts the values using
 * predefined JSON scheme.
 */
Database.prototype.insert = function(table, values) {

  if (!table || !values)
    throwIE('missing argument list', table);

  const fields = getTableFields(table);

  const fieldNames = fields
    .map(field => field.name)
    .filter(name => name !== 'id');

  const fieldTypes = fields
    .filter(field => fieldNames.includes(field.name))
    .map(field => field.type);

  const fExp = fieldNames.join(', ');

  const vExp = values
    .map((el, i) => sqlWrapValue(el, fieldTypes[i]))
    .join(', ');

  const statement = `INSERT INTO ${table} (${fExp}) VALUES (${vExp})`;

  this.run(statement);
  return this;
};



/**
 * Database.ifExists(table, field, value)
 * table - name of the table, string
 * field - name of the field to check, string
 * value - needed value to check, typed
 * callback - callback, that takes the result, function
 * Passes true if the value is already inside table.
 *
 * Example of the use:
 * ```
 * const e-mail = 'pupkin@gmail.com';
 * db.ifExists('user', 'email', e-mail, exists => {
 *   if(!exists)
 *     db.insert('user', [e-mail, 'password', 100, 100, 100, 9.8]);
 * });
 * ```
 */
Database.prototype.ifExists = function(table, field, value, callback) {

  const wrappedValue = wrapValue(table, field, value);

  this.get(`SELECT EXISTS(SELECT 1 FROM ${table}
            WHERE ${field}=${wrappedValue} LIMIT 1);`, (err, rows) => {
    if (err) throw err;
    const result = Object.values(rows)[0] > 0;
    callback(result);
  });

  return this;
};


/**
 * Database.equals(table, field, value)
 * table - name of the table, string
 * assField - name of the associated field to check, string
 * assValue - needed value of the associated field to check, typed
 * field - name of the field to check, string
 * value - needed value to check, typed
 * callback - callback, that takes the result, function
 * Passes true if the value which is associated with another value
 * is already inside table.
 *
 */
Database.prototype.ifAssExists = function(table, assField, assValue,
  field, value, callback) {

  const wrappedAssValue = wrapValue(table, assField, assValue);
  const wrappedValue = wrapValue(table, field, value);

  this.get(`SELECT EXISTS(SELECT 1 FROM ${table}
            WHERE ${assField}=${wrappedAssValue}
            AND ${field}=${wrappedValue} LIMIT 1);`, (err, rows) => {
    if (err) throw err;
    const result = Object.values(rows)[0] > 0;
    callback(result);
  });

  return this;
};


/**
 * Database.removeRow(table, field, value)
 * table - name of the table, string
 * field - name of the field to compare, string
 * value - needed value to compare, typed
 * Removes all the associated rows.
 */
Database.prototype.remove = function(table, field, value) {

  const wrappedValue = wrapValue(table, field, value);

  this.run(`DELETE FROM ${table} WHERE ${field}=${wrappedValue}`,
    err => {
      if (err) throw err;
    }
  );

  return this;
};

/**
 * Database.update(table, field, value, newValue)
 * table - name of the table, string
 * field - name of the field to compare, string
 * value - needed value to compare, typed
 * newValue = new value to set, typed
 * Updates all the associated rows.
 */

Database.prototype.update = function(table, field, value, newValue) {

  const wrappedValue = wrapValue(table, field, value);
  const newWValue = wrapValue(table, field, newValue);

  this.run(`UPDATE ${table}
            SET ${field}=${newWValue}
            WHERE ${field}=${wrappedValue}`,
  err => {
    if (err) throw err;
  });

  return this;
};

/**
 * Database.getObject(table, field, value)
 * table - name of the table, string
 * field - name of the field to check, string
 * value - needed value to check, typed
 * callback - callback, that takes the result, function
 * Passes the object that contains associated row.
 *
 * Example of the use:
 * ```
 * const e-mail = 'pupkin@gmail.com';
 * const user = db.get('user', 'email', e-mail, row => {
 *   console.dir({ row });
 * });
 * ```
 */

Database.prototype.getObject = function(table, field, value, callback) {

  const wrappedValue = wrapValue(table, field, value);

  this.get(`SELECT * FROM ${table}
            WHERE ${field}=${wrappedValue};`, (err, row) => {
    if (err) throw err;
    callback(row);
  });

  return this;
};
