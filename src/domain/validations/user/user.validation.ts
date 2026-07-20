import { User } from "../../entities/user/user.entity.js";
import { ValidationError } from "../../errors/validation.error.js";

const USERNAME_PATTERN = /^[a-z0-9]{3,20}$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;

export function validateUsername(username: string): void {
    if (typeof username !== 'string' || username.trim().length === 0) {
        throw new ValidationError('Username cannot be empty', 'username')
    }
    if (username.length < 3 || username.length > 20) {
        throw new ValidationError('Username must contain between 3 and 20 characters', 'username')
    }
    if (!USERNAME_PATTERN.test(username)) {
        throw new ValidationError('Username must be between 3 and 20 characters and can only contain letters, numbers, and underscores (no spaces or special characters)', 'username')
    }
}

export function validateUserEmail(email: string): void {
    if (typeof email !== 'string' || email.trim().length === 0) {
        throw new ValidationError('Email cannot be empty', 'email')
    }
    if (!EMAIL_PATTERN.test(email)) {
        throw new ValidationError('Please enter a valid email address (e.g., user@example.com). It cannot contain spaces or invalid symbols.', 'email')
    }
}

export function validateUserPassword(password: string): void {
    if (typeof password !== 'string' || password.trim().length === 0) {
        throw new ValidationError('Password cannot be empty', 'password')
    }
    if (password.length < 12) {
        throw new ValidationError('Password must be at least 12 characters', 'password');
    }
}

export function validateUser(data: Partial<User>): void {
    if (data.username !== undefined) {
        validateUsername(data.username);
    }
    if (data.email !== undefined) {
        validateUserEmail(data.email);
    }
    if (data.password !== undefined) {
        validateUserPassword(data.password);
    }
}