import { Bug } from "../../../domain/entities/bug/bug.entity.js";
import { NotFoundError } from "../../../domain/errors/not-found.error.js";
import { IBugRepository } from "../../../domain/repositories/bug/bug.repository.js";
import { validateBug } from "../../../domain/validations/bug/bug.validation.js";

export class UpdateBugUseCase {
    private readonly bugRepository: IBugRepository;

    constructor(bugRepository: IBugRepository) {
        this.bugRepository = bugRepository;
    }

    async execute(id: string, data: Partial<Bug>): Promise<Bug> {
        const bugFound = await this.bugRepository.findById(id);

        if (!bugFound) {
            throw new NotFoundError(`Bug not found with id: ${id}`, 'Bug', id);
        }

        validateBug(data);

        return this.bugRepository.update(id, data) as Promise<Bug>;
    }
}