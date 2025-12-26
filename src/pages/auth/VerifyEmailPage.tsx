import { useSearchParams, Navigate } from 'react-router-dom';
import { AuthLayout } from '../../shared/components/AuthLayout';
import { VerifyEmailForm } from '../../features/auth/components/VerifyEmailForm';

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return <Navigate to="/register" replace />;
  }

  return (
    <AuthLayout showLogo={false}>
      <VerifyEmailForm token={token} />
    </AuthLayout>
  );
};

