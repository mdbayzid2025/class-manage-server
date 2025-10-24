import { Schema, model } from 'mongoose';
import { TTeacher } from './teacher.interface';

const teacherSchema = new Schema<TTeacher>(
  {
    name: { type: String, required: true },
    nameCode: { type: String },
    designation: { type: String },
    department: { type: String },
    email: { type: String },
    contact: { type: String },
    photo: { type: String },
    remarks: { type: String },
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true, versionKey: false },
);

export const Teacher = model<TTeacher>('Teacher', teacherSchema);
