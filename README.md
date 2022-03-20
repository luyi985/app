# lyi-sdk

## Tech Stack

- nodejs
- apollo-graphql
- reactjs

## Service Stack

- postgres
- rabbitMQ

## Container Runtime

- docker

## How to setup

- Install
  npm install &&
  npm run install-containers

- Start Project
  yarn start

- Setup Database
  - docker compose exec server /bin/sh
  - npm run setupDb
  - npm run seedCustomers 10
  - npm run insert customer
  - npm run seedContacts
  - npm run insert contact
