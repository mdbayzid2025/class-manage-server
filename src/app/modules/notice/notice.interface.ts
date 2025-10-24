export interface INotice {
  description: string;
  publishDate: Date;
  images?: string[];
  documents?: string[];
  createdAt: Date;
  updatedAt: Date;
}