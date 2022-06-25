import { RouteOptions } from '@hapi/hapi';
import Joi from 'joi';


export const create: RouteOptions = {
  description: 'Создать новое объявление',
  notes: 'Маршрут создания нового объявления',
  tags: ['api', 'ad'],
  validate: {
    payload: Joi.object({
      title: Joi.string().required().description('заголовок'),
      description: Joi.string().required().description('описание'),
      cost: Joi.string().required().description('стоимость'),
      phone: Joi.string().required().description('номер телефона'),
      address: Joi.string().description('стоимость'),
      categories: Joi.array()
        .items(Joi.number().required())
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
