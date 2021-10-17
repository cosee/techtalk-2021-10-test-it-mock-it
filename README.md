# If you can't test it, mock it.

Code examples for the [cosee-techtalk](https://talks.cosee.biz/) on 28.10.2021.

## About this repo

This repository was created with "create-react-app".
It contains the code examples that are part of the 
talk.

It also is a working todo-app, that you can start 
with `yarn start`.

## Keycloak example

The repo does NOT contain a working keycloak integration, 
keycloak is just used as an example for a library that is
worth to mock

See `src/test-examples/Auth*` and `src/keycloak/keyclock.ts`

## Todo-App

See `src/App.tsx`. It has tests with `nock`, with `msw` and using a module to help setup msw.

