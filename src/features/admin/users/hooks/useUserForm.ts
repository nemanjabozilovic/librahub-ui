import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UserDetails } from '../types';
import { updateUserSchema, type UpdateUserFormData } from '../validations';

export const useUserForm = (user: UserDetails | undefined) => {
  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user ? {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || '',
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
      role: (user.roles[0] || 'User') as 'User' | 'Librarian' | 'Admin',
      emailVerified: user.emailVerified,
    } : undefined,
  });

  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
        role: (user.roles[0] || 'User') as 'User' | 'Librarian' | 'Admin',
        emailVerified: user.emailVerified,
      });
    }
  }, [user, form]);

  return form;
};

