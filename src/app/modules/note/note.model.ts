import { Schema, model } from 'mongoose';
import { INote, NoteModel } from './note.interface';

const noteSchema = new Schema<INote, NoteModel>(
  {
    title: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }],
    document: [{ type: String }],
    tags: [{ type: String }],
    priority: { type: String },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
  },
  { timestamps: true }
);

export const Note = model<INote, NoteModel>('Note', noteSchema);
