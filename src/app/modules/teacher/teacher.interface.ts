import { Types } from 'mongoose';

export interface TTeacher {
  name: string;
  nameCode?: string;
  designation?: string;
  department?: string;
  email?: string;
  contact?: string;
  photo?: string;
  remarks?: string;
  subjects?: Types.ObjectId[];
  status?: string;
}
