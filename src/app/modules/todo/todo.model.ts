import { Schema, model } from 'mongoose';
import { TToDo } from './todo.interface';

const todoSchema = new Schema<TToDo>(
  {
    title: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Working', 'Done'],
      default: 'Pending',
    },
  },
  { timestamps: true, versionKey: false },
);

export const ToDo = model<TToDo>('Todo', todoSchema);
