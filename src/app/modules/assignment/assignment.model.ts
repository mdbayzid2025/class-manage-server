import { Schema, model } from 'mongoose';
import { TAssignment } from './assignment.interface';

const assignmentSchema = new Schema<TAssignment>(
  {
    title: { type: String, required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    submissionDate: { type: Date, required: true },
    time: { type: String, required: true },
    detailedInstructions: { type: String, required: true },
    attached: { type: String },
  },
  { timestamps: true, versionKey: false },
);

export const Assignment = model<TAssignment>('Assignment', assignmentSchema);
