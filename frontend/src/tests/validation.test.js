import { describe, it, expect } from 'vitest'
import { validateLoginForm, validateRegisterForm, validateTaskForm } from '../utils/validation'

describe('Validation Functions', () => {
    describe('validateLoginForm', () => {
        it('validates correct email and password', () => {
            const result = validateLoginForm('test@example.com', 'password123')
            expect(result.isValid).toBe(true)
            expect(Object.keys(result.errors)).toHaveLength(0)
        })

        it('returns error for invalid email', () => {
            const result = validateLoginForm('invalid-email', 'password123')
            expect(result.isValid).toBe(false)
            expect(result.errors.email).toBeDefined()
        })

        it('returns error for empty password', () => {
            const result = validateLoginForm('test@example.com', '')
            expect(result.isValid).toBe(false)
            expect(result.errors.password).toBeDefined()
        })
    })

    describe('validateRegisterForm', () => {
        it('validates correct registration data', () => {
            const result = validateRegisterForm('John Doe', 'john@example.com', 'password123', 'password123')
            expect(result.isValid).toBe(true)
            expect(Object.keys(result.errors)).toHaveLength(0)
        })

        it('returns error for mismatched passwords', () => {
            const result = validateRegisterForm('John Doe', 'john@example.com', 'password123', 'different')
            expect(result.isValid).toBe(false)
            expect(result.errors.confirmPassword).toBeDefined()
        })

        it('returns error for short password', () => {
            const result = validateRegisterForm('John Doe', 'john@example.com', '123', '123')
            expect(result.isValid).toBe(false)
            expect(result.errors.password).toBeDefined()
        })
    })

    describe('validateTaskForm', () => {
        it('validates correct task data', () => {
            const result = validateTaskForm('Test Task', 'Task description')
            expect(result.isValid).toBe(true)
            expect(Object.keys(result.errors)).toHaveLength(0)
        })

        it('returns error for empty title', () => {
            const result = validateTaskForm('', 'Task description')
            expect(result.isValid).toBe(false)
            expect(result.errors.title).toBeDefined()
        })

        it('allows empty description', () => {
            const result = validateTaskForm('Test Task', '')
            expect(result.isValid).toBe(true)
        })
    })
})
