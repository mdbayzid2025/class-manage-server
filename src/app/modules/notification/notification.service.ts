import { JwtPayload } from 'jsonwebtoken';
import { Notification } from './notification.model';

import { User } from '../user/user.model';
import { sendNotifications } from '../../../helpers/notificationHelper';
import ApiError from '../../../errors/ApiError';
import { USER_ROLES } from '../user/user.constant';

interface AdminNotifyInput {
  title: string;
  message: string;
  receiver?: string;
}

// Super admin notifications
const superAdminNotificationsFromDB = async () => {
  return await Notification.find({ type: USER_ROLES.SUPER_ADMIN });
};

const superAdminReadNotificationToDB = async () => {
  return await Notification.updateMany(
    { read: false, type: USER_ROLES.SUPER_ADMIN },
    { $set: { read: true } }    
  );
};

const adminReadNotificationByIdToDB = async (id: string) => {
  return await Notification.findByIdAndUpdate(
    { _id: id, read: false },
    { $set: { read: true } },
    { new: true },
  );
};

// Send notifications to business owners
const sendNotifyUsersToDB = async (input: AdminNotifyInput) => {
  let notificationsToSend: any[] = [];

  if (input.receiver) {
    const user = await User.findOne({ _id: input.receiver, role: USER_ROLES.USER });
    if (!user) throw new ApiError(404, 'Business owner not found');

    notificationsToSend.push({
      title: input.title,
      message: input.message,
      receiver: user._id,
      type: 'ADMIN_NOTIFY',
    });
  } else {
    const owners = await User.find({ role: USER_ROLES.USER });
    notificationsToSend = owners.map(owner => ({
      title: input.title,
      message: input.message,
      receiver: owner._id,
      type: 'ADMIN_NOTIFY',
    }));
  }

  const results = [];
  for (const notification of notificationsToSend) {
    const result = await sendNotifications(notification);
    results.push(result);
  }
  return results;
};

// Business owner notifications
const getUsersNotificationsFromDB = async (user: JwtPayload) => {
  const result = await Notification.find({
    receiver: user.id,
    type: { $in: ['BUSINESS_OWNER', 'SHIFT_CHANGE', 'LEAVE_REQUEST', 'ADMIN_NOTIFY'] },
  });
  const unreadCount = await Notification.countDocuments({ receiver: user.id, read: false });
  return { result, unreadCount };
};

const readUsersNotificationToDB = async (user: JwtPayload) => {
  return await Notification.updateMany({ receiver: user.id, read: false }, { $set: { read: true } });
};

// Delete notifications
const deleteNotificationByIdFromDB = async (notificationId: string, user: JwtPayload) => {
  const result = await Notification.findOneAndDelete({ _id: notificationId, receiver: user.id });
  if (!result) throw new ApiError(404, 'Notification not found or already deleted');
  return result;
};

const deleteAllNotificationsFromDB = async (user: JwtPayload) => {
  const result = await Notification.deleteMany({ receiver: user.id });
  if (!result.deletedCount) throw new ApiError(404, 'No notifications found for this user');
  return { success: true, message: `${result.deletedCount} notification(s) deleted successfully` };
};

export const NotificationService = {
  superAdminNotificationsFromDB,
  superAdminReadNotificationToDB,
  adminReadNotificationByIdToDB,
  sendNotifyUsersToDB,
  getUsersNotificationsFromDB,
  readUsersNotificationToDB,
  deleteNotificationByIdFromDB,
  deleteAllNotificationsFromDB,
};
