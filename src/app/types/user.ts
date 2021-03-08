export default interface User{
  id?: number
  email?: string;
  name?: string;
  contact?: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  token?: string;
  expiresIn?: number;
}
