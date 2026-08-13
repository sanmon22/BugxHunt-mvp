import { beforeEach, describe, expect, test, vi } from "vitest";
import { GetAllBugsUseCase } from "../../../../src/application/use-cases/bug/getAll.bug.use-case.js";

describe('GetAllBugUseCase', () => {
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

    const getAllBugUseCase = new GetAllBugsUseCase(mockBugRepository);

    test('should find and return all Bugs created', async () => {
        const bugs = [
            { id: '1', details: 'Bug one', images: [], references: [], notes: '', createdAt: new Date(), updatedAt: new Date() },
            { id: '2', details: 'Bug two', images: [], references: [], notes: '', createdAt: new Date(), updatedAt: new Date() },
        ];


        mockBugRepository.findAll.mockResolvedValue(bugs);

        const result = await getAllBugUseCase.execute();

        expect(result).toEqual(bugs);


    })
})