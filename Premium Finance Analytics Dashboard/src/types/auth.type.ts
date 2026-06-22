export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  confirm?:string
}

interface User {
  id?: string;
  name: string;
  email: string;
}
export interface RegisterResponse {
  message: string;
  user: User;
}

export interface Login{
  email:string,
  password:string
}

