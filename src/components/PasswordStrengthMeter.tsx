import { useState } from 'react'
import { calculateStrength, STRENGTH_LEVELS } from '../lib/calculateStrength'

export function PasswordStrengthMeter() {
  const [password, setPassword] = useState('')

  const strength = calculateStrength(password)
  const progressValue = STRENGTH_LEVELS[strength]

  return (
    <div>
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div
        role="progressbar"
        aria-label="Indicador de fortaleza"
        aria-valuenow={progressValue}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      <p role="status">{strength}</p>
    </div>
  )
}