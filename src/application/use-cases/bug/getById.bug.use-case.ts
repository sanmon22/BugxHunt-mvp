import { Bug } from "../../../domain/entities/bug/bug.entity.js";
import { NotFoundError } from "../../../domain/errors/not-found.error.js";
import { IBugRepository } from "../../../domain/repositories/bug/bug.repository.js";

export class GetByIdBugUseCase {
    private readonly bugRepository: IBugRepository;

    constructor(bugRepository: IBugRepository) {
        this.bugRepository = bugRepository;
    }

    async execute(id: string): Promise<Bug> {
        const bug = await this.bugRepository.findById(id);

        if (!bug) {
            throw new NotFoundError(`Bug not found with id: ${id}`, 'Bug', id)
        }

        return bug;
    }
}