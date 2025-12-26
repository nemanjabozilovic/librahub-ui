import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { resetPasswordThunk } from '../store/authThunks';
import { selectAuthLoading, selectAuthError } from '../store/authSelectors';
import { Button } from '@/shared/components/ui/button';
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
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { cn } from '@/shared/lib/utils';
import { resetPasswordSchema, type ResetPasswordFormData } from '../validations';

interface ResetPasswordFormProps extends React.ComponentProps<'div'> {
  className?: string;
  token: string;
}

export const ResetPasswordForm = ({
  className,
  token,
  ...props
}: ResetPasswordFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    const result = await dispatch(
      resetPasswordThunk({
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })
    );
    if (resetPasswordThunk.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset your password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="newPassword">
                  New Password <span className="text-error">*</span>
                </FieldLabel>
                <PasswordInput
                  id="newPassword"
                  {...register('newPassword')}
                  disabled={isLoading}
                  required
                />
                {errors.newPassword && (
                  <p className="text-sm text-error mt-1">
                    {errors.newPassword.message}
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
              {error && (
                <div className="text-sm text-error bg-destructive/10 p-3 rounded">
                  {error}
                </div>
              )}
              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

