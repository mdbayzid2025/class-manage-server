import { Types } from 'mongoose';

export interface TAssignment {
  title: string;
  subject: Types.ObjectId;
  submissionDate: Date;
  time: string;
  detailedInstructions: string;
  attached?: string;
}
