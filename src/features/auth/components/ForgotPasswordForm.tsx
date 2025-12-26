import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { forgotPasswordThunk } from '../store/authThunks';
import { selectAuthLoading, selectAuthError } from '../store/authSelectors';
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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { cn } from '@/shared/lib/utils';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../validations';

interface ForgotPasswordFormProps extends React.ComponentProps<'div'> {
  className?: string;
}

export const ForgotPasswordForm = ({
  className,
  ...props
}: ForgotPasswordFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const result = await dispatch(forgotPasswordThunk(data.email));
    if (forgotPasswordThunk.fulfilled.match(result)) {
      setEmailSent(true);
    }
  };

  if (emailSent) {
    return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Check your email</CardTitle>
            <CardDescription>
              We have sent you a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <p className="text-sm text-muted-foreground text-center">
                  If an account exists with that email, we have sent a password
                  reset link. Please check your inbox and follow the
                  instructions.
                </p>
              </Field>
              <Field>
                <Button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full"
                >
                  Back to Login
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
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a reset link
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
              {error && (
                <div className="text-sm text-error bg-destructive/10 p-3 rounded">
                  {error}
                </div>
              )}
              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
                <FieldDescription className="text-center">
                  Remember your password?{' '}
                  <Link to="/login" className="hover:font-bold transition-all">
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

