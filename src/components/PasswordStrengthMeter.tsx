import { useState } from 'react'
import { calculateStrength } from '../lib/calculateStrength'

export function PasswordStrengthMeter() {
  const [password, setPassword] = useState('')

  const strength = calculateStrength(password)

  return (
    <div>
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p role="status">{strength}</p>
    </div>
  )
}