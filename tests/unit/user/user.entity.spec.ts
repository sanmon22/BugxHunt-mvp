import { describe, expect, test } from "vitest";
import { createUser } from "../../../src/domain/entities/user/user.factory.ts";
import { ValidationError } from "../../../src/domain/errors/validation.error.ts";

describe('User Entity Invariants', () => {
    test('Should create a valid User entity instance with correct properties', () => {
        
        const userEntity = {
            username: 'sanmon',
            email: 'sanmon@email.com',
            password: 'sanmonsanmonsanmonsanmon'
        };

        const user = createUser(userEntity);

        expect(user).toHaveProperty('id');
        expect(user.id).toBeTypeOf('string');
        expect(user.username).toBe(userEntity.username);
        expect(user.email).toBe(userEntity.email);
        expect(user.password).toBe(userEntity.password);
        expect(user.createdAt).toBeInstanceOf(Date);
        expect(user.updatedAt).toBeInstanceOf(Date);
    })

    test('Should throw a ValidationError when username field is empty', () => {
        
        const userEntity = {
            username: '',
            email: 'sanmon@email.com',
            password: 'sanmonsanmonsanmon'
        };

        expect(() => createUser(userEntity)).toThrow(ValidationError);
    })
})