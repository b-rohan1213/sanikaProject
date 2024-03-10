export interface RegisterUser {
  fullName: string;
  email: string;
  contactNo: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface UserDetails {
  fullName: string;
  email: string;
  contactNo: string;
}
