import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { createAssignmentValidation, updateAssignmentValidation } from './assignment.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';
import { AssignmentController } from './assignment.controlller';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
  AssignmentController.getAllAssignments,
);

router.get(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
  AssignmentController.getAssignmentById,
);

router.post(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(createAssignmentValidation),
  AssignmentController.createAssignment,
);

router.patch(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(updateAssignmentValidation),
  AssignmentController.updateAssignment,
);

router.delete(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN),
  AssignmentController.deleteAssignment,
);

export const AssignmentRoutes = router;
