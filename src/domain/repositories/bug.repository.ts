import { Bug } from '../entities/bug.entity.js';

export interface IBugRepository {
  findAll(): Promise<Bug[]>;
  findById(id: string): Promise<Bug | null>;
  create(bug: Omit<Bug, 'id'>): Promise<Bug>;
  update(id: string, data: Partial<Bug>): Promise<Bug | null>;
  delete(id: string): Promise<boolean>;
}
