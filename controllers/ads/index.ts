import * as Boom from '@hapi/boom';
import AdRepository from '../../models/database/repository/Ad';
import {
  CreateAdRequest,
  FindAdRequest,
  SoftDeleteAd,
  UpdateAdRequest,
} from './interfaces';

export default {
  createAd: async (request: CreateAdRequest) => {
    try {
      return await AdRepository.create(request.payload);
    } catch (error) {
      console.error(`AdRepository.create(): ${error.message}`);

      return Boom.internal(error.message);
    }
  },

  findAd: async (request: FindAdRequest) => {
    try {
      return AdRepository.find(request.query);
    } catch (error) {
      console.error(`AdRepository.find(): ${error.message}`);

      return Boom.internal(error.message);
    }
  },

  updateAd: async (request: UpdateAdRequest) => {
    try {
      
      return AdRepository.update(request.payload);
    } catch (error) {
      console.error(`AdRepository.update(): ${error.message}`);

      return Boom.internal(error.message);
    }
  },

  softDeleteAd: async (request: SoftDeleteAd) => {
    try {
      return AdRepository.softDelete(request.params);
    } catch (error) {
      console.error(`AdRepository.softDelete(): ${error.message}`);

      return Boom.internal(error.message);
    }
  },
};
