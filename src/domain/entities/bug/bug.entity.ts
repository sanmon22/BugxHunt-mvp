export interface Bug {
  id: string;
  details: string;
  images: string[]; // Array of URLs or paths
  references: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}
