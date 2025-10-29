import express from 'express';
import { EventController } from './event.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createEventValidation, updateEventValidation } from './event.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  EventController.getAllEvents,
);

router.get(
  '/:id',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  EventController.getEventById,
);

router.post(
  '/',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(createEventValidation),
  EventController.createEvent,
);

router.patch(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(updateEventValidation),
  EventController.updateEvent,
);

router.delete(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN),
  EventController.deleteEvent,
);

export const EventRoutes = router;
