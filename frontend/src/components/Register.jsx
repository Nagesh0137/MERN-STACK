import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { validateRegisterForm } from '../utils/validation';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, authLoading, authError } = useApp();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validateRegisterForm(
            formData.name,
            formData.email,
            formData.password,
            formData.confirmPassword
        );

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        const result = await register(formData.name, formData.email, formData.password);

        if (result.success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth-gradient d-flex align-items-center justify-content-center py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="glass-card">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <h2 className="h3 mb-3 fw-bold glass-text">
                                        Create Account
                                    </h2>
                                    <p className="glass-text-muted">
                                        Join us today or{' '}
                                        <Link
                                            to="/login"
                                            className="glass-link link-primary"
                                        >
                                            sign in to your existing account
                                        </Link>
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {authError && (
                                        <div className="glass-alert d-flex align-items-center mb-3" role="alert">
                                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                            {authError}
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label fw-semibold glass-text">
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`form-control form-control-lg glass-input ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback" style={{ color: '#ff6b6b', fontWeight: '500', textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>{errors.name}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-semibold glass-text">
                                            Email address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`form-control form-control-lg glass-input ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder="Enter your email"
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback" style={{ color: '#ff6b6b', fontWeight: '500', textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>{errors.email}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label fw-semibold glass-text">
                                            Password
                                        </label>
                                        <div className="input-group glass-input-group">
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                autoComplete="new-password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`form-control form-control-lg glass-input ${errors.password ? 'is-invalid' : ''}`}
                                                placeholder="Enter your password"
                                            />
                                            <button
                                                type="button"
                                                className="btn glass-btn-secondary"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <div className="invalid-feedback d-block" style={{ color: '#ff6b6b', fontWeight: '500', textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>{errors.password}</div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="confirmPassword" className="form-label fw-semibold glass-text">
                                            Confirm Password
                                        </label>
                                        <div className="input-group glass-input-group">
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                autoComplete="new-password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className={`form-control form-control-lg glass-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                                placeholder="Confirm your password"
                                            />
                                            <button
                                                type="button"
                                                className="btn glass-btn-secondary"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <div className="invalid-feedback d-block" style={{ color: '#ff6b6b', fontWeight: '500', textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>{errors.confirmPassword}</div>
                                        )}
                                    </div>

                                    <div className="d-grid">
                                        <button
                                            type="submit"
                                            disabled={authLoading}
                                            className="btn btn-lg glass-btn"
                                        >
                                            {authLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Creating account...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-person-plus me-2"></i>
                                                    Create account
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
