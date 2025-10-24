import { Types } from 'mongoose';

export interface TToDo {
  title: string;
  startDate?: Date;
  endDate?: Date;
  subject: Types.ObjectId;
  priority: 'High' | 'Medium' | 'Low';
  status?: 'Pending' | 'Working' | 'Done';
}
