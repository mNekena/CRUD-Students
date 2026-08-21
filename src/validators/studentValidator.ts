interface ValidationResult {
    isValid: boolean;
    message?: string;
}

export const validateStudent = (data: any): ValidationResult => {
    const { first_name, last_name, email, phone, date_of_birth, address } = data;

    if (!first_name || typeof first_name !== 'string' || first_name.trim().length === 0) {
        return { isValid: false, message: 'First name is required' };
    }

    if (!last_name || typeof last_name !== 'string' || last_name.trim().length === 0) {
        return { isValid: false, message: 'Last name is required' };
    }

    if (!email || typeof email !== 'string') {
        return { isValid: false, message: 'Email is required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Invalid email' };
    }

    if (phone !== undefined && typeof phone !== "string") {
        return { isValid: false, message: 'Phone must be a string' };
    }

    if (date_of_birth !== undefined && typeof date_of_birth !== 'string') {
        return { isValid: false, message: 'Date of birth must be a string' };
    }

    if (address !== undefined && typeof address !== 'string') {
        return { isValid: false, message: 'Address must be a string' };
    }

    return { isValid: true };
};