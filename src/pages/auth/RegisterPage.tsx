import { AuthLayout } from '../../shared/components/AuthLayout';
import { RegisterForm } from '../../features/auth/components/RegisterForm';

export const RegisterPage = () => {
  return (
    <AuthLayout showLogo={false}>
      <RegisterForm />
    </AuthLayout>
  );
};

