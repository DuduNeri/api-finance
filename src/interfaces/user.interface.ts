export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUserResponse{
  _id: string;
  name: string;
  email: string;
  password: string
  createdAt: Date;
  updatedAt: Date;
}
