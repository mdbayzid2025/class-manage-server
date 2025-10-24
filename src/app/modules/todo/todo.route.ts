import express from 'express';
import { ToDoController } from './todo.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createToDoValidation, updateToDoValidation } from './todo.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  ToDoController.getAllToDos,
);

router.get(
  '/:id',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  ToDoController.getToDoById,
);

router.post(
  '/',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(createToDoValidation),
  ToDoController.createToDo,
);

router.patch(
  '/:id',
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  validateRequest(updateToDoValidation),
  ToDoController.updateToDo,
);

router.delete(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN),
  ToDoController.deleteToDo,
);

export const ToDoRoutes = router;
