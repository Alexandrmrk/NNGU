import { Decorate } from '../../common/interfaces';

import {
  IUserCreateParams,
  IUserFindParams,
} from '../../models/database/repository/User/interfaces';

export type CreateTestRequest = Decorate<{
  payload: IUserCreateParams;
}>;

export type FindTestRequest = Decorate<{
  query: IUserFindParams;
}>;
