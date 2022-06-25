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
    const { categories: categoryIds } = params;

    const adRepo = dataSourse.getRepository(Ad);
    const categoryRepo = dataSourse.getRepository(Category);

    const foundCategories = await categoryRepo
      .createQueryBuilder('category')
      .where('category.id IN (:...ids)', { ids: categoryIds })
      .getMany();

    const ad = await adRepo.save({ ...params, categories: foundCategories });

    const response = await adRepo.findOne({
      select: ['id', 'title', 'description'],
      where: { id: ad.id },
    });

    if (!response) {
      throw new Error('Не удалось создать объявление');
    }

    return response;
  },

  find: async (params: IAdFindParams) => {
    const { title, categories, limit, offset } = params;
    const adRepo = dataSourse.getRepository(Ad);

    const conditions = adRepo.createQueryBuilder('ad').skip(offset).take(limit);

    if (title) {
      conditions.where(`ad.title = :title`, { title });
    }

    if (categories) {
      conditions.andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('ad.id')
          .from(Ad, 'ad')
          .leftJoin('ad.categories', 'category')
          .andWhere('category.id IN (:...categoryIds)', {
            categoryIds: categories,
          })
          .groupBy('ad.id')
          .having('COUNT(ad.id) = :countCategories', {
            countCategories: categories.length,
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
    const { id, categories, ...rest } = params;

    const adRepo = dataSourse.getRepository(Ad);
    const ad = await adRepo.findOne({ where: { id } });

    if (!ad) {
      throw new Error(`Объявление с id=${id} не найдено`);
    }

    const categoryRepo = dataSourse.getRepository(Category);

    if (categories) {
      if (categories.length) {
        const foundCategories = await categoryRepo
          .createQueryBuilder('category')
          .where('category.id IN (:...ids)', { ids: categories })
          .getMany();

        adRepo.merge(ad, { categories: foundCategories });
      } else {
        adRepo.merge(ad, { categories: [] });
      }
    }

    adRepo.merge(ad, { ...rest });

    await adRepo.save(ad);

    const response = await adRepo.findOne({
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
