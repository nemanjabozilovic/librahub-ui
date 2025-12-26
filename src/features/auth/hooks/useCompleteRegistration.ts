import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { completeRegistrationThunk } from '../store/authThunks';
import { selectAuthLoading, selectAuthError } from '../store/authSelectors';
import type { CompleteRegistrationFormData } from '../validations';

interface UseCompleteRegistrationParams {
  token: string;
}

export const useCompleteRegistration = ({ token }: UseCompleteRegistrationParams) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const onSubmit = useCallback(
    async (data: CompleteRegistrationFormData) => {
      const result = await dispatch(
        completeRegistrationThunk({
          token,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone && data.phone.trim() !== '' ? data.phone : undefined,
          dateOfBirth:
            data.dateOfBirth && data.dateOfBirth.trim() !== ''
              ? data.dateOfBirth
              : undefined,
        })
      );
      if (completeRegistrationThunk.fulfilled.match(result)) {
        setRegistrationComplete(true);
      }
    },
    [dispatch, token]
  );

  const goToLogin = useCallback(() => {
    navigate('/login', { replace: true });
  }, [navigate]);

  return {
    isLoading,
    error,
    registrationComplete,
    onSubmit,
    goToLogin,
  };
};

