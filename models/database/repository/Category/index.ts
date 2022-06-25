import { ICategoryCreateParams } from './interfaces';

const CategoryRepository = {
  create: async (params: ICategoryCreateParams) => {
    return 'ok';
  },
};

export default CategoryRepository;
