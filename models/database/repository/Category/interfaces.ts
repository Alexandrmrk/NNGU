export interface ICategory {
  id: number;
  title: string;
}

export type ICategoryCreateParams = Pick<ICategory, 'title'>;
