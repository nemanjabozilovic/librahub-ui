import { useState } from 'react';
import type { UserDetails } from '../types';

export type UserActionType = 'disable' | null;

export const useUserState = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [actionType, setActionType] = useState<UserActionType>(null);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const openAction = (type: UserActionType, user?: UserDetails) => {
    setActionType(type);
    if (user) {
      setSelectedUser(user);
    }
  };

  const closeAction = () => {
    setActionType(null);
    setSelectedUser(null);
  };

  const toggleExpanded = (userId: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return {
    showCreateForm,
    setShowCreateForm,
    selectedUser,
    setSelectedUser,
    actionType,
    setActionType,
    expandedUserId,
    setExpandedUserId,
    searchQuery,
    setSearchQuery,
    openAction,
    closeAction,
    toggleExpanded,
  };
};

