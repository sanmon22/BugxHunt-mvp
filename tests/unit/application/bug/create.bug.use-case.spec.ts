import { beforeEach, describe, expect, test, vi } from "vitest";
import { CreateBugUseCase } from "../../../../src/application/use-cases/bug/create.bug.use-case.js";
import { ValidationError } from "../../../../src/domain/errors/validation.error.js";

describe('CreateBugUseCase', () => {
    const mockBugRepository = {
        findAll: vi.fn(),
        findById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    }

    beforeEach(() => {
        vi.clearAllMocks();
    })

    const createBugUseCase = new CreateBugUseCase(mockBugRepository);

    test('should create and return a Bug with generated ID and timestamps', async () => {

        const input = {
            details: 'This is a valid bug description with enough length.',
            images: ['https://example.com/img.png'],
            references: ['ref-1'],
            notes: 'Some notes',
        }

        mockBugRepository.create.mockImplementation((bug) => Promise.resolve(bug));

        const result = await createBugUseCase.execute(input);

        expect(result).toHaveProperty('id');
        expect(result.id).toBeTypeOf('string');
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
        expect(result.details).toBe(input.details);
        expect(result.images).toEqual(input.images);
        expect(result.references).toEqual(input.references);
        expect(result.notes).toBe(input.notes);
        expect(mockBugRepository.create).toHaveBeenCalledTimes(1);


    })

    test('should throw ValidationError when input is invalid', async () => {
        const input = {
            details: '',
            images: [],
            references: [],
            notes: '',
        }

        await expect(createBugUseCase.execute(input)).rejects.toThrow(ValidationError);
        expect(mockBugRepository.create).not.toHaveBeenCalled();
    })
})