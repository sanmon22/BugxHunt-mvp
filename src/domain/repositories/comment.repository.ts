import { Comment } from '../entities/comment.entity.js';

export interface ICommentRepository {
  findAll(): Promise<Comment[]>;
  findById(id: string): Promise<Comment | null>;
  create(comment: Omit<Comment, 'id'>): Promise<Comment>;
  update(id: string, data: Partial<Comment>): Promise<Comment | null>;
  delete(id: string): Promise<boolean>;
}
