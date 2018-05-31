const {mapEnv, getEvnKeys} = require('../src')

describe('getEvnKeys', () => {
  test('returns correct keys', () => {
    const a = {hello: 'world', camelCase: 'value', nest: {ed: 1, andSome: 2}}
    console.log('x', getEnvKeys(a))
    expect(getEnvKeys(a)).toEqual(['HELLO', 'CAMEL_CASE', 'NEST__ED', 'NEST__AND_SOME'])
  })
})

describe('mapEnv', () => {
  test('returns new object', () => {
    const a = {}
    expect(mapEnv(a)).not.toBe(a)
    expect(mapEnv(a) !== a).toBeTruthy()
  })
  test('replace default keys with env keys', () => {
    const a = {hello: 'world', camelCase: 'value'}
    process.env.HELLO = 'env'
    process.env.CAMEL_CASE = 'snake case upper'
    expect(mapEnv(a)).toEqual({hello: 'env', camelCase: 'snake case upper'})
  })
  test('return default values', () => {
    const a = {key: 'val'}
    expect(mapEnv(a).key).toEqual('val')
  })
  test('dont add env values not from defaults', () => {
    const a = {key: 'val'}
    process.env.MORE_VALUE = 'env'
    expect(mapEnv(a).moreValue).toEqual(undefined)
  })
  test('deep', () => {
    const a = {b: 1, c: {d: 'abc', f: [1, 23, {r: 'q'}, {m: {t: 1}}]}}
    expect(mapEnv(a)).toEqual(a)
  })
  test('replace specefic keys', () => {
    const a = {
      a: {b: 123},
      b: [1, 2, 3],
      aNumber: 1,
      c: {textAndText: 'abc', f: ['a text', 23, {r: 'q'}, {m: {t: 'nested value'}}]},
      d: {f: {g: 1}, y: 2},
    }
    Object.assign(process.env, {
      A_NUMBER: '123',
      C__TEXT_AND_TEXT: '456',
      D__F__G: '789',
      C__F__0: 'arrays',
      C__F__3__M__T: 'arrays&objects',
      A: 'replace object',
      B: 'replace array',
    })
    expect(mapEnv(a)).toEqual({
      a: 'replace object',
      b: 'replace array',
      aNumber: 123,
      c: {
        textAndText: '456',
        f: ['arrays', 23, {r: 'q'}, {m: {t: 'arrays&objects'}}],
      },
      d: {f: {g: 789}, y: 2},
    })
  })
  test('type convert', () => {
    Object.assign(process.env, {
      PORT: 'port',
      DB__HOST_NAME: 'mydomain.com',
      DB__PORT: '3060',
      DB__USER: 'ADMIN',
      DB__PASSWORD: 'ygIYDG*&h8&ADSGH',
      IS_CORS: 'false',
      ANOTHER_KEY: 'anothervalue',
      FRIENDS__1: 'Sara',
    })
    const res = mapEnv({
      port: 1234,
      db: {
        hostName: 'example.com',
        port: 4321,
        user: '',
        password: '',
      },
      friends: ['Adam', 'Rachel'],
      isCors: true,
    })
    expect(res).toEqual({
      port: NaN,
      db: {
        hostName: 'mydomain.com',
        port: 3060,
        user: 'ADMIN',
        password: 'ygIYDG*&h8&ADSGH',
      },
      friends: ['Adam', 'Sara'],
      isCors: false,
    })
  })
})
