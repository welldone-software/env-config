const {mapEnv} = require('../src')

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
      someText: 1,
      c: {textAndText: 'abc', f: [1, 23, {r: 'q'}, {m: {t: 1}}]},
      d: {f: {g: 1}, y: 2},
    }
    Object.assign(process.env, {
      SOME_TEXT: '123',
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
      someText: '123',
      c: {
        textAndText: '456',
        f: ['arrays', 23, {r: 'q'}, {m: {t: 'arrays&objects'}}],
      },
      d: {f: {g: '789'}, y: 2},
    })
  })
})
