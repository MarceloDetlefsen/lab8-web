export function PasswordStrengthMeter() {
  return (
    <div>
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
      />
      <p role="status">vacía</p>
    </div>
  )
}