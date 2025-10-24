import express from 'express';
import { TeacherController } from './teacher.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createTeacherValidation, updateTeacherValidation } from './teacher.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router.get('/', auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER), TeacherController.getAllTeachers);

router.get('/:id', auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER), TeacherController.getTeacherById);

router.post(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),  
  fileUploadHandler(),
  validateRequest(createTeacherValidation),
  TeacherController.createTeacher,
);

router.patch(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),  
  validateRequest(updateTeacherValidation),
  TeacherController.updateTeacher,
);

router.delete('/:id', auth(USER_ROLES.SUPER_ADMIN), TeacherController.deleteTeacher);

export const TeacherRoutes = router;
