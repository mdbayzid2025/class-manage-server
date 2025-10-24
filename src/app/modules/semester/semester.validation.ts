import { z } from 'zod';

export const createSemesterValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).trim(),
    status: z.enum(['Active', 'Inactive', 'Upcoming']).optional(),
    subjects: z.array(z.string()).optional(),
  }),
});

export const updateSemesterValidation = z.object({
  body: z.object({
    title: z.string().trim().optional(),
    status: z.enum(['Active', 'Inactive', 'Upcoming']).optional(),
    subjects: z.array(z.string()).optional(),
  }),
});
