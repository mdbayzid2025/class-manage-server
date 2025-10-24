import { Schema, model } from 'mongoose';
import { TSubject } from './subject.interface';

const subjectSchema = new Schema<TSubject>(
  {
    name: { type: String, required: true, trim: true },
    subjectCode: { type: String, trim: true },
    semester: { type: Schema.Types.ObjectId, ref: 'Semester', required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }],
  },
  { timestamps: true, versionKey: false },
);

export const Subject = model<TSubject>('Subject', subjectSchema);
