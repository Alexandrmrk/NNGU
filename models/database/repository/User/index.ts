import dataSourse from '../../../../ormconfig';
import User from '../../entity/User';
import Direction from '../../entity/Direction';
import { IUserCreateParams, IUserFindParams } from './interfaces';

const UserRepository = {
  create: async (params: IUserCreateParams) => {
    const { firstName, lastName } = params;

    const userRepo = dataSourse.getRepository(User);

    const user = await userRepo.save({
      firstName,
      lastName,
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

    // return dataSourse.getRepository(Direction).find({ relations: ['users'] });
     return dataSourse.getRepository(User).find({ relations: ['directions'] });
  },
};

export default UserRepository;
