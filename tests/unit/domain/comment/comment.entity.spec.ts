import { describe, expect, test } from "vitest";
import { createComment } from "../../../../src/domain/entities/comment/comment.factory.ts";
import { ValidationError } from "../../../../src/domain/errors/validation.error.ts";


describe('Comment Entity Invariants', () => {
    test('Should create a valid Comment entity instance with correct properties', () => {

        const commentEntity = {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            notes: ''
        }

        const comment = createComment(commentEntity);

        expect(comment).toHaveProperty('id');
        expect(comment.id).toBeTypeOf('string');
        expect(comment.text).toBe(commentEntity.text);
        expect(comment.notes).toBe(commentEntity.notes);
        expect(comment.createdAt).toBeInstanceOf(Date);
        expect(comment.updatedAt).toBeInstanceOf(Date);

    })

    test('Should throw a ValidationError when text field is empty', () => {
        const commentEntity = {
            text: '',
            notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        }

        expect(() => createComment(commentEntity)).toThrow(ValidationError);
    })
})