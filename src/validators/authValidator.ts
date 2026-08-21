interface ValidationResult {
    isValid: boolean;
    message?: string;
}

export const validateAuth = (data: any): ValidationResult => {
    const { email, password } = data;

    if (!email || typeof email !== 'string') {
        return { isValid: false, message: 'Email is required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Invalid email' };
    }

    if (!password || typeof password !== 'string') {
        return { isValid: false, message: 'Password is required' };
    }

    if (password.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters' };
    }

    return { isValid: true };
};