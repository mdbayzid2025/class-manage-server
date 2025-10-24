import { Schema, model } from 'mongoose';
import { TEvent } from './event.interface';

const eventSchema = new Schema<TEvent>(
  {
    eventTitle: { type: String, required: true },
    date: { type: Date },
    time: { type: String },
    eventType: {
      type: String,
      // You can later uncomment the enum if you want controlled event types
      // enum: ['Practical Exam', 'Lab Test', 'Assignment Submission', 'Meeting', 'Class Test', 'Other'],
    },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
    location: { type: String },
    description: { type: String },
  },
  { timestamps: true, versionKey: false },
);

export const Event = model<TEvent>('Event', eventSchema);
