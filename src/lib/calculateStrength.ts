export type Strength = 'vacía' | 'debil' | 'media'

/**
 * Calcula la fortaleza de una contraseña según las siguientes reglas:
 * - vacía:     contraseña vacía
 * - débil:      menos de 8 caracteres
 * - media:      8 o más caracteres sin números ni símbolos
 * 
 * Un símbolo es cualquier caracter que no sea letra ni número.
 */
export function calculateStrength(password: string): Strength {
  if (password.length === 0) return 'vacía'
  if (password.length < 8) return 'debil'

  return 'media'
}

export const STRENGTH_LEVELS: Record<Strength, number> = {
  'vacía': 0,
  'debil': 25,
  'media': 50
}
