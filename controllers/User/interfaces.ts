
import {
  IUserCreateParams,
  IUserFindParams,
} from '../../models/database/repository/interfaces';
import { Decorate } from '../../common';

export type CreateTestRequest = Decorate<{
  payload: IUserCreateParams;
}>;

export type FindTestRequest = Decorate<{
  query: IUserFindParams;
}>;
