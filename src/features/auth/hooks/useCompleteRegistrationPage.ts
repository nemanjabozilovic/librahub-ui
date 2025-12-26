import { useSearchParams } from 'react-router-dom';

export const useCompleteRegistrationPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  return {
    token,
    email: email ? decodeURIComponent(email) : null,
  };
};

