import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { initializeAuthThunk } from './features/auth/store/authThunks';
import { selectUser, selectAccessToken } from './features/auth/store/authSelectors';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const accessToken = useAppSelector(selectAccessToken);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && accessToken && !user) {
      hasInitialized.current = true;
      dispatch(initializeAuthThunk());
    } else if (!accessToken && !user) {
      hasInitialized.current = true;
    }
  }, [dispatch, accessToken, user]);

  return <AppRoutes />;
}

export default App;

