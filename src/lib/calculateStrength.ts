export type Strength = 'vacía' | 'debil' | 'media' | 'fuerte'

/**
 * Calcula la fortaleza de una contraseña según las siguientes reglas:
 * - vacía:     contraseña vacía
 * - débil:      menos de 8 caracteres
 * - media:      8 o más caracteres sin números ni símbolos
 * - fuerte:     8 o más caracteres con al menos un número
 *
 * Un símbolo es cualquier caracter que no sea letra ni número.
 */
export function calculateStrength(password: string): Strength {
  if (password.length === 0) return 'vacía'
  if (password.length < 8) return 'debil'

  const hasNumber = /\d/.test(password)

  if (hasNumber) return 'fuerte'

  return 'media'
}

export const STRENGTH_LEVELS: Record<Strength, number> = {
  'vacía': 0,
  'debil': 25,
  'media': 50,
  'fuerte': 75
}
