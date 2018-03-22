# Overview
You can have your configuration in one place, organized in a js native structure, possbily hirarchial, but still easily configurable and overideable by environment variables, as  by the [Twelve-Factor App methodology](https://en.wikipedia.org/wiki/Twelve-Factor_App_methodology)
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

This Small and powerfull config library read keys from the config objects and searches proccess.env for corresponding keys, according to a mapping convension.

This allows your apps to use config objects that fully support literal object, literal array, number, string and boolean types, while stil being configured with env vars.

## Conventions
* Config object is literal javascript object with `camalCase` convention.
* proccess.env and .env file with `UPPER_SNAKE_CASE` convention.
* Two anderscore (`__`) mean nesting - DB_SETTINGS.CONNECTION_STRING translated to dbSettings.connectionString
* String, Boolean and number values determinated by config file

## Usage

### .env (or environment variables)
```
DB__HOST_NAME=mydomain.com
DB__PORT=3060
DB__USER=ADMIN
DB__PASSWORD=ygIYDG*&h8&ADSGH
IS_CORS=false
ANOTHER_KEY=anothervalue
FRIENDS__1=Sara
```
### config.js
```js
const mapEnv = require('@welldone-software/env-config')

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
### result
``` js
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
## principles
* Single source of truth - one file define the posibble config keys.
* Without mapping code - <s>`const port = proccess.env.PORT || 1000`</s>
* Readability configuration
