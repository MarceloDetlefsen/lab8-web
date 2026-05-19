export type Strength = 'vacía'

/**
 * Calcula la fortaleza de una contraseña según las siguientes reglas:
 * - vacía:     contraseña vacía
 * 
 * Un símbolo es cualquier caracter que no sea letra ni número.
 */
export function calculateStrength(password: string): Strength {
  if (password.length === 0) return 'vacía'
}

export const STRENGTH_LEVELS: Record<Strength, number> = {
  'vacía': 0,
}
