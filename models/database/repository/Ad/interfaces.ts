import { IPagination } from '../../../../common/interfaces';
import { ICategory, ICategoryIds } from '../Category/interfaces';

interface IAdBase {
  title: string;
  description: string;
  cost: string;
  phone: string;
  address: string;
}

export interface IAdCreateParams extends IAdBase {
  categoryIds?: number[];
}

export interface IAdFindParams extends IPagination {
  title?: string;
  categoryIds?: number[];
}

export type IAdUpdateParams = Partial<IAdBase> & {
  id: number;
  categoryIds?: number[];
};

export interface IAdSoftDeleteParams {
  id: number;
}
