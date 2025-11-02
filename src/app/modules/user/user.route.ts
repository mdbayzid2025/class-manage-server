import express, { Request, Response, NextFunction } from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { USER_ROLES } from './user.constant';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

// Create user
router.post(
  '/',  
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

// Get all users
router.get(
  '/',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
  UserController.getAllUsers
);

// Get profile of logged-in user
router.get(
  '/profile',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN,),
  UserController.getProfile
);

// Get profile of logged-in user
router.patch(
  '/profile',
   
  auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN,),
  fileUploadHandler(),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateProfile
);

// Get single user by ID
router.get(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
  UserController.getUserById
);

// Update user by admin
router.patch(
  '/update',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
  fileUploadHandler(),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

// // Update own profile
// router.patch(
//   '/profile/update',
//   auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
//   validateRequest(UserValidation.updateUserZodSchema),
//   UserController.updateProfile
// );

// Delete user
router.delete(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN),
  UserController.deleteUser
);

export const UserRoutes = router;
