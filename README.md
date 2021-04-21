# ua-apply-api

The project is aimed to hold data of Ukrainian university applicants, such as
results of the national evaluating (ZNO), high school priorities, etc.

## Technology Stack

* Engine: Node.JS
* Framework: `fastify`
* DB: SQLite (`better-sqlite3`)

## TO-DO:

- [ ] Develop project hierarchy
  - [ ] Needed folders
  - [ ] SQL query templates
  - [ ] API routing
- [ ] Create API
  - [ ] Hello World
  - [ ] Route handling
  - [ ] Secure data exchange with JWT (or other technology)
- [ ] Make everything else so the project looks shiny
  - [ ] Pass ESLint checking
  - [ ] Write tests (TDD is prefered)
  - [ ] Documentation for the API (route `/docs`)

## Members

* [Rekechynsky Dmytro](https://github.com/rocket111185)
* [Illya Tsasuk](https://github.com/asdf2107)
* [Yelyzaveta Dolgova](https://github.com/lizzochek)

## HowItWorks

The model of the data base is described in JSON format.
The table model has the following structure:

```javascript
{
  "name": "name of the table",
  "fields": [
    {
      "name": "name of the field",
      "type": "VARCHAR(50)",
      "primary": false,
      "fkey": {
        "table": "name of referenced table",
        "pkey": "name of referenced primary key"
      },
      "_comment": "You can use either the primary: true or fkey"
    }
  ]
}
```

- [ ] Decide whether the DB will be unpacked using the JSON model
