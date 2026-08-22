import { User } from "../../../domain/entities/user/user.entity.js";
import { createUser, CreateUserInput } from "../../../domain/entities/user/user.factory.js";
import { IUserRepository } from "../../../domain/repositories/user/user.repository.js";

export class CreateUserUseCase {

    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(input: CreateUserInput): Promise<User> {
        const user = createUser(input);
        return this.userRepository.create(user);
    }

}