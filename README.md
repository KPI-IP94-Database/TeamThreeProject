# TeamThreeProject
The organization consists of subgroup of students of the IP-94 group,
KPI, ICT faculty.

The project is aimed to hold data of Ukrainian university applicants, such as
results of the national evaluating (ZNO), high school priorities, etc.

## Technology Stack

* Client: Node.JS
* DB: SQLite

## Members

* [Rekechynsky Dmytro](https://github.com/rocket111185)
* [Illya Tsasuk](https://github.com/asdf2107)
* [Yelyzaveta Dolgova](https://github.com/lizzochek)

## HowItWorks

The model of the data base is described in JSON format. The table model has the following structure:

```javascript
{
  name: 'name of the table',
  fields: [
    {
      name: 'name of the field',
      type: 'VARCHAR(50)', // for example
      primary: false,
      fkey: {
        table: 'name of referenced table',
        pkey: 'name of referenced primary key'
      }
      // fkey - foreign key
      // pkey - primary key
      // You can use either `primary: true` or
      // `fkey: {}`
    }
  ]
}
```

Wrappers are based on this model. More detailed information is provided in `lib/README.md`





