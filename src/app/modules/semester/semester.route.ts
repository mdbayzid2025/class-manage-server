import express from 'express';
import { SemesterController } from './semester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createSemesterValidation, updateSemesterValidation } from './semester.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(createSemesterValidation),
  SemesterController.createSemester,
);

router.get('/', auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER), SemesterController.getAllSemesters);

router.get('/:id', auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER), SemesterController.getSemesterById);

router.patch(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(updateSemesterValidation),
  SemesterController.updateSemester,
);

router.delete(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN),
  SemesterController.deleteSemester,
);

export const SemesterRoutes = router;
