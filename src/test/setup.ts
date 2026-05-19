import { afterEach } from 'vitest'
import { GlobalWindow } from 'happy-dom'

const window = new GlobalWindow()
const globalObject = globalThis as any
const bindIfFunction = (value: unknown) =>
  typeof value === 'function' ? value.bind(window) : undefined

globalObject.window = window
globalObject.document = window.document
globalObject.navigator = window.navigator
globalObject.location = window.location
globalObject.history = window.history
globalObject.customElements = window.customElements
globalObject.HTMLElement = window.HTMLElement
globalObject.Element = window.Element
globalObject.Node = window.Node
globalObject.Text = window.Text
globalObject.Event = window.Event
globalObject.MouseEvent = window.MouseEvent
globalObject.KeyboardEvent = window.KeyboardEvent
globalObject.FocusEvent = window.FocusEvent
globalObject.InputEvent = window.InputEvent
globalObject.DOMRect = window.DOMRect
globalObject.DOMParser = window.DOMParser
globalObject.MutationObserver = window.MutationObserver
globalObject.ResizeObserver = window.ResizeObserver
globalObject.getComputedStyle = bindIfFunction(window.getComputedStyle) ?? globalObject.getComputedStyle
globalObject.requestAnimationFrame = bindIfFunction(window.requestAnimationFrame) ?? globalObject.requestAnimationFrame
globalObject.cancelAnimationFrame = bindIfFunction(window.cancelAnimationFrame) ?? globalObject.cancelAnimationFrame
globalObject.scrollTo = bindIfFunction(window.scrollTo) ?? globalObject.scrollTo

await import('@testing-library/jest-dom/vitest')
const { cleanup } = await import('@testing-library/react')

afterEach(() => {
  cleanup()
  document.body.innerHTML = ''
})
