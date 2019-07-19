[![Coverage Status](https://coveralls.io/repos/github/rickynyairo/phonenum-generator/badge.svg?branch=develop)](https://coveralls.io/github/rickynyairo/phonenum-generator?branch=develop)

[![CircleCI](https://circleci.com/gh/rickynyairo/phonenum-generator.svg?style=svg)](https://circleci.com/gh/rickynyairo/phonenum-generator)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b7238391b81aabbd45c5#?env%5BHeroku-phonenumber%5D=W3sia2V5IjoiVVJMIiwidmFsdWUiOiJodHRwczovL3Bob25lbnVtYmVyLWdlbmVyYXRvci5oZXJva3VhcHAuY29tIiwiZW5hYmxlZCI6dHJ1ZX1d)

# Random Phone Number Generator
An API to generate phone numbers randomly

## Hosting

This Project has been hosted on heroku:
`https://phonenumber-generator.herokuapp.com/api/v1`

## Swagger Documentation

[Swagger Docs](https://phonenumber-generator.herokuapp.com/api-docs)

### Features!

- Can generate random phone numbers
- Limit of phone numbers to be generated is accepted from the user
- Limit of 10000 numbers generated at a time
- Numbers generated can be accessed via an API call.
- Sorting of numbers and obtaining maximum and minimum sorted numbers

### Installation

Phone-Number-Generator requires you have [Node.js](https://nodejs.org/) v10+. Check your node version by typing `node -v`

```
$ git clone https://github.com/rickynyairo/phonenum-generator.git
$ yarn install
$ run `yarn run dev` and navigate to `http://localhost:{PORT}/`
```

### Running unit tests

- Run `yarn run test` to run the unit tests

### Endpoints

| VERB   | URL                                | ACTION                                     |
| ------ | ---------------------------------- | ------------------------------------------ |
| POST   | /api/v1/numbers/generate           | Generate a number of random phone numbers  |
| GET    | /api/v1/numbers                    | Get all generated numbers                  |
| GET    | /api/v1/numbers?sort=asc           | Sort numbers in ascending order            |
| GET    | /api/v1/numbers?sort=desc          | Sort numbers in descending order           |

### Future Improvements

- Add user authentication

## License

- MIT
