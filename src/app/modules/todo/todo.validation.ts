import { z } from 'zod';

export const createToDoValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    subject: z.string({ required_error: 'Subject is required' }),
    priority: z.enum(['High', 'Medium', 'Low'], {
      required_error: 'Priority is required',
    }),
    status: z.enum(['Pending', 'Working', 'Done']).optional(),
  }),
});

export const updateToDoValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    subject: z.string().optional(),
    priority: z.enum(['High', 'Medium', 'Low']).optional(),
    status: z.enum(['Pending', 'Working', 'Done']).optional(),
  }),
});
