import { Bug } from '../entities/bug/bug.entity.js';

export interface IBugRepository {
  findAll(): Promise<Bug[]>;
  findById(id: string): Promise<Bug | null>;
  create(bug: Bug): Promise<Bug>;
  update(id: string, data: Partial<Bug>): Promise<Bug | null>;
  delete(id: string): Promise<boolean>;
}
