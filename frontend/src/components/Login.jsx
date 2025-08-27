import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { validateLoginForm } from '../utils/validation';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const { login, authLoading, authError } = useApp();
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

        const validation = validateLoginForm(formData.email, formData.password);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        const result = await login(formData.email, formData.password);

        if (result.success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth-gradient d-flex align-items-center justify-content-center py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="glass-card">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <h2 className="h3 mb-3 fw-bold glass-text">
                                        Welcome Back
                                    </h2>
                                    <p className="glass-text-muted">
                                        Sign in to your account or{' '}
                                        <Link
                                            to="/register"
                                            className="glass-link text-primary"
                                        >
                                            create a new account
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

                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label fw-semibold glass-text">
                                            Password
                                        </label>
                                        <div className="input-group glass-input-group">
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                autoComplete="current-password"
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

                                    <div className="d-grid">
                                        <button
                                            type="submit"
                                            disabled={authLoading}
                                            className="btn btn-lg glass-btn"
                                        >
                                            {authLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Signing in...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                                    Sign in
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

export default Login;
