import { useSearchParams, Navigate } from 'react-router-dom';
import { AuthLayout } from '../../shared/components/AuthLayout';
import { ResetPasswordForm } from '../../features/auth/components/ResetPasswordForm';

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <AuthLayout showLogo={false}>
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
};

