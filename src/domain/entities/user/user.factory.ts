import { validateUser } from "../../validations/user/user.validation.js";
import { User } from "./user.entity.js";

export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export function createUser(data: CreateUserInput): User {
    validateUser(data);

    return {
        id: crypto.randomUUID(),
        username: data.username,
        email: data.email,
        password: data.password,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}