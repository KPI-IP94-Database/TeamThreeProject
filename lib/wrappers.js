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

  if (!tableModel.name)
    throwCTE('without a name');

  const tblName = tableModel.name;

  statement += `CREATE TABLE ${tblName} (`;

  if (!tableModel.fields || !tableModel.fields.length)
    throwCTE('without fields');

  for (const field of tableModel.fields) {

    if (!field.name)
      throwCTE('with a nameless field', tblName);

    if (!field.type)
      throwCTE(`with a typeless field ${field}`, tblName);

    if (field.primary && field.fkey)
      throwCTE(`with a primary and foreign key field ${field}`,
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
 * Database.insert(table, fields, values)
 * table - name of the table, string
 * fields - array of names of the fields, [string]
 * values - array of values of the fields, [multiple types]
 */
Database.prototype.insert = function(table, values) {

  if (!table || !values)
    throwIE('missing argument list', table);

  const foundTable = dbJson
    .filter(tbl => tbl.name === table);

  if (!foundTable.length)
    throwIE('table was not found', table);

  const fields = foundTable[0]['fields'];

  const fieldNames = fields
    .map(field => field.name)
    .filter(name => name !== 'id');

  const fieldTypes = fields
    .filter(field => fieldNames.includes(field.name))
    .map(field => field.type);

  const fExp = fieldNames.join(', ');

  const vExp = values
    .map((el, i) => ((fieldTypes[i].includes('VARCHAR')) ?
      `"${el}"` : el))
    .join(', ');

  const statement = `INSERT INTO ${table} (${fExp}) VALUES (${vExp})`;

  console.log(statement);
  this.run(statement);
  return this;

};

