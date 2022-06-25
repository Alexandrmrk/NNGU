import { IPagination } from '../../../../common/interfaces';

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export type IUserCreateParams = Pick<IUser, 'firstName' | 'lastName'>;
export type IUserFindParams = Partial<Pick<IUser, 'firstName'>> & IPagination;
