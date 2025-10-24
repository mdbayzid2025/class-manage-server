import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { NotificationService } from './notification.service';

// 🔹 Super admin notifications
const superAdminNotifications = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.superAdminNotificationsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Super admin notifications retrieved successfully',
    data: result,
  });
});

const superAdminReadNotification = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.superAdminReadNotificationToDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All super admin notifications marked as read',
    data: result,
  });
});

const adminReadNotificationById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NotificationService.adminReadNotificationByIdToDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Notification marked as read successfully',
    data: result,
  });
});

const sendNotifyUsers = catchAsync(async (req: Request, res: Response) => {
  const notificationData = req.body;
  const result = await NotificationService.sendNotifyUsersToDB(notificationData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: notificationData.receiver
      ? 'Notification successfully sent to the selected user.'
      : 'Notification successfully sent to all users.',
    data: result,
  });
});

// 🔹 General user notifications
const getUserNotifications = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await NotificationService.getUsersNotificationsFromDB(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User notifications retrieved successfully',
    data: result,
  });
});

const readUserNotifications = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await NotificationService.readUsersNotificationToDB(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User notifications marked as read',
    data: result,
  });
});

// 🔹 Delete notifications
const deleteNotificationById = catchAsync(async (req: Request, res: Response) => {
  const { notificationId } = req.params;
  const user = req.user;
  const result = await NotificationService.deleteNotificationByIdFromDB(notificationId, user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Notification deleted successfully',
    data: result,
  });
});

const deleteAllNotifications = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await NotificationService.deleteAllNotificationsFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All notifications deleted successfully',
    data: result,
  });
});

export const NotificationController = {
  superAdminNotifications,
  superAdminReadNotification,
  adminReadNotificationById,
  sendNotifyUsers,
  getUserNotifications,
  readUserNotifications,
  deleteNotificationById,
  deleteAllNotifications,
};
