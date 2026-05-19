import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter'

describe('PasswordStrengthMeter', () => {
  // --- Tests de renderizado ---
  it('renderiza un input de tipo password', () => {
    render(<PasswordStrengthMeter />)
    // Los inputs type="password" no tienen role "textbox", se buscan por label
    const input = screen.getByLabelText(/contraseña/i)
    expect(input).toBeInTheDocument()
  })

  it('el input tiene type="password" para ocultar el texto', () => {
    render(<PasswordStrengthMeter />)
    // getByLabelText busca por accesibilidad
    const input = screen.getByLabelText(/contraseña/i)
    expect(input).toHaveAttribute('type', 'password')
  })

  it('renderiza el indicador de fortaleza con estado inicial "vacía"', () => {
    render(<PasswordStrengthMeter />)
    expect(screen.getByText('vacía')).toBeInTheDocument()
  })

  // --- Accesibilidad (puntos extra) ---
  it('el input es accesible mediante su label', () => {
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)
    expect(input).toBeInTheDocument()
  })

  it('el indicador de fortaleza tiene un role o label accesible', () => {
    render(<PasswordStrengthMeter />)
    // El indicador debe tener aria-label o ser localizable por texto
    const indicator = screen.getByRole('status')
    expect(indicator).toBeInTheDocument()
  })

  // --- Tests de comportamiento ---
  it('muestra "débil" al escribir una contraseña corta', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)

    await user.type(input, 'abc')

    expect(screen.getByText('débil')).toBeInTheDocument()
  })

  it('muestra "media" al escribir 8 o más caracteres sin números ni símbolos', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)

    await user.type(input, 'abcdefgh')

    expect(screen.getByText('media')).toBeInTheDocument()
  })

  it('muestra "fuerte" al escribir 8+ caracteres con al menos un número', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)

    await user.type(input, 'abcdefg1')

    expect(screen.getByText('fuerte')).toBeInTheDocument()
  })

  it('muestra "muy fuerte" al escribir 8+ caracteres con número y símbolo', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)

    await user.type(input, 'abcdef1!')

    expect(screen.getByText('muy fuerte')).toBeInTheDocument()
  })

  it('vuelve a mostrar "vacía" al borrar toda la contraseña', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)

    await user.type(input, 'abc123')
    await user.clear(input)

    expect(screen.getByText('vacía')).toBeInTheDocument()
  })

  // --- Tests de edge cases ---
  it('una contraseña de exactamente 8 caracteres sin números no es "débil"', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)

    await user.type(input, 'abcdefgh')

    expect(screen.queryByText('débil')).not.toBeInTheDocument()
  })

  it('una contraseña de exactamente 7 caracteres no es "media"', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)

    await user.type(input, 'abcdefg')

    expect(screen.queryByText('media')).not.toBeInTheDocument()
  })

  it('una contraseña con solo símbolos y menos de 8 caracteres sigue siendo "débil"', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)

    await user.type(input, '!@#$%')

    expect(screen.getByText('débil')).toBeInTheDocument()
  })

  // --- Barra de progreso (puntos extra) ---
  it('renderiza una barra de progreso', () => {
    render(<PasswordStrengthMeter />)
    const progressBar = screen.getByRole('progressbar', { name: /indicador/i })
    expect(progressBar).toBeInTheDocument()
  })

  it('la barra de progreso tiene valor 0 cuando la contraseña está vacía', () => {
    render(<PasswordStrengthMeter />)
    const progressBar = screen.getByRole('progressbar', { name: /indicador/i })
    expect(progressBar).toHaveAttribute('aria-valuenow', '0')
  })

  it('la barra de progreso aumenta cuando la contraseña es más fuerte', async () => {
    const user = userEvent.setup()
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)
    const progressBar = screen.getByRole('progressbar', { name: /indicador/i })

    await user.type(input, 'abcdefgh')
    const valueMedia = Number(progressBar.getAttribute('aria-valuenow'))

    await user.clear(input)
    await user.type(input, 'abcdef1!')
    const valueMuyFuerte = Number(progressBar.getAttribute('aria-valuenow'))

    expect(valueMuyFuerte).toBeGreaterThan(valueMedia)
  })
})
