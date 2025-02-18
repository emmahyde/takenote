/** @vitest-environment jsdom */
import { cleanup } from '@testing-library/react'
import { expect, afterEach, beforeAll, vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock window.matchMedia
beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addEventListener: (event: string, listener: () => void) => {
          listener()
        },
        removeEventListener: (event: string, listener: () => void) => {
          listener()
        },
      }
    }
})

// Extend Vitest's expect with testing-library matchers
expect.extend({})

// Clean up after each test
afterEach(() => {
  cleanup()
})

// Stub out XMLHttpRequest to prevent actual network calls during tests
class FakeXMLHttpRequest {
  open = vi.fn()
  send = vi.fn()
  setRequestHeader = vi.fn()
}

// Replace the global XMLHttpRequest with our fake implementation
global.XMLHttpRequest = FakeXMLHttpRequest as unknown as typeof XMLHttpRequest
