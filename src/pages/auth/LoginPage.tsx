import { AuthLayout } from '../../shared/components/AuthLayout';
import { LoginForm } from '../../features/auth/components/LoginForm';
import { useLoginPage } from '../../features/auth/hooks/useLoginPage';

export const LoginPage = () => {
  useLoginPage();

  return (
    <AuthLayout logoSize="large">
      <LoginForm />
    </AuthLayout>
  );
};

