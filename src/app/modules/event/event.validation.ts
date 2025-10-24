import { z } from 'zod';

export const createEventValidation = z.object({
  body: z.object({
    eventTitle: z.string({ required_error: 'Event title is required' }),
    date: z.string().optional(),
    time: z.string().optional(),
    eventType: z.string().optional(),
    subject: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const updateEventValidation = z.object({
  body: z.object({
    eventTitle: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    eventType: z.string().optional(),
    subject: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
  }),
});
