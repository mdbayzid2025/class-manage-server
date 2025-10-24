import express from 'express';
import { NotificationController } from './notification.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

// 🔹 Super admin endpoints
router.get(
  '/super-admin',
  auth(USER_ROLES.SUPER_ADMIN),
  NotificationController.superAdminNotifications,
);

router.patch(
  '/super-admin/read',
  auth(USER_ROLES.SUPER_ADMIN),
  NotificationController.superAdminReadNotification,
);

router.patch(
  '/super-admin/:id/read',
  auth(USER_ROLES.SUPER_ADMIN),
  NotificationController.adminReadNotificationById,
);

router.post(
  '/super-admin/notify',
  auth(USER_ROLES.SUPER_ADMIN),
  NotificationController.sendNotifyUsers,
);

// 🔹 General user endpoints
router.get(
  '/',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  NotificationController.getUserNotifications,
);

router.patch(
  '/read',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  NotificationController.readUserNotifications,
);

// 🔹 Delete notifications
router.delete(
  '/:notificationId',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  NotificationController.deleteNotificationById,
);

router.delete(
  '/',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  NotificationController.deleteAllNotifications,
);

export const NotificationRoutes = router;
