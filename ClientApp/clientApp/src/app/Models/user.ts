export interface RegisterUser {
  name: string;
  email: string;
  contactNo: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface UserDetails {
  name: string;
  email: string;
  userType: string;
}
