import { Bug } from "../entities/bug.entity.js";
import { ValidationError } from "../errors/validation.error.js";

const URL_PATTERN = /^https?:\/\/.+/;
const REFERENCE_PATTERN = /^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/;


export function validateBugDetails(details: string): void {
    if (typeof details !== 'string' || details.trim().length === 0) {
        throw new ValidationError('Bug details cannot be empty.', 'details');
    }
    if (details.length < 10) {
        throw new ValidationError('Bug details must be at least 10 characters long.', 'details');
    }
    if (details.length > 1000) {
        throw new ValidationError('Bug details cannot exceed 1000 characters.', 'details');
    }
}

export function validateBugImages(images: string[]): void {
    if (!Array.isArray(images)) {
        throw new ValidationError('Images must be an array.', 'images');
    }
    
    for (const image of images) {
        if (typeof image !== 'string' || !URL_PATTERN.test(image)) {
            throw new ValidationError(`Each image must be a valid URL. Invalid image: ${image}`, 'images');
        }
    }
}

export function validateBugReferences(references: string[]): void {
    if (!Array.isArray(references)) {
        throw new ValidationError('References must be an array.', 'references');
    }
    
    for (const reference of references) {
        if (typeof reference !== 'string' || reference.trim().length === 0) {
            throw new ValidationError('Each reference must be a non-empty string.', 'references');
        }
        if (!REFERENCE_PATTERN.test(reference)) {
            throw new ValidationError(`Each reference must be alphanumeric and can include hyphens. Invalid reference: ${reference}`, 'references');
        }
    }
}

export function validateBugNotes(notes: string): void {
    if (notes === undefined || notes === null) {
        throw new ValidationError('Notes cannot be undefined or null.', 'notes');
    }
    if (typeof notes === 'string' && notes.length > 2000) {
        throw new ValidationError('Notes cannot exceed 2000 characters.', 'notes');
    }
}

export function validateBug(data: Partial<Bug>): void {
    if (data.details !== undefined) {
        validateBugDetails(data.details);
    }
    if (data.images !== undefined) {
        validateBugImages(data.images);
    }
    if (data.references !== undefined) {
        validateBugReferences(data.references);
    }
    if (data.notes !== undefined) {
        validateBugNotes(data.notes);
    }
}