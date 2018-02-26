const {mapValues, map, snakeCase} = require('lodash')
const dotevn = require('dotenv')

dotevn.config()

const mapEnv = (obj, basePath = '') => {
  const fn = obj instanceof Array ? map : mapValues
  return fn(obj, (val, key) => {
    const envKey =
      `${basePath ? `${basePath}__` : ''}${snakeCase(key).toUpperCase()}`
    return (
      process.env[envKey] ||
      (typeof val === 'object' ? mapEnv(val, envKey) : val)
    )
  })
}

module.exports = {
  mapEnv,
}
