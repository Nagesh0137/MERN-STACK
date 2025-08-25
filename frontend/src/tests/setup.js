import { beforeAll, vi } from 'vitest'
import '@testing-library/jest-dom'

beforeAll(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        },
        writable: true,
    })

    // Mock window.confirm
    Object.defineProperty(window, 'confirm', {
        value: vi.fn(() => true),
        writable: true,
    })
})
