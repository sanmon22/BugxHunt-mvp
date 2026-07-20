import { Comment } from "./comment.entity.js";
import { validateComment } from "../../validations/comment/comment.validation.js";

export type CreateCommentInput = Omit<Comment, 'id' | 'createdAt' | 'udpatedAt'>;

export function createComment(data: CreateCommentInput): Comment {
    validateComment(data);

    return {
        id: crypto.randomUUID(),
        text: data.text,
        notes: data.notes,
        createdAt: new Date(),
        updatedAt: new Date()
    }
}