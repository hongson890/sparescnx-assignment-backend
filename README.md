# Sparescnx Assignment Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

In this project, I'm gonna build a backend service, which use NodeJS, Typescript & CouchDB. The following functionalities has been finished: 
1. Incident Endpoint via link : /incidents/**
2. JWT Authentication Endpoint via link:  /auth/login/**
3. User Endpoint via link: /users/**
4. CouchDB Connection Setup & CRUD data
5. Dependency Injections with by injecting Controllers, Services, Repositories in Modules
6. Unit Testing by using Jest has been setup
7. ESLint, TSLint & Prettier
8. Dockerization application.

## Installation couchdb

```bash
$ docker run -p 5984:5984  --name couchdb bitnami/couchdb:latest

# Default account: admin/couchdb
# Accessing url: http://localhost:5984/_utils/#/_all_dbs
```

## Installation app

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

## Test

# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Database connection config
1. DB config is located in file: /src/db.config.ts
```
export const DB_CONFIG = {
  url: 'http://admin:couchdb@localhost:5984',
  requestDefaults: { jar: true },
};

```

2. Metadata
At the first time of running, the app will run the script in file /src/db.init.ts and import metadata in folder /src/mockdata 
Next time, it will skip execute the script if the database existed
```
src
    /mockdata
        incident.json
        users.json
        view_incident_id.json  
    ...
    db.init.ts
    db.config.ts
    ...
```

