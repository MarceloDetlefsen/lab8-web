import { describe, it, expect } from 'vitest'
import { calculateStrength } from './calculateStrength'

describe('calculateStrength', () => {
  // --- Estado vacío ---
  it('retorna "vacía" cuando la contraseña está vacía', () => {
    expect(calculateStrength('')).toBe('vacía')
  })

  // --- Débil ---
  it('retorna "débil" cuando la contraseña tiene menos de 8 caracteres', () => {
    expect(calculateStrength('abc')).toBe('débil')
  })

  it('retorna "débil" cuando la contraseña tiene exactamente 7 caracteres', () => {
    expect(calculateStrength('abcdefg')).toBe('débil')
  })

  it('retorna "débil" cuando tiene solo símbolos y menos de 8 caracteres', () => {
    expect(calculateStrength('!@#$%')).toBe('débil')
  })

  it('retorna "débil" con 1 solo caracter', () => {
    expect(calculateStrength('a')).toBe('débil')
  })

  // --- Media ---
  it('retorna "media" cuando tiene 8 o más caracteres sin números ni símbolos', () => {
    expect(calculateStrength('abcdefgh')).toBe('media')
  })

  it('retorna "media" cuando tiene exactamente 8 caracteres sin números', () => {
    expect(calculateStrength('abcdefgh')).toBe('media')
  })

  it('retorna "media" con 12 caracteres solo letras', () => {
    expect(calculateStrength('abcdefghijkl')).toBe('media')
  })

  it('NO retorna "débil" para una contraseña de exactamente 8 caracteres sin números', () => {
    expect(calculateStrength('abcdefgh')).not.toBe('débil')
  })

  it('NO retorna "media" para una contraseña de 7 caracteres', () => {
    expect(calculateStrength('abcdefg')).not.toBe('media')
  })

  // --- Fuerte ---
  it('retorna "fuerte" cuando tiene 8 o más caracteres con al menos un número', () => {
    expect(calculateStrength('abcdefg1')).toBe('fuerte')
  })

  it('retorna "fuerte" con número al inicio', () => {
    expect(calculateStrength('1abcdefg')).toBe('fuerte')
  })

  it('retorna "fuerte" con múltiples números', () => {
    expect(calculateStrength('abc12345')).toBe('fuerte')
  })

  // --- Muy fuerte ---
  it('retorna "muy fuerte" cuando tiene 8+ caracteres, número y símbolo', () => {
    expect(calculateStrength('abcdef1!')).toBe('muy fuerte')
  })

  it('retorna "muy fuerte" con símbolo @', () => {
    expect(calculateStrength('abcdefg1@')).toBe('muy fuerte')
  })

  it('retorna "muy fuerte" con espacio como símbolo', () => {
    expect(calculateStrength('abcde 1g')).toBe('muy fuerte')
  })

  it('retorna "muy fuerte" con símbolo #', () => {
    expect(calculateStrength('Pass1234#')).toBe('muy fuerte')
  })

  // --- Mayúsculas/minúsculas mezcladas (extra points) ---
  it('retorna "muy fuerte" cuando tiene 8+ caracteres, número, símbolo Y mayúsculas mezcladas', () => {
    expect(calculateStrength('Abcdef1!')).toBe('muy fuerte')
  })
})
