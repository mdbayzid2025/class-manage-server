import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { createCalendarValidation, updateCalendarValidation } from './calendar.validation';
import auth from '../../middlewares/auth';
import { CalendarController } from './calendar.controller';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

router.get('/', CalendarController.getCalendarData);
router.get('/:id', CalendarController.getScheduledEventsById);
router.get('/single/:id', CalendarController.getSingleCalendar);

router.post(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(createCalendarValidation),
  CalendarController.createCalendarEvent
);

router.patch(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(updateCalendarValidation),
  CalendarController.updateCalendarEvent
);

router.delete(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  CalendarController.deleteCalendarEvent
);

export const CalendarRoutes = router;
