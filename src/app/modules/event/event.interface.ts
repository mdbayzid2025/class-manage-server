import { Types } from 'mongoose';

export interface TEvent {
  eventTitle: string;
  date?: Date;
  time?: string;
  eventType?: string;
  subject?: Types.ObjectId;
  location?: string;
  description?: string;
}
