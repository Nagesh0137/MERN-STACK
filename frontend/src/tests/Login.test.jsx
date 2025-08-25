import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../components/Login'
import { AppProvider } from '../context/AppContext'

// Test wrapper component
const TestWrapper = ({ children }) => (
    <BrowserRouter>
        <AppProvider>
            {children}
        </AppProvider>
    </BrowserRouter>
)

describe('Login Component', () => {
    it('renders login form', () => {
        render(
            <TestWrapper>
                <Login />
            </TestWrapper>
        )

        expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    it('has link to register page', () => {
        render(
            <TestWrapper>
                <Login />
            </TestWrapper>
        )

        expect(screen.getByText('create a new account')).toBeInTheDocument()
    })
})
