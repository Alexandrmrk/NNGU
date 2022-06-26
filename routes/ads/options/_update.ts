import { RouteOptions } from '@hapi/hapi';
import Joi from 'joi';

export const update: RouteOptions = {
  description: 'Обновить объявление',
  notes: 'Маршрут обновления объявления',
  tags: ['api', 'ad'],
  validate: {
    payload: Joi.object({
      id: Joi.number().required().example(1),
      title: Joi.string().description('заголовок'),
      description: Joi.string().description('описание'),
      cost: Joi.string().description('стоимость'),
      phone: Joi.string().description('номер телефона'),
      address: Joi.string().description('стоимость'),
      categoryIds: Joi.array()
        .single()
        .items(Joi.number())
        .description('категории фильтров'),
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
