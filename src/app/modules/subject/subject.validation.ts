import { z } from 'zod';

export const createSubjectValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).trim(),
    subjectCode: z.string().optional(),
    semester: z.string({ required_error: 'Semester ID is required' }),
    teacher: z.string({ required_error: 'Teacher ID is required' }),
    notes: z.array(z.string()).optional(),
    todos: z.array(z.string()).optional(),
    events: z.array(z.string()).optional(),
    assignments: z.array(z.string()).optional(),
  }),
});

export const updateSubjectValidation = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    subjectCode: z.string().optional(),
    semester: z.string().optional(),
    teacher: z.string().optional(),
    notes: z.array(z.string()).optional(),
    todos: z.array(z.string()).optional(),
    events: z.array(z.string()).optional(),
    assignments: z.array(z.string()).optional(),
  }),
});
