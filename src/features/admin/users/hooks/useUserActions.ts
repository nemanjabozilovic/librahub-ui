import { useCallback } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { useAuth } from '../../../auth/hooks/useAuth';
import {
  createUserThunk,
  updateUserThunk,
  disableUserThunk,
  enableUserThunk,
} from '../../store/adminThunks';
import type { CreateUserRequest, UpdateUserRequest, DisableUserRequest } from '../types';
import type { UpdateUserFormData } from '../validations';

interface UseUserActionsParams {
  refreshUsers: (skip?: number, take?: number) => void;
  refreshStatistics: () => void;
  closeAction: () => void;
  setExpandedUserId: (userId: string | null) => void;
}

export const useUserActions = ({
  refreshUsers,
  refreshStatistics,
  closeAction,
  setExpandedUserId,
}: UseUserActionsParams) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAuth();

  const isCurrentUser = useCallback((userId: string) => {
    return currentUser?.userId === userId;
  }, [currentUser]);

  const createUser = useCallback(async (data: CreateUserRequest): Promise<void> => {
    const result = await dispatch(createUserThunk(data));
    if (createUserThunk.fulfilled.match(result)) {
      refreshUsers();
      refreshStatistics();
    }
  }, [dispatch, refreshUsers, refreshStatistics]);

  const updateUser = useCallback(async (userId: string, formData: UpdateUserFormData): Promise<void> => {
    const updateData: UpdateUserRequest = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone || undefined,
      dateOfBirth: formData.dateOfBirth || undefined,
      roles: [formData.role],
      emailVerified: formData.emailVerified,
    };
    const result = await dispatch(updateUserThunk({ userId, data: updateData }));
    if (updateUserThunk.fulfilled.match(result)) {
      setExpandedUserId(null);
      refreshUsers();
      refreshStatistics();
    }
  }, [dispatch, refreshUsers, refreshStatistics, setExpandedUserId]);

  const disableUser = useCallback(async (userId: string, data: DisableUserRequest): Promise<void> => {
    const result = await dispatch(disableUserThunk({ userId, data }));
    if (disableUserThunk.fulfilled.match(result)) {
      closeAction();
      refreshUsers();
      refreshStatistics();
    }
  }, [dispatch, refreshUsers, refreshStatistics, closeAction]);

  const enableUser = useCallback(async (userId: string): Promise<void> => {
    const result = await dispatch(enableUserThunk(userId));
    if (enableUserThunk.fulfilled.match(result)) {
      refreshUsers();
      refreshStatistics();
    }
  }, [dispatch, refreshUsers, refreshStatistics]);

  return {
    isCurrentUser,
    createUser,
    updateUser,
    disableUser,
    enableUser,
  };
};

