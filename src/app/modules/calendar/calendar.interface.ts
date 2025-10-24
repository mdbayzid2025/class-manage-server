import { Schema, Types } from "mongoose";

export interface ICalendarEvent {
  title: string;
  start?: Date;
  eventId?: string;
  end?: Date;
  allDay?: boolean;
  color?: string;
  item?: Types.ObjectId;
  type: 'Assignment' | 'Event' | 'ClassTest' | 'Exam' | 'Meeting';
}

