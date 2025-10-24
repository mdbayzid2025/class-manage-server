import { z } from 'zod';

export const createTeacherValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    nameCode: z.string().optional(),
    designation: z.string().optional(),
    department: z.string().optional(),
    email: z.string().email().optional(),
    contact: z.string().optional(),
    photo: z.string().optional(),
    remarks: z.string().optional(),
    subjects: z.array(z.string()).optional(),
    status: z.enum(['Active', 'Inactive']).optional(),
  }),
});

export const updateTeacherValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    nameCode: z.string().optional(),
    designation: z.string().optional(),
    department: z.string().optional(),
    email: z.string().email().optional(),
    contact: z.string().optional(),
    photo: z.string().optional(),
    remarks: z.string().optional(),
    subjects: z.array(z.string()).optional(),
    status: z.enum(['Active', 'Inactive']).optional(),
  }),
});
