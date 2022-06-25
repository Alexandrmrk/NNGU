import * as Hapi from '@hapi/hapi';

export interface IPagination {
  limit: number;
  offset: number;
}

export type Decorate<T> = Readonly<T> & Hapi.Request;
