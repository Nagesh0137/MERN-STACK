// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
    return password && password.length >= 6;
};

// Name validation
export const isValidName = (name) => {
    return name && name.trim().length >= 2 && name.trim().length <= 50;
};

// Form validation
export const validateLoginForm = (email, password) => {
    const errors = {};

    if (!email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
        errors.email = 'Please enter a valid email';
    }

    if (!password) {
        errors.password = 'Password is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateRegisterForm = (name, email, password, confirmPassword) => {
    const errors = {};

    if (!name) {
        errors.name = 'Name is required';
    } else if (!isValidName(name)) {
        errors.name = 'Name must be between 2 and 50 characters';
    }

    if (!email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
        errors.email = 'Please enter a valid email';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (!isValidPassword(password)) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateTaskForm = (title, description = '') => {
    const errors = {};

    if (!title || !title.trim()) {
        errors.title = 'Task title is required';
    } else if (title.trim().length > 255) {
        errors.title = 'Title must be less than 255 characters';
    }

    if (description && description.length > 1000) {
        errors.description = 'Description must be less than 1000 characters';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
