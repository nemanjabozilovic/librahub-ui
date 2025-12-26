import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { verifyEmailThunk, resendVerificationEmailThunk } from '../store/authThunks';
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
import { resendEmailSchema, type ResendEmailFormData } from '../validations';

interface VerifyEmailFormProps extends React.ComponentProps<'div'> {
  className?: string;
  token: string;
}

export const VerifyEmailForm = ({
  className,
  token,
  ...props
}: VerifyEmailFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const [verificationStatus, setVerificationStatus] = useState<
    'pending' | 'success' | 'error'
  >('pending');
  const [emailResent, setEmailResent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ResendEmailFormData>({
    resolver: zodResolver(resendEmailSchema),
  });

  useEffect(() => {
    const verifyEmail = async () => {
      const result = await dispatch(verifyEmailThunk(token));
      if (verifyEmailThunk.fulfilled.match(result)) {
        setVerificationStatus('success');
      } else {
        setVerificationStatus('error');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, dispatch]);

  if (verificationStatus === 'success') {
    return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Email verified!</CardTitle>
            <CardDescription>
              Your email has been successfully verified
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
                  onClick={() => navigate('/login', { replace: true })}
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

  const handleResendEmail = async (data: ResendEmailFormData) => {
    const result = await dispatch(
      resendVerificationEmailThunk({ email: data.email })
    );
    if (resendVerificationEmailThunk.fulfilled.match(result)) {
      setEmailResent(true);
    }
  };

  if (verificationStatus === 'error') {
    return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Verification failed</CardTitle>
            <CardDescription>
              Unable to verify your email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            {emailResent ? (
              <FieldGroup>
                <Field>
                  <p className="text-sm text-green-600 bg-green-50 p-3 rounded text-center">
                    Verification email has been sent. Please check your inbox.
                  </p>
                </Field>
                <Field>
                  <FieldDescription className="text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="hover:font-bold transition-all">
                      Sign in
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            ) : (
              <form onSubmit={handleSubmit(handleResendEmail)}>
                <FieldGroup>
                  <Field>
                    {error && (
                      <div className="text-sm text-error bg-destructive/10 p-3 rounded text-center">
                        {error}
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      The verification link may have expired or is invalid. Please
                      enter your email address to receive a new verification email.
                    </p>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      disabled={isLoading}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-sm text-error mt-1">
                        {formErrors.email.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? 'Sending...' : 'Resend Verification Email'}
                    </Button>
                    <FieldDescription className="text-center">
                      Already have an account?{' '}
                      <Link to="/login" className="hover:font-bold transition-all">
                        Sign in
                      </Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verifying your email</CardTitle>
          <CardDescription>Please wait...</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <div className="flex items-center justify-center py-4">
                {isLoading && (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                )}
              </div>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
};

