# Library

This folder consists of core files of the project. There is a list of responsibilities of each file in the library.

## errors.js

This file containes classes of errors which can arise during the data base working process. 

 
## wrappers.js

There are wrappers which make it easier to interact with the data base. Here they are:


### Databse.createTable(tableModel)

The table model is described in the main README.md file.


### Database.insert(table, values)

table - name of the table, string

values - array of values of the fields, [multiple types]

Creates new row and inserts the values using
predefined JSON scheme.


### Database.ifExists(table, field, value)
 
table - name of the table, string

field - name of the field to check, string

value - needed value to check, typed

callback - callback, that takes the result, function

Passes true if the value is already inside table.

Example of the use:

```javascript
const e-mail = 'pupkin@gmail.com';
db.ifExists('user', 'email', e-mail, exists => {
  if(!exists)
    db.insert('user', [e-mail, 'password', 100, 100, 100, 9.8]);
});
```


### Database.ifAssExists(table, assField, assValue, field, value, callback)

table - name of the table, string

assField - name of the associated field to check, string

assValue - needed value of the associated field to check, typed

field - name of the field to check, string

value - needed value to check, typed

callback - callback, that takes the result, function

Passes true to the callback if the value which is associated with another
value is already inside the table.


### Database.removeRow(table, field, value)

table - name of the table, string

field - name of the field to compare, string

value - needed value to compare, typed

Removes all the associated rows.
 

### Database.update(table, field, value, newValue)

table - name of the table, string

field - name of the field to compare, string

value - needed value to compare, typed

newValue = new value to set, typed

Updates all the associated rows.
 

### Database.getObject(table, field, value, callback)


table - name of the table, string

field - name of the field to check, string

value - needed value to check, typed

callback - callback, that takes the result, function

Passes the object that contains associated row.
 
Example of the use:

```javascript
const e-mail = 'pupkin@gmail.com';
const user = db.get('user', 'email', e-mail, row => {
  console.dir({ row });
});
```


## init.js

File consists of one function initDB(path) which initializes the
data base according to the table model. 

`path` shows the place where the data base has to be initialized.


## dbObjects.js

This file consists of several objects according to the
table model and objects model. More information about objects
you can find in the `doc` folder.
