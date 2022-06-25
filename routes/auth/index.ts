import controllers from '../../controllers/Auth';
import * as Hapi from '@hapi/hapi';
import * as options from '../auth/options';

const routes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/signup',
    handler: controllers.signup,
    options: options.signup,
  },
];

export default routes;
