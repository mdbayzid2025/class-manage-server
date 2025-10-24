import { Schema, model } from 'mongoose';
import { TSemester } from './semester.interface';

const semesterSchema = new Schema<TSemester>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Upcoming'],
      default: 'Active',
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Semester = model<TSemester>('Semester', semesterSchema);
