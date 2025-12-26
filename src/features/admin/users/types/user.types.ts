export interface CreateUserRequest {
  email: string;
  role: 'User' | 'Librarian' | 'Admin';
}

export interface AssignRoleRequest {
  role: 'User' | 'Librarian' | 'Admin';
}

export interface DisableUserRequest {
  reason: string;
}

export interface UpdateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  roles: string[];
  emailVerified?: boolean;
}

export interface UserDetails {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  roles: string[];
  emailVerified: boolean;
  status: 'Active' | 'Disabled' | 'Pending';
  createdAt: string;
  lastLoginAt: string | null;
  phone?: string;
  dateOfBirth?: string;
  avatar?: string;
}

export interface UsersListResponse {
  users: UserDetails[];
  totalCount: number;
}

