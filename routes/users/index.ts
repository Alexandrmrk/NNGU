import controllers from '../../controllers/users';
import * as Hapi from '@hapi/hapi';
import * as options from '../users/options';

const routes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/users',
    handler: controllers.createUser,
    options: options.create,
  },
  {
    method: 'GET',
    path: '/users',
    handler: controllers.findUser,
    options: options.find,
  },
];

export default routes;
