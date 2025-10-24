import { z } from 'zod';

export const createCalendarValidation = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, 'Title cannot be empty'),

    start: z
      .string({
        required_error: 'Start date is required',
      })
      .datetime({ message: 'Start must be a valid ISO date string' }),

    end: z
      .string()
      .datetime({ message: 'End must be a valid ISO date string' })
      .optional(),

    eventId: z.string().optional(),

    allDay: z.boolean().optional(),

    color: z
      .string()
      .regex(/^#([0-9A-F]{3}){1,2}$/i, 'Invalid color hex code')
      .optional(),

    item: z.string().optional(),

    type: z.enum(
      ['Assignment', 'Event', 'ClassTest', 'Exam', 'Meeting'],
      { required_error: 'Type is required' }
    ),
  }),
});

export const updateCalendarValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    start: z.string().datetime().optional(),
    end: z.string().datetime().optional(),
    allDay: z.boolean().optional(),
    color: z
      .string()
      .regex(/^#([0-9A-F]{3}){1,2}$/i, 'Invalid color hex code')
      .optional(),
    item: z.string().optional(),
    type: z
      .enum(['Assignment', 'Event', 'ClassTest', 'Exam', 'Meeting'])
      .optional(),
  }),
});
