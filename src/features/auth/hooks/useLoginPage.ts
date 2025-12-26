import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { clearError } from '../store/authSlice';

export const useLoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(clearError());
    
    const token = searchParams.get('token');
    if (token) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('token');
      const newUrl = newSearchParams.toString() 
        ? `${window.location.pathname}?${newSearchParams.toString()}`
        : window.location.pathname;
      navigate(newUrl, { replace: true });
    }
  }, [dispatch, navigate, searchParams]);
};

