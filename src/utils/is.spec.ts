import { describe, it, expect } from 'vitest'
import { isObject, isArray, isNill, isEmpty } from './is'

describe('isObject', () => {
  it('deve retornar true para objetos', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })

  it('deve retornar false para não-objetos', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject([])).toBe(false)
    expect(isObject('')).toBe(false)
    expect(isObject(123)).toBe(false)
    expect(isObject(true)).toBe(false)
  })
})

describe('isArray', () => {
  it('deve retornar true para arrays', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray(new Array())).toBe(true)
  })

  it('deve retornar false para não-arrays', () => {
    expect(isArray({})).toBe(false)
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
    expect(isArray('')).toBe(false)
    expect(isArray(123)).toBe(false)
    expect(isArray(true)).toBe(false)
  })
})

describe('isNill', () => {
  it('deve retornar true para null e undefined', () => {
    expect(isNill(null)).toBe(true)
    expect(isNill(undefined)).toBe(true)
  })

  it('deve retornar false para valores não-nulos', () => {
    expect(isNill({})).toBe(false)
    expect(isNill([])).toBe(false)
    expect(isNill('')).toBe(false)
    expect(isNill(0)).toBe(false)
    expect(isNill(false)).toBe(false)
  })
})

describe('isEmpty', () => {
  it('deve retornar true para valores vazios', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty('   ')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty(new Map())).toBe(true)
    expect(isEmpty(new Set())).toBe(true)
  })

  it('deve retornar false para valores não-vazios', () => {
    expect(isEmpty('texto')).toBe(false)
    expect(isEmpty([1, 2, 3])).toBe(false)
    expect(isEmpty({ a: 1 })).toBe(false)

    const map = new Map()
    map.set('chave', 'valor')
    expect(isEmpty(map)).toBe(false)

    const set = new Set()
    set.add('valor')
    expect(isEmpty(set)).toBe(false)

    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(false)).toBe(false)
  })
})
