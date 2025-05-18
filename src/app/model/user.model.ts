export type UserType = 'admin' | 'client' | 'customer' | 'driver';

export interface User {
  id: number;
  email: string;
  password: string;
  userType: UserType;
}
