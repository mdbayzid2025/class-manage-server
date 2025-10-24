import express from 'express';
import { SubjectController } from './subject.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createSubjectValidation, updateSubjectValidation } from './subject.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(createSubjectValidation),
  SubjectController.createSubject,
);

router.get('/', auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), SubjectController.getAllSubjects);

router.get('/:id', auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), SubjectController.getSubjectById);

router.patch(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(updateSubjectValidation),
  SubjectController.updateSubject,
);

router.delete('/:id', auth(USER_ROLES.SUPER_ADMIN), SubjectController.deleteSubject);

export const SubjectRoutes = router;
