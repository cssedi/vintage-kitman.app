export interface UserManagerReponse {
    token: string;
    Message?: string;
    isSuccess: boolean;
    Date: Date;
    username?: string;
    name?: string;
    password?: string;
    BirthDate: Date;
    email?: string;
    surname: string;
  }