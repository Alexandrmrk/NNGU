import { RouteOptions } from '@hapi/hapi';
import Joi from 'joi';

export const softDelete: RouteOptions = {
  description: 'Удалить объявление',
  notes: 'Маршрут удаления объявления',
  tags: ['api', 'ad'],
  validate: {
    params: Joi.object({ id: Joi.number().required().example(1) }),
  },
  plugins: {
    'hapi-swagger': {
      '200': {
        description: 'OK',
      },
    },
  },
};
