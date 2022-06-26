import dataSourse from '../../../../ormconfig';
import Ad from '../../entity/Ad';
import Category from '../../entity/Category';
import {
  IAdCreateParams,
  IAdFindParams,
  IAdSoftDeleteParams,
  IAdUpdateParams,
} from './interfaces';

const AdRepository = {
  create: async (params: IAdCreateParams) => {
    const { categoryIds } = params;
    const adRepo = dataSourse.getRepository(Ad);
    const categoryRepo = dataSourse.getRepository(Category);

    let categories: Category[] = [];
    if (categoryIds) {
      categories = await categoryRepo
        .createQueryBuilder('category')
        .where('category.id IN (:...ids)', { ids: categoryIds })
        .getMany();
    }

    const ad = await adRepo.save({ ...params, categories });

    const response = await adRepo.findOne({
      select: ['id', 'title', 'description', 'cost', 'phone', 'address'],
      relations: ['categories'],
      where: { id: ad.id },
    });

    if (!response) {
      throw new Error('Не удалось создать объявление');
    }

    return response;
  },

  find: async (params: IAdFindParams) => {
    const { title, categoryIds, limit, offset } = params;
    const adRepo = dataSourse.getRepository(Ad);

    const conditions = adRepo.createQueryBuilder('ad').skip(offset).take(limit);

    if (title) {
      conditions.where(`ad.title = :title`, { title });
    }

    if (categoryIds) {
      conditions.andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('ad.id')
          .from(Ad, 'ad')
          .leftJoin('ad.categories', 'category')
          .andWhere('category.id IN (:...categoryIds)', {
            categoryIds,
          })
          .groupBy('ad.id')
          .having('COUNT(ad.id) = :countCategories', {
            countCategories: categoryIds.length,
          });

        return `ad.id IN ${subQuery.getQuery()}`;
      });
    }

    const [data, totalCount] = await Promise.all([
      conditions.getMany(),
      conditions.getCount(),
    ]);

    return { data, totalCount };
  },

  update: async (params: IAdUpdateParams) => {
    const { id, categoryIds, ...rest } = params;

    const adRepo = dataSourse.getRepository(Ad);
    const ad = await adRepo.findOne({ where: { id } });

    if (!ad) {
      throw new Error(`Объявление с id=${id} не найдено`);
    }

    const categoryRepo = dataSourse.getRepository(Category);

    if (categoryIds) {
      let categories: Category[] = [];

      if (categoryIds.length) {
        categories = await categoryRepo
          .createQueryBuilder('category')
          .where('category.id IN (:...categoryIds)', { categoryIds })
          .getMany();
      }

      adRepo.merge(ad, { categories });
    }

    adRepo.merge(ad, { ...rest });

    await adRepo.save(ad);

    const response = await adRepo.findOne({
      select: ['id', 'title', 'description', 'cost', 'phone', 'address'],
      relations: ['categories'],
      where: { id: ad.id },
    });

    if (!response) {
      throw new Error('Не удалось обновить объявление');
    }

    return response;
  },

  softDelete: async (params: IAdSoftDeleteParams) => {
    const { id } = params;
    const isAdmin = true;
    const userId = 1;

    const adRepo = dataSourse.getRepository(Ad);

    const conditions = adRepo
      .createQueryBuilder('ad')
      .select(['ad.id'])
      .where('ad.id = :id', { id });

    if (!isAdmin) {
      conditions
        .leftJoin('ad.user', 'user')
        .andWhere('user.id = :userId', { userId });
    }

    const foundAd = await conditions.getOne();

    if (!foundAd) {
      throw new Error(`Объявление с id=${id} не найдено`);
    }

    await adRepo.restore(foundAd);

    return 'ok';
  },
};

export default AdRepository;
