import { Schema, model } from 'mongoose';
import { ICalendarEvent } from './calendar.interface';



const calendarEventSchema = new Schema<ICalendarEvent>(
  {
    title: { type: String, required: true },
    start: { type: Date, required: true },
    eventId: { type: String },
    end: { type: Date },
    allDay: { type: Boolean, default: false },
    color: { type: String, default: '#3174ad' },
    item: { type: Schema.Types.ObjectId, refPath: 'type' },
    type: {
      type: String,
      enum: ['Assignment', 'Event', 'ClassTest', 'Exam', 'Meeting'],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Calendar = model<ICalendarEvent>('CalendarEvent', calendarEventSchema);
