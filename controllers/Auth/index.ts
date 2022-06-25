import * as Boom from '@hapi/boom';
import { roles } from '../../common';
import { AuthRequest, SignupRequest } from './interfaces';
import AuthRepository from '../../models/database/repository/Auth';

export default {
  auth: async (request: AuthRequest, token: string) => {
    try {
      console.log(token);
      return {
        isValid: true,
        credentials: {
          scope: roles.ADMIN,
        },
        artifacts: {
          token,
        },
      };
    } catch (error) {
      console.error(`UserRepository.create(): ${error.message}`);

      return Boom.internal(error.message);
    }
  },
  signup: async (request: SignupRequest) => {
    try {
      return await AuthRepository.signup(request.payload);
    } catch (error) {
      console.error(`AuthRepository.signup(): ${error.message}`);

      return Boom.internal(error.message);
    }
  },
};
