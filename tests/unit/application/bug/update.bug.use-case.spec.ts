import { beforeEach, describe, expect, test, vi } from "vitest";
import { UpdateBugUseCase } from "../../../../src/application/use-cases/bug/update.bug.use-case";
import { NotFoundError } from "../../../../src/domain/errors/not-found.error";


describe('UpdateBugUseCase', () => {
    const mockBugRepository = {
        findAll: vi.fn(),
        findById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn()
    }

    beforeEach(() => {
        vi.clearAllMocks();
    })

    const updateBugUseCase = new UpdateBugUseCase(mockBugRepository);

    test('should update a bug through ID and return the updated one', async () => {

        const bug = {
            id: '123',
            details: 'A valid bug description here.',
            images: [],
            references: [],
            notes: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const updatedBug = { ...bug, notes: 'Lorem ipsum' }

        mockBugRepository.findById.mockResolvedValue(bug);
        mockBugRepository.update.mockResolvedValue(updatedBug);

        const result = await updateBugUseCase.execute(bug.id, { notes: ' Lorem ipsum' });

        expect(result.notes).not.toEqual(bug.notes);

    })

    test('should throw NotFoundErorr when ID is invalid', async () => {
        const bug = {
            id: '123',
            details: 'A valid bug description here.',
            images: [],
            references: [],
            notes: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const updatedBug = { ...bug, notes: 'NotFoundError' };

        mockBugRepository.findById.mockResolvedValue(null);
        mockBugRepository.update.mockResolvedValue(updatedBug);


        await expect(updateBugUseCase.execute('000', { notes: 'NotFoundError' })).rejects.toThrow(NotFoundError);
    })
})