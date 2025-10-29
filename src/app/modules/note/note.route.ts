import express from 'express';

import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { NoteValidation } from './note.validation';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLES } from '../user/user.constant';
import noteController from './note.controller';

const router = express.Router();

// Create note
router.post(
  '/',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
  fileUploadHandler(),
  validateRequest(NoteValidation.createNoteZodSchema),
  noteController.createNote
);

// Get all notes
router.get(
  '/',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  noteController.getAllNotes
);

// Get note by ID
router.get(
  '/:id',
  auth(USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  noteController.getNoteById
);

// Update note
router.patch(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  fileUploadHandler(),
  validateRequest(NoteValidation.updateNoteZodSchema),
  noteController.updateNote
);

// Delete note
router.delete(
  '/:id',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  noteController.deleteNote
);

export const NoteRoutes = router;
