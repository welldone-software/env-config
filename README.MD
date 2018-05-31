# Overview
Have your configuration in one place, organized in a js native structure, possbily hirarchial, but still easily configurable and overideable by environment variables, as recommended by the [Twelve-Factor App methodology](https://en.wikipedia.org/wiki/Twelve-Factor_App_methodology)

Your config objects can look like below, and still fully support environment variables:
```js
{
  port: 1234,
  db: {
    hostName: 'example.com',
    port: 4321,
  },
  friends: ['Adam', 'Rachel'],
  isCors: true
}
```

This tiny and powerfull config library reads keys from the config object and searches proccess.env for corresponding keys according to a naming convension.

It allows your apps to use config objects that fully support literal objects, literal arrays, numbers, strings and booleans , while stil being configured/overidden by env vars.

# API

### mergeEnv(config: Object) : Object
Recrusively applies values from the environment (environment variables) onto the fileds of the config object parameter and returns the same object, after it has been changed. 
Note: this changes the object itself, and breaches immutablity thus we recommend using `mapEnv`.

### mapEnv(config: Object) : Object
A pure function version of `mergeEnv`. This keeps the config object parameter immutable. It creates and returns a new object which is a combination of the original config object values and the values applied from the environment.

### getEnvKeys(config: Object) : string[]
A utility function that returns the list of environment keys expected/supported for a given config object. 

# The Conventions

* JS config object is literal javascript object with `camalCase` members.
* The environment variables are expected in `UPPER_SNAKE_CASE` convention.
* Two underscores (`__`) mean nesting, e.g. DB_SETTINGS__CONNECTION_STRING translated to dbSettings.connectionString
* Supports String, Boolean, Number and Array values.
* Types are determined by defaults in config file.

# Sample

## config.js
```js
const {mapEnv} = require('@welldone-software/env-config')

module.exports = mapEnv({
  port: 1234,
  db: {
    hostName: 'example.com',
    port: 4321,
    user: '',
    password: '',
  },
  friends: ['Adam', 'Rachel'],
  isCors: true
})
```

## Environment variables (specified in .env file)
```
DB__HOST_NAME=mydomain.com
DB__PORT=3060
DB__USER=ADMIN
DB__PASSWORD=ygIYDG*&h8&ADSGH
IS_CORS=false
ANOTHER_KEY=anothervalue
FRIENDS__1=Sara
```

## Result
```js
{
  port: 1234,
  db: {
    hostName: 'mydomain.com',
    port: 3060,
    user: 'ADMIN',
    password: 'ygIYDG*&h8&ADSGH',
  },
  friends: ['Adam', 'Sara'],
  isCors: false
}
```

# Advantages

* Single source of truth - one place to define all posibble config keys.
* Simple to use but still allows for rather complex configurations: not just strings and not just flat structures.
* Uses 'native' naming convention in each environment so configs look natural both in JS and in ENV. 
* Much more readable than the alternative: <s>`const port = proccess.env.PORT || 1000`</s>


# Roadmap
* Add typing support (Typescript and Flow)
