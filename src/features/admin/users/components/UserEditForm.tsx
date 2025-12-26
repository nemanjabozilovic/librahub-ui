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
import type { UseFormReturn } from 'react-hook-form';
import type { UpdateUserFormData } from '../validations';
import type { UserDetails } from '../types';

interface UserEditFormProps {
  user: UserDetails;
  form: UseFormReturn<UpdateUserFormData>;
  onSubmit: (data: UpdateUserFormData) => Promise<void>;
  onCancel: () => void;
  isCurrentUser: boolean;
}

export const UserEditForm = ({
  user,
  form,
  onSubmit,
  onCancel,
  isCurrentUser,
}: UserEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = form;

  const isDisabled = isCurrentUser;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit User: {user.displayName}</CardTitle>
        <CardDescription>
          Update user information and roles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                disabled={isDisabled}
              />
              {errors.email && (
                <p className="text-sm text-error mt-1">
                  {errors.email.message}
                </p>
              )}
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="firstName">
                  First Name <span className="text-error">*</span>
                </FieldLabel>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  required
                  disabled={isDisabled}
                />
                {errors.firstName && (
                  <p className="text-sm text-error mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">
                  Last Name <span className="text-error">*</span>
                </FieldLabel>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  required
                  disabled={isDisabled}
                />
                {errors.lastName && (
                  <p className="text-sm text-error mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  id="phone"
                  {...register('phone')}
                  disabled={isDisabled}
                />
                {errors.phone && (
                  <p className="text-sm text-error mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="dateOfBirth">Date of Birth</FieldLabel>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register('dateOfBirth')}
                  disabled={isDisabled}
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-error mt-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </Field>
            </div>
            {!user.emailVerified && (
              <Field>
                <FieldLabel>Email Verification</FieldLabel>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('emailVerified')}
                    disabled={isDisabled}
                    className="h-4 w-4 rounded border-input text-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <span className="text-sm text-foreground">Verify user email</span>
                </label>
              </Field>
            )}
            <Field>
              <FieldLabel htmlFor="role">
                Role <span className="text-error">*</span>
              </FieldLabel>
              <select
                id="role"
                {...register('role')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
                disabled={isDisabled}
              >
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
            <div className="form-actions">
              {!isCurrentUser && (
                <Button type="submit" className="flex-1" disabled={!isDirty}>
                  Save Changes
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

