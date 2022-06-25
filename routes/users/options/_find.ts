import { RouteOptions } from '@hapi/hapi';
import Joi from 'joi';
import { authStrategy, roles } from '../../../common';

import { makeResponsesDocs } from '../../validators';

export const find: RouteOptions = {
  description: 'Получить пользователей',
  notes: 'Маршрут получения пользователей',
  tags: ['api', 'user'],
  auth: {
    strategies: [authStrategy.STATIC],
    access: {
      scope: [roles.ADMIN],
    },
  },
  validate: {
    query: Joi.object({
      firstName: Joi.string().description('имя пользователя'),
      offset: Joi.number().description('смещение').default(0),
      limit: Joi.number().description('количество').default(10),
    }),
  },
  plugins: {
    'hapi-swagger': {
      responses: makeResponsesDocs(
        Joi.array().items(
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
        )
      ),
    },
  },
};
