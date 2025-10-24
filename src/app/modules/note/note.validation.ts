import { z } from 'zod';
import { NOTE_PRIORITY } from './note.constant';

export const createNoteZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string().optional(),
    tags: z.string().optional(), // JSON string array of tags
    priority: z.nativeEnum(NOTE_PRIORITY).optional(),
    subject: z.string({ required_error: 'Subject is required' }),
    images: z.array(z.string()).optional(),
    documents: z.array(z.string()).optional(),
  }),
});

export const updateNoteZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    tags: z.string().optional(), // JSON string array of tags
    priority: z.nativeEnum(NOTE_PRIORITY).optional(),
    subject: z.string().optional(),
    oldImages: z.union([z.array(z.string()), z.string()]).optional(),
    oldDocuments: z.union([z.array(z.string()), z.string()]).optional(),
    images: z.array(z.string()).optional(),
    documents: z.array(z.string()).optional(),
  }),
});

export const NoteValidation = {
  createNoteZodSchema,
  updateNoteZodSchema,
};
