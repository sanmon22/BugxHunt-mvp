import { beforeEach, describe, expect, test, vi } from "vitest";
import { DeleteBugUseCase } from "../../../../src/application/use-cases/bug/delete.bug.use-case.js";
import { NotFoundError } from "../../../../src/domain/errors/not-found.error";


describe('DeleteBugUseCase', () => {
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

    const deleteBugUseCase = new DeleteBugUseCase(mockBugRepository);

    test('should delete a bug when an ID is provided', async () => {
        const bug = {
            id: '123',
            details: 'A valid bug description here.',
            images: [],
            references: [],
            notes: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        mockBugRepository.findById.mockResolvedValue(bug.id);
        mockBugRepository.delete.mockResolvedValue(true);

        const result = await deleteBugUseCase.execute(bug.id);

        expect(result).toBeTruthy();
        expect(mockBugRepository.findById).toHaveBeenCalledWith('123');
        expect(mockBugRepository.delete).toHaveBeenCalledWith('123')

    })

    test('should throw an NotFoundError when ID is not found', async () => {

        mockBugRepository.findById.mockResolvedValue(null);

        await expect(deleteBugUseCase.execute('non-existing-id')).rejects.toThrow(NotFoundError);
        expect(mockBugRepository.findById).toHaveBeenCalledWith('non-existing-id');
        expect(mockBugRepository.delete).not.toHaveBeenCalled();

    })

})