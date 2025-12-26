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
import { cn } from '@/shared/lib/utils';
import {
  completeRegistrationSchema,
  type CompleteRegistrationFormData,
} from '../validations';
import { useCompleteRegistration } from '../hooks/useCompleteRegistration';

interface CompleteRegistrationFormProps extends React.ComponentProps<'div'> {
  className?: string;
  token: string;
  email?: string;
}

export const CompleteRegistrationForm = ({
  className,
  token,
  email,
  ...props
}: CompleteRegistrationFormProps) => {
  const {
    isLoading,
    error,
    registrationComplete,
    onSubmit,
    goToLogin,
  } = useCompleteRegistration({ token });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteRegistrationFormData>({
    resolver: zodResolver(completeRegistrationSchema),
  });

  if (registrationComplete) {
    return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Registration complete!</CardTitle>
            <CardDescription>
              Your profile has been successfully updated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <p className="text-sm text-muted-foreground text-center">
                  You can now log in to your account.
                </p>
              </Field>
              <Field>
                <Button
                  type="button"
                  onClick={goToLogin}
                  className="w-full"
                >
                  Go to Login
                </Button>
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
          <CardTitle className="text-xl">Complete your registration</CardTitle>
          <CardDescription>
            Please provide your personal information to complete your account
            setup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <FieldGroup>
              {email && (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                  />
                </Field>
              )}
              <Field>
                <FieldLabel htmlFor="firstName">
                  First Name <span className="text-error">*</span>
                </FieldLabel>
                <Input
                  id="firstName"
                  type="text"
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
                  type="text"
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
                  placeholder="+1234567890"
                />
                {errors.phone && (
                  <p className="text-sm text-error mt-1">
                    {errors.phone.message}
                  </p>
                )}
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
                {errors.dateOfBirth && (
                  <p className="text-sm text-error mt-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </Field>
              {error && (
                <div className="text-sm text-error bg-destructive/10 p-3 rounded">
                  {error}
                </div>
              )}
              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Completing...' : 'Complete Registration'}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

