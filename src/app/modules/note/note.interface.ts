import { Document, Model, Types } from 'mongoose';
import { NOTE_PRIORITY } from './note.constant';

export interface INote extends Document {
  title: string;
  description?: string;
  images?: string[];
  documents?: string[];
  tags?: string[];
  priority?: NOTE_PRIORITY | string;
  subject?: Types.ObjectId;
}

export interface NoteModel extends Model<INote> {}
