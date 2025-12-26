import { AuthLayout } from '../../shared/components/AuthLayout';
import { ForgotPasswordForm } from '../../features/auth/components/ForgotPasswordForm';

export const ForgotPasswordPage = () => {
  return (
    <AuthLayout showLogo={false}>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

