import { Navigate } from 'react-router-dom';
import { AuthLayout } from '../../shared/components/AuthLayout';
import { CompleteRegistrationForm } from '../../features/auth/components/CompleteRegistrationForm';
import { useCompleteRegistrationPage } from '../../features/auth/hooks/useCompleteRegistrationPage';

export const CompleteRegistrationPage = () => {
  const { token, email } = useCompleteRegistrationPage();

  if (!token) {
    return <Navigate to="/register" replace />;
  }

  return (
    <AuthLayout showLogo={false}>
      <CompleteRegistrationForm token={token} email={email || undefined} />
    </AuthLayout>
  );
};

