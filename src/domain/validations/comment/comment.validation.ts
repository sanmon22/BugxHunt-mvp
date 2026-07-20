import { Comment } from "../../entities/comment/comment.entity.js";
import { ValidationError } from "../../errors/validation.error.js";

export function validateCommentText(text: string): void {
    if (typeof text !== 'string' || text.trim().length === 0) {
        throw new ValidationError('Comment text cannot be empty', 'text');
    }
    if (text.length < 1) {
        throw new ValidationError('Comment text must be at least 1 character', 'text')
    }
    if (text.length > 500) {
        throw new ValidationError('Comment text cannot exceed 500 characters', 'text');
    }
}

export function validateCommentNotes(notes: string): void {
    if (notes === undefined || notes === null) {
        throw new ValidationError('Notes cannot be undefined or null', 'notes')
    }
    if (typeof notes === 'string' && notes.length > 1000) {
        throw new ValidationError('Notes cannot exceed 1000 characteres', 'notes')
    }
}

export function validateComment(data: Partial<Comment>): void {
    if (data.text !== undefined) {
        validateCommentText(data.text);
    }
    if (data.notes !== undefined) {
        validateCommentNotes(data.notes);
    }
}