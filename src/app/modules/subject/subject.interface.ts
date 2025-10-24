import { Types } from 'mongoose';

export interface TSubject {
  name: string;
  subjectCode?: string;
  semester: Types.ObjectId;
  teacher: Types.ObjectId;
  notes?: Types.ObjectId[];
  todos?: Types.ObjectId[];
  events?: Types.ObjectId[];
  assignments?: Types.ObjectId[];
}
