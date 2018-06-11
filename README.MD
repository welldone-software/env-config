# Overview
Have your configuration in one place, organized in a js native structure, possbily hirarchial, but still easily configurable and overideable by environment variables, as recommended by the [Twelve-Factor App methodology](https://en.wikipedia.org/wiki/Twelve-Factor_App_methodology)
```js
{
  port: 1234,                     // PORT=1234
  isCors: true                    // IS_CORS=true
  db: {
    hostName: 'example.com',      // DB__HOST_NAME=example.com
    port: 4321,                   // DB__PORT=4321
  },
  friends: ['Adam', 'Rachel'],    // FRIENDS__0=Adam FRIENDS__1=Rachel
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

### Add to your project using npm or yarn
```
npm i -S @welldone-software/env-config
```
```
yarn add @welldone-software/env-config
```

### Define a config file, e.g. config.js
```js
const mapEnv = require('@welldone-software/env-config')

module.exports = mapEnv({
  port: 1234,
  db: {
    hostName: 'example.com',
    port: 4321,
    user: '',
    password: '',IS_CORS=false

  },
  friends: ['Adam', 'Rachel'],
  isCors: true
})
```

### At runtime, set environment variables (or specify in .env file)
```
DB__HOST_NAME=mydomain.com
DB__PORT=3060
DB__USER=ADMIN
DB__PASSWORD=ygIYDG*&h8&ADSGH
IS_CORS=false
ANOTHER_KEY=anothervalue
FRIENDS__1=Sara
```

### At runtime, the result will be
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
# Advantages
* Single source of truth - one place to define all posibble config keys.
* Simple to use but still allows for rather complex configurations: not just strings and not just flat structures.
* Uses 'native' naming convention in each environment so configs look natural both in JS and in ENV. 
* Much more readable than the alternative: <s>`const port = proccess.env.PORT || 1000`</s>

# Roadmap
* Add typing support (typescript and Flow)
* Support initial prefix (only merge prefixed env vars)
