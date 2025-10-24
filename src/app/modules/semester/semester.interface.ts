import { Types } from 'mongoose';

export type TSemesterStatus = 'Active' | 'Inactive' | 'Upcoming';

export interface TSemester {
  title: string;
  status: TSemesterStatus;
  subjects: Types.ObjectId[];
}
