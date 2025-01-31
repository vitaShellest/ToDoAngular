export interface UserInterface {
  id: string;
  name: string;
  password: string;
  email: string;
  role: role;
  active: boolean;
}
export type role = 'Admin' | 'User';
