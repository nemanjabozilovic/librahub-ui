import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { UserPlus } from 'lucide-react';
import type { CreateUserRequest } from '../types';
import { createUserSchema, type CreateUserFormData } from '../validations';

interface CreateUserFormProps {
  onSubmit: (data: CreateUserRequest) => Promise<void>;
  onCancel: () => void;
}

export const CreateUserForm = ({ onSubmit, onCancel }: CreateUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  const handleFormSubmit = async (data: CreateUserFormData) => {
    await onSubmit(data as CreateUserRequest);
    reset();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create New User</CardTitle>
        <CardDescription>
          A verification email will be sent to the user
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">
                Email <span className="text-error">*</span>
              </FieldLabel>
              <Input
                id="email"
                type="email"
                {...register('email')}
                required
              />
              {errors.email && (
                <p className="text-sm text-error mt-1">
                  {errors.email.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="role">
                Role <span className="text-error">*</span>
              </FieldLabel>
              <select
                id="role"
                {...register('role')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Select a role</option>
                <option value="User">User</option>
                <option value="Librarian">Librarian</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.role && (
                <p className="text-sm text-error mt-1">
                  {errors.role.message}
                </p>
              )}
            </Field>
            <Field>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create User
                </Button>
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

