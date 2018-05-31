# Overview
Have your configuration in one place, organized in a js native structure, possbily hirarchial, but still easily configurable and overideable by environment variables, as recommended by the [Twelve-Factor App methodology](https://en.wikipedia.org/wiki/Twelve-Factor_App_methodology)
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

This Small and powerfull config library reada keys from the config object and searches proccess.env for corresponding keys according to a naming convension.

This allows your apps to use config objects that fully support literal objects, literal arrays, numbers, strings and booleans , while stil being configured/overidden by env vars.

## Conventions
* JS config object is literal javascript object with `camalCase` members.
* The environment variables are expected in `UPPER_SNAKE_CASE` convention.
* Two underscores (`__`) mean nesting, e.g. DB_SETTINGS__CONNECTION_STRING translated to dbSettings.connectionString
* Supports String, Boolean, Number and Array values.
* Types are determined by defaults in config file.

## Usage

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

### Environment variables (specified in .env file)
```
DB__HOST_NAME=mydomain.com
DB__PORT=3060
DB__USER=ADMIN
DB__PASSWORD=ygIYDG*&h8&ADSGH
IS_CORS=false
ANOTHER_KEY=anothervalue
FRIENDS__1=Sara
```

### result
``` js
{
  port: 1234,
  db: {
    hostName: **'mydomain.com'**,
    port: **3060**,
    user: **'ADMIN'**,
    password: **'ygIYDG*&h8&ADSGH'**,
  },
  friends: ['Adam', **'Sara'**],
  isCors: **false**
}
```
# Advantages
* Single source of truth - one place to define all posibble config keys.
* Simple to use but still allows for rather complex configurations: not just strings and not just flat structures.
* Uses 'native' naming convention in each environment so configs look natural both in JS and in ENV. 
* Much more readable than the alternative: <s>`const port = proccess.env.PORT || 1000`</s>

# Roadmap
* Add typing support (typescript and Flow)
