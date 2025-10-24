import { z } from 'zod';

export const createAssignmentValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    subject: z.string({ required_error: 'Subject is required' }),
    submissionDate: z.string({ required_error: 'Submission date is required' }),
    time: z.string({ required_error: 'Time is required' }),
    detailedInstructions: z.string({ required_error: 'Instructions required' }),
    attached: z.string().optional(),
  }),
});

export const updateAssignmentValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    subject: z.string().optional(),
    submissionDate: z.string().optional(),
    time: z.string().optional(),
    detailedInstructions: z.string().optional(),
    attached: z.string().optional(),
  }),
});
