const {mapValues, map, snakeCase, flatten, merge} = require('lodash')
const dotevn = require('dotenv')

dotevn.config()

const converters = {
  boolean: val => val === 'true' || val === 'TRUE',
  number: val => Number(val),
}

const castToType = (envValue, type) => {
  if (type in converters) {
    return converters[type](envValue)
  }
  return envValue
}

const mapEnv = (obj, basePath = '') => {
  const fn = obj instanceof Array ? map : mapValues
  return fn(obj, (val, key) => {
    const envKey = `${basePath ? `${basePath}__` : ''}${snakeCase(key).toUpperCase()}`
    const type = typeof val
    if (process.env[envKey]) {
      return castToType(process.env[envKey], type)
    }
    return type === 'object' ? mapEnv(val, envKey) : val
  })
}

const getEnvKeys = (obj, basePath = '') =>
  flatten(map(obj, (val, key) => {
    const envKey =
      `${basePath ? `${basePath}__` : ''}${snakeCase(key).toUpperCase()}`
    return typeof val === 'object' ? getEnvKeys(val, envKey) : envKey
  }))


const mergeEnv = (obj, basePath = '') => merge(obj, mapEnv(obj, basePath))

module.exports = {
  mapEnv,
  mergeEnv,
  getEnvKeys,
}
