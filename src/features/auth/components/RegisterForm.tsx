import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { registerThunk } from '../store/authThunks';
import type { RegisterRequest } from '../types/auth.types';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { PasswordInput } from '@/shared/components/ui/password-input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { cn } from '@/shared/lib/utils';
import { registerSchema, type RegisterFormData } from '../validations';

interface RegisterFormProps extends React.ComponentProps<'div'> {
  className?: string;
}

export const RegisterForm = ({ className, ...props }: RegisterFormProps) => {
  const { register: registerUser, isLoading, error } = useAuth();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, phone, dateOfBirth, ...registerData } = data;
    
    const payload: RegisterRequest = {
      ...registerData,
      ...(phone && phone.trim() !== '' && { phone: phone.trim() }),
      ...(dateOfBirth && dateOfBirth.trim() !== '' && { dateOfBirth: dateOfBirth.trim() }),
    };
    
    const result = await registerUser(payload);
    if (registerThunk.fulfilled.match(result)) {
      setRegistrationSuccess(true);
    }
  };

  if (registrationSuccess) {
    return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Registration successful!</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <p className="text-sm text-muted-foreground text-center">
                  We have sent a verification email to your inbox. Please click
                  the link in the email to verify your account.
                </p>
              </Field>
              <Field>
                <FieldDescription className="text-center">
                  Already verified?{' '}
                  <Link to="/login" className="transition-all hover:underline">
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Enter your information to create your account
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
                  disabled={isLoading}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-error mt-1">
                    {errors.email.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">
                  Password <span className="text-error">*</span>
                </FieldLabel>
                <PasswordInput
                  id="password"
                  {...register('password')}
                  disabled={isLoading}
                  required
                />
                {errors.password && (
                  <p className="text-sm text-error mt-1">
                    {errors.password.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password <span className="text-error">*</span>
                </FieldLabel>
                <PasswordInput
                  id="confirmPassword"
                  {...register('confirmPassword')}
                  disabled={isLoading}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-error mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="firstName">
                  First Name <span className="text-error">*</span>
                </FieldLabel>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  disabled={isLoading}
                  required
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
                  disabled={isLoading}
                  required
                />
                {errors.lastName && (
                  <p className="text-sm text-error mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </Field>
              <Field>
                <div className="flex items-center gap-2">
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <span className="text-xs text-muted-foreground">Optional</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  disabled={isLoading}
                />
              </Field>
              <Field>
                <div className="flex items-center gap-2">
                  <FieldLabel htmlFor="dateOfBirth">Date of Birth</FieldLabel>
                  <span className="text-xs text-muted-foreground">Optional</span>
                </div>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register('dateOfBirth')}
                  disabled={isLoading}
                />
              </Field>
              {error && (
                <div className="text-sm text-error bg-destructive/10 p-3 rounded">
                  {error}
                </div>
              )}
              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Registering...' : 'Register'}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="transition-all hover:underline"
                  >
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

