import { IUser } from '../User/interfaces';

export interface ISession {
  id: number;
  token: string;
  user: IUser;
}

export type ISignupParams = Pick<
  IUser,
  'firstName' | 'lastName' | 'login' | 'password'
>;
