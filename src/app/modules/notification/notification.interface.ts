import {  Types } from 'mongoose';


export interface TNotification  {
  title?: string;
  message: string;
  receiver: Types.ObjectId;
  reference?: Types.ObjectId;
  read: boolean;
  type:  string;
  data?: any;
}
