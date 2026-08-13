import { NotFoundError } from "../../../domain/errors/not-found.error.js";
import { IBugRepository } from "../../../domain/repositories/bug/bug.repository.js";

export class DeleteBugUseCase {
    private readonly bugRepository: IBugRepository;

    constructor(bugRepository: IBugRepository) {
        this.bugRepository = bugRepository;
    }

    async execute(id: string): Promise<boolean> {
        const bugFound = await this.bugRepository.findById(id);

        if (!bugFound) {
            throw new NotFoundError(`Bug not found with id: ${id}`, 'Bug', id);
        }

        return this.bugRepository.delete(id);
    }
}