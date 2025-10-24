import { model, Schema } from 'mongoose';
import { TNotification } from './notification.interface';
import { NOTIFICATION_TYPE } from './notification.constant';

const notificationSchema = new Schema<TNotification>(
  {
    title: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    reference: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
    },    
    type: {
      type: String,
      default: ''
    },
    data: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Notification = model<TNotification>(
  'Notification',
  notificationSchema,
);
