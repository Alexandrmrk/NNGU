import * as Boom from '@hapi/boom';
import UserRepository from '../models/database/repository';
import { CreateTestRequest, FindTestRequest } from './interfaces';

export default {
  createUser: async (request: CreateTestRequest) => {
    try {
      return await UserRepository.create(request.payload);
    } catch (error) {
      console.error(`UserRepository.create(): ${error.message}`);

      return Boom.internal(error.message);
    }
  },
  findUser: async (request: FindTestRequest) => {
    try {
      return UserRepository.find(request.query);
    } catch (error) {
      console.error(`UserRepository.find(): ${error.message}`);

      return Boom.internal(error.message);
    }
  },
};
