import { Bug } from "../../../domain/entities/bug/bug.entity.js";
import { createBug, CreateBugInput } from "../../../domain/entities/bug/bug.factory.js";
import { IBugRepository } from "../../../domain/repositories/bug/bug.repository.js";

export class CreateBugUseCase {
    
    private readonly bugRepository: IBugRepository
    
    constructor(bugRepository: IBugRepository) {
        this.bugRepository = bugRepository;
    }

    async execute(input: CreateBugInput): Promise<Bug> {
        const bug = createBug(input);
        return this.bugRepository.create(bug);
    }
}