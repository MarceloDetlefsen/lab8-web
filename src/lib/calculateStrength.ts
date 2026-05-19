export type Strength = 'vacía' | 'débil' | 'media' | 'fuerte' | 'muy fuerte'

/**
 * Calcula la fortaleza de una contraseña según las siguientes reglas:
 * - vacía:     contraseña vacía
 * - débil:     menos de 8 caracteres
 * - media:     8+ caracteres, sin números ni símbolos
 * - fuerte:    8+ caracteres con al menos un número
 * - muy fuerte: 8+ caracteres con al menos un número Y al menos un símbolo
 *
 * Un símbolo es cualquier caracter que no sea letra ni número.
 */
export function calculateStrength(password: string): Strength {
  if (password.length === 0) return 'vacía'
  if (password.length < 8) return 'débil'

  const hasNumber = /\d/.test(password)
  const hasSymbol = /[^a-zA-Z0-9]/.test(password)

  if (hasNumber && hasSymbol) return 'muy fuerte'
  if (hasNumber) return 'fuerte'

  return 'media'
}

export const STRENGTH_LEVELS: Record<Strength, number> = {
  'vacía': 0,
  'débil': 25,
  'media': 50,
  'fuerte': 75,
  'muy fuerte': 100,
}
