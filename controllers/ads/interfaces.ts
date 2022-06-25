import { Decorate } from '../../common/interfaces';

import {
  IAdCreateParams,
  IAdFindParams,
  IAdSoftDeleteParams,
  IAdUpdateParams,
} from '../../models/database/repository/Ad/interfaces';

export type CreateAdRequest = Decorate<{
  payload: IAdCreateParams;
}>;

export type FindAdRequest = Decorate<{
  query: IAdFindParams;
}>;

export type UpdateAdRequest = Decorate<{
  payload: IAdUpdateParams;
}>;
export type SoftDeleteAd = Decorate<{ params: IAdSoftDeleteParams }>;
