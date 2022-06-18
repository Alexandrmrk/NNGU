import dataSourse from '../../../ormconfig';
import User from '../entity/User';
import { IUserCreateParams, IUserFindParams } from './interfaces';

const UserRepository = {
  create: async (params: IUserCreateParams) => {
    const { firstName, lastName } = params;

    const userRepo = dataSourse.getRepository(User);

    const user = await userRepo.save({
      firstName,
      lastName,
      isActive: false,
    });

    const response = await userRepo.findOne({
      select: ['id', 'firstName', 'lastName'],
      where: { id: user.id },
    });

    if (!response) {
      throw new Error('Не удалось создать пользователя');
    }

    return response;
  },

  find: async (params: IUserFindParams) => {
    const { offset, limit, firstName } = params;

    const conditions = dataSourse
      .createQueryBuilder(User, 'test')
      .offset(offset)
      .limit(limit);

    if (firstName) {
      conditions.where('test.firstName ILIKE :firstName', {
        firstName: `%${firstName}%`,
      });
    }

    return await conditions.getMany();
  },
};

export default UserRepository;
