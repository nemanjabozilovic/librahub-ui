import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['User', 'Librarian', 'Admin'], {
    required_error: 'Role is required',
  }),
});

export const disableUserSchema = z.object({
  reason: z.string().min(1, 'Reason is required'),
});

export const updateUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  role: z.enum(['User', 'Librarian', 'Admin']),
  emailVerified: z.boolean().optional(),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type DisableUserFormData = z.infer<typeof disableUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

