export class NotFoundError extends Error {
    readonly entity?: string;
    readonly id?: string;

    constructor(message: string, entity?: string, id?: string) {
        super(message);
        this.name = 'NotFoundError';
        this.entity = entity;
        this.id = id;
    }
}