# nebula-api

&nbsp; This is the api consumed in the nebula-web-application [repository path](https://github.com/eduardoyanoliveira/nebula-web-application).

## Setup

&nbsp; In order to run this project on your machine, it's need to follow these steps.

1º clone this repository:  

``` git clone https://github.com/eduardoyanoliveira/nebula-api.git ```

2º Install the node packages: Open the repository on a command prompt and execute the following command.

```
  npm i
```

  - If using yarn

```
  yarn
```

3º Create a .env file on the project's root with the database configuration as described in this tutorial:
[prisma tutorial](https://www.prisma.io/docs/guides/development-environment/environment-variables)

4º Migrate the database: In order to do so run the following command in the prompt

```
  npm|yarn prisma migrate dev
```

5º Execute localy the server

```
  npm|yarn dev
```
6º In order to run the web application keep following the tutorial on this repository

[frontend] (https://github.com/eduardoyanoliveira/nebula-web-application)

## Main Technologies

  - Node.js
  - Typescript
  - Express
  - Prisma ORM
  - Jest
  - Jwt
  - Multer
  - Postgres Database
  
## Architecture Design

&nbsp; These API implements an archotecture based on the Clean Architecture book with the SOLID principles and some others code strategies like for example InMemoryTest.
