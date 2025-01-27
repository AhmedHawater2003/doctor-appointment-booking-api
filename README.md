<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A backend system for a doctor appointment booking application. The system is designed for a specific single doctor and can handle managing and booking appointments. The system follows modular monolith architecture
- Doctor Availability -> Layered Architecture
- Appointment Booking -> Clean Architecture
- Appointment Confirmation -> 
- Doctor Appointment Management -> Hexagonal Architecture

## Project setup

Start by installing the required dependencies
```bash
pnpm install
```

Then you will need to run a MySql container which the Doctor Availability module depends on by running this command. Do not forget to replace the placeholder values.
```bash
docker run --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_PASSWORD=<you-password> \
  -e MYSQL_DATABASE=<your-database-name> \
  -e MYSQL_USER=<your-user-name> \
  -d mysql:8.0
```

Finally, you would need to create a `.env.development` file which includes the environment variables specified in the [.env.example](https://github.com/AhmedHawater2003/doctor-appointment-booking-api/blob/main/.env.example) file

## Compile and run the project

```bash
# development mode
$ pnpm run start:dev
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Architectural Diagrams

### Overall Preview

### Appointment Booking Module (clean architecture)
![Drawing 2024-02-29 09 45 05 excalidraw](https://github.com/user-attachments/assets/ba6e75a8-f48a-4eb3-bbf7-ab33faa90fb2)


### Appointment Confirmation
![image](https://github.com/user-attachments/assets/e82c70e3-ef89-4cb8-8fb4-2c065f387a66)



