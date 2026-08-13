import { Bug } from "../../../domain/entities/bug/bug.entity.js";
import { IBugRepository } from "../../../domain/repositories/bug/bug.repository.js";

export class GetAllBugsUseCase {
    private readonly bugRepository: IBugRepository;

    constructor(bugRepository: IBugRepository) {
        this.bugRepository = bugRepository;
    }

    async execute(): Promise<Bug[]> {
        return this.bugRepository.findAll();
    }
}