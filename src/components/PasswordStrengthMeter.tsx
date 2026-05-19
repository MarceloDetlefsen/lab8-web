import { useState } from 'react'
import { calculateStrength, STRENGTH_LEVELS, type Strength } from '../lib/calculateStrength'
import './PasswordStrengthMeter.css'

const STRENGTH_COLORS: Record<Strength, string> = {
  'vacía': 'strength--empty',
  'débil': 'strength--weak',
  'media': 'strength--medium',
  'fuerte': 'strength--strong',
  'muy fuerte': 'strength--very-strong',
}

export function PasswordStrengthMeter() {
  const [password, setPassword] = useState('')

  const strength = calculateStrength(password)
  const progressValue = STRENGTH_LEVELS[strength]
  const colorClass = STRENGTH_COLORS[strength]

  return (
    <div className="psm">
      <div className="psm__field">
        <label htmlFor="password" className="psm__label">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          className="psm__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </div>

      <div className="psm__feedback">
        <div
          className={`psm__progress-track`}
          role="progressbar"
          aria-valuenow={progressValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Indicador de fortaleza"
        >
          <div
            className={`psm__progress-fill ${colorClass}`}
            style={{ width: `${progressValue}%` }}
          />
        </div>

        <p role="status" className={`psm__label-strength ${colorClass}`}>
          {strength}
        </p>
      </div>
    </div>
  )
}
