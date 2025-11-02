import { z } from 'zod';
import { USER_ROLES, USER_STATUS, BLOOD_GROUP } from './user.constant';

// Create User validation
export const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    idNo: z.string().optional(),
    contact: z.string().optional(),
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }).min(8),
    profession: z.string().optional(),
    role: z.nativeEnum(USER_ROLES).optional(),
    address: z.object({
      area: z.string().optional(),
      thana: z.string().optional(),
      district: z.string().optional(),
    }).optional(),
    district: z.string().optional(),
    bloodGroup: z.nativeEnum(BLOOD_GROUP).optional(),
    emergencyContact: z.object({
      name: z.string().optional(),
      relation: z.string().optional(),
      mobile: z.string().optional(),
      address: z.string().optional(),
    }).optional(),
    photo: z.string().optional(),
    coverImage: z.string().optional(),
    verified: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    status: z.nativeEnum(USER_STATUS).optional(),
  }),
});

// Update User/Profile validation
export const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    idNo: z.string().optional(),
    contact: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
    profession: z.string().optional(),
    role: z.nativeEnum(USER_ROLES).optional(),
    address: z.object({
      area: z.string().optional(),
      thana: z.string().optional(),
      district: z.string().optional(),
    }).optional(),
    district: z.string().optional(),
    bloodGroup: z.nativeEnum(BLOOD_GROUP).optional(),
    emergencyContact: z.object({
      name: z.string().optional(),
      relation: z.string().optional(),
      mobile: z.string().optional(),
      address: z.string().optional(),
    }).optional(),
    photo: z.string().optional(),
    coverImage: z.string().optional(),
    verified: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    status: z.nativeEnum(USER_STATUS).optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
