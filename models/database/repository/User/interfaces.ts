import { IPagination } from "../interfaces";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  login: string;
  password: string;
}

export type IUserCreateParams = Pick<IUser, 'firstName' | 'lastName'>;
export type IUserFindParams = Partial<Pick<IUser, 'firstName'>> & IPagination;
