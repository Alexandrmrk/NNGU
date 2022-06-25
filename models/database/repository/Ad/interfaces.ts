import { IPagination } from '../../../../common/interfaces';
import { ICategory } from '../Category/interfaces';

interface IAd {
  id: number;
  title: string;
  description: string;
  cost: string;
  phone: string;
  address: string;
  publicDate: string;
  viewCount: number;
  isVisible: boolean;
  categories: ICategory[];
  created: Date;
  updated: Date;
  deleted: Date;
}

export type IAdCreateParams = Pick<
  IAd,
  'title' | 'description' | 'cost' | 'phone' | 'address' | 'categories'
>;

export type IAdFindParams = Partial<Pick<IAd, 'title' | 'categories'>> &
  IPagination;

export type IAdUpdateParams = Pick<
  IAd,
  'id' | 'title' | 'description' | 'cost' | 'phone' | 'address' | 'categories'
>;

export type IAdSoftDeleteParams = Pick<IAd, 'id'>;
