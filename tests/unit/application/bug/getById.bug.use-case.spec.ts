import { beforeEach, describe, expect, test, vi } from "vitest";
import { GetByIdBugUseCase } from "../../../../src/application/use-cases/bug/getById.bug.use-case.js";
import { NotFoundError } from "../../../../src/domain/errors/not-found.error.js";


describe('GetByIdBugUseCase', () => {
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

    const getByIdBugUseCase = new GetByIdBugUseCase(mockBugRepository);

    test('should find and return a Bug through ID', async () => {

        const bug = {
            id: '123',
            details: 'A valid bug description here.',
            images: [],
            references: [],
            notes: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        mockBugRepository.findById.mockResolvedValue(bug);
        const result = await getByIdBugUseCase.execute('123');

        expect(result).toEqual(bug);

    })

    test('should throw NotFoundError validation', async () => {

        mockBugRepository.findById.mockResolvedValue(null);
        expect(getByIdBugUseCase.execute('999')).rejects.toThrow(NotFoundError);

    })
})