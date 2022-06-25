import { RouteOptions } from '@hapi/hapi';
import * as Joi from 'joi';

import { makeResponsesDocs } from '../../validators';

export const signup: RouteOptions = {
  description: 'Зарегистрироваться',
  notes: 'Маршрут регистрации пользователя',
  tags: ['api', 'auth'],
  validate: {
    payload: Joi.object({
      firstName: Joi.string()
        .required()
        .description('имя пользователя')
        .example('Иван'),
      lastName: Joi.string()
        .required()
        .description('фамилия пользователя')
        .example('Иванов'),
      email: Joi.string()
        .required()
        .description('адрес почты пользователя')
        .example('ivanov@mail.ru'),
      password: Joi.string()
        .required()
        .description('пароль пользователя')
        .example('12345'),
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
          email: Joi.string()
            .description('адрес почты пользователя')
            .example('ivanov@mail.ru'),
        })
      ),
    },
  },
};
