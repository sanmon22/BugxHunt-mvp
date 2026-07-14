import { Bug } from "./bug.entity.js";
import { validateBug } from "../../validations/bug.validation.js";

export type CreateBugInput = Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>;

export function createBug(data: CreateBugInput): Bug {
    validateBug(data);

    return {
        id: crypto.randomUUID(),
        details: data.details,
        images: data.images ?? [],
        references: data.references ?? [],
        notes: data.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}