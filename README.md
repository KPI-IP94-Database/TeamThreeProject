# ua-apply-api

The project is aimed to hold data of Ukrainian university applicants, such as
results of the national evaluating (ZNO), high school priorities, etc.

## Technology Stack

* Engine: Node.JS
* Framework: `fastify`
* DB: PostgreSQL (`pg`)
* SQL Query builder: `knex`

Development additions (not necessary to launch the server):

* Codestyle check system: ESLint
* Test framework: Jest

## Docker container

Visit [the link](https://hub.docker.com/repository/docker/dment/ua-apply-api)
in order to see the contatiner.

Run using command `sudo docker run --network host -d dment/ua-apply-api:latest`
Run tests using `sudo docker run -e CI=true dment/ua-apply-api:latest npm run test`

## TO-DO:

- [ ] Develop project hierarchy
  - [ ] Needed folders
  - [ ] SQL query templates
    - [x] Migrations (creating and droping tables)
    - [ ] API queries
  - [ ] API routing
  - [ ] Secure data storage and exchange
- [ ] Create API
  - [x] Hello World
  - [ ] Route handling
  - [ ] Secure data exchange with JWT (or other technology)
- [ ] Make everything else so the project looks shiny
  - [ ] Pass ESLint checking
  - [ ] Write tests (TDD is prefered)
  - [ ] Documentation for the API (route `/docs`)
  - [ ] Write script so it unpacks the API

## Members

* [Rekechynsky Dmytro](https://github.com/rocket111185)
* [Illya Tsasuk](https://github.com/asdf2107)
* [Yelyzaveta Dolgova](https://github.com/lizzochek)
