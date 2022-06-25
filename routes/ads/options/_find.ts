import { RouteOptions } from '@hapi/hapi';
import Joi from 'joi';

export const find: RouteOptions = {
  description: 'Получить объявления',
  notes: 'Маршрут получения объявлений',
  tags: ['api', 'ad'],
  validate: {
    query: Joi.object({
      title: Joi.string().description('заголовок'),
      categories: Joi.array()
        .single()
        .items(Joi.number().required())
        .description('категории фильтров'),
      offset: Joi.number().description('смещение').default(0),
      limit: Joi.number().description('количество').default(10),
    }),
  },
  plugins: {
    'hapi-swagger': {
      '200': {
        description: 'OK',
      },
    },
  },
};
