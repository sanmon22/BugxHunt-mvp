import { Comment } from '../../entities/comment/comment.entity.js';

export interface ICommentRepository {
  findAll(): Promise<Comment[]>;
  findById(id: string): Promise<Comment | null>;
  create(comment: Comment): Promise<Comment>;
  update(id: string, data: Partial<Comment>): Promise<Comment | null>;
  delete(id: string): Promise<boolean>;
}
