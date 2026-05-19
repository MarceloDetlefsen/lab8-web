# Password Strength Meter

Componente React que evalúa la fortaleza de una contraseña en tiempo real.

## Instalación

```bash
bun install
```

## Correr el proyecto

```bash
bun run dev
```

## Compilar para producción

```bash
bun run build
```

## Correr los tests

```bash
bun test
```

### Generar reporte de cobertura

```bash
bun run coverage
```

El reporte HTML se genera en `coverage/index.html`.

## Lint

```bash
bun run lint
```

## Estructura

```text
src/
├── lib/
│   ├── calculateStrength.ts
│   └── calculateStrength.test.ts
├── components/
│   ├── PasswordStrengthMeter.tsx
│   ├── PasswordStrengthMeter.css
│   └── PasswordStrengthMeter.test.tsx
├── test/
│   └── setup.ts
├── App.tsx
├── App.css
└── index.css
```

`src/lib/calculateStrength.ts` contiene la lógica pura de evaluación y `src/components/PasswordStrengthMeter.tsx` renderiza el input, la barra de progreso y el estado textual.

## Reglas de fortaleza

| Condición | Fortaleza |
|-----------|-----------|
| Contraseña vacía | `vacía` |
| Menos de 8 caracteres | `débil` |
| 8+ caracteres, sin números ni símbolos | `media` |
| 8+ caracteres con al menos un número | `fuerte` |
| 8+ caracteres con número **y** símbolo | `muy fuerte` |

> Un símbolo es cualquier carácter que no sea letra ni número (incluye espacios, `!`, `@`, `#`, etc.)

## 👤 Autor

**Marcelo Detlefsen - 24554**
