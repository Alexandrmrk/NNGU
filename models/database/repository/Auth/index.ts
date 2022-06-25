import { hashPassword } from '../../../../common';
import dataSourse from '../../../../ormconfig';
import User from '../../entity/User';
import { ISignupParams } from './interfaces';

const AuthRepository = {
  signup: async (params: ISignupParams) => {
    const { password } = params;

    const hash = await hashPassword(password);
    const userRepo = dataSourse.getRepository(User);

    const user = await userRepo.save({ ...params, password: hash });

    if (!user) {
      throw new Error('Не удалось создать пользователя');
    }

    const response = userRepo.findOne({ where: { id: user.id } });

    return response;
  },
};

export default AuthRepository;
