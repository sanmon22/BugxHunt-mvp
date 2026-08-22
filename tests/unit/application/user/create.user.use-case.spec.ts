import { beforeEach, describe, expect, test, vi } from "vitest";
import { CreateUserUseCase } from "../../../../src/application/use-cases/user/create.user.use-case.js";
import { ValidationError } from "../../../../src/domain/errors/validation.error.js";

describe('CreateUserUseCase', () => {
    const mockUserRepository = {
        findAll: vi.fn(),
        findById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    }

    beforeEach(() => {
        vi.clearAllMocks();
    })

    const createUserUseCase = new CreateUserUseCase(mockUserRepository);

    test('should create a user and return a generated ID and timestamps', async () => {
        const input = {
            username: 'sanmon',
            email: 'sanmon@email.com',
            password: 'sanmonsanmon',
        }

        mockUserRepository.create.mockImplementation((user) => Promise.resolve(user))

        const result = await createUserUseCase.execute(input);

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('createdAt');
        expect(result).toHaveProperty('updatedAt');
        expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
    })

    test('shoul throw Validation Error when input has miss properties', async () => {
        const input = {
            username: 'sanmon',
            email: '',
            password: '123456789ABCD',
        }

        mockUserRepository.create.mockImplementation((user) => Promise.resolve(user))

        await expect(createUserUseCase.execute(input)).rejects.toThrow(ValidationError);
    })
})