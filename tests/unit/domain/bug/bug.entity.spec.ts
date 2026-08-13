import { describe, expect, test } from "vitest";
import { createBug } from "../../../../src/domain/entities/bug/bug.factory.js";
import { ValidationError } from "../../../../src/domain/errors/validation.error.js";

describe('Bug Entity Invariants', () => {
    test('should create a valid Bug entity instance with correct properties', () => {
        const bugEntity = {
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            images: ['https://example.com/image1.png', 'https://example.com/image2.png'],
            references: ['lorem-ipsum'],
            notes: 'This is a note for the bug entity.'
        };

        const bug = createBug(bugEntity);

        expect(bug).toHaveProperty('id'); 
        expect(bug.id).toBeTypeOf('string');
        expect(bug.details).toBe(bugEntity.details);
        expect(bug.images).toEqual(bugEntity.images);
        expect(bug.references).toEqual(bugEntity.references);
        expect(bug.notes).toBe(bugEntity.notes)
        expect(bug.createdAt).toBeInstanceOf(Date)
        expect(bug.updatedAt).toBeInstanceOf(Date)
    })

    test('should throw a ValidationError when details field is empty', () => {
        const bugEntity = {
            details: "",
            images: [],
            references: [],
            notes: ""
        };

        expect(() => createBug(bugEntity)).toThrow(ValidationError);
    })
})