import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

import { makeResponsesDocs } from '../../validators';

export const create: RouteOptions = {
  description: 'Создать нового пользователя',
  notes: 'Маршрут создания нового пользователя',
  tags: ['api', 'user'],
  validate: {
    payload: Joi.object({
      firstName: Joi.string().required().description('имя пользователя'),
      lastName: Joi.string().required().description('фамилия пользователя'),
    }),
  },
  plugins: {
    'hapi-swagger': {
      responses: makeResponsesDocs(
        Joi.object({
          id: Joi.number()
            .description('id записи сгенерированный postgres')
            .example(100),
          firstName: Joi.string()
            .description('имя пользователя')
            .example('Иван'),
          lastName: Joi.string()
            .description('фамилия пользователя')
            .example('Иванов'),
        })
      ),
    },
  },
};
