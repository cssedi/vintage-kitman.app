export interface ResetPasswordVM {
    id: string;
    token: string;
    password: string;
    confirmPassword: string;
    message?: string;
  }