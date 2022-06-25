import controllers from '../../controllers/ads';
import * as Hapi from '@hapi/hapi';
import * as options from '../ads/options';

const routes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/ads',
    handler: controllers.createAd,
    options: options.create,
  },

  {
    method: 'GET',
    path: '/ads',
    handler: controllers.findAd,
    options: options.find,
  },

  {
    method: 'PUT',
    path: '/ads',
    handler: controllers.updateAd,
    options: options.update,
  },

  {
    method: 'DELETE',
    path: '/ads/{id}',
    handler: controllers.softDeleteAd,
    options: options.softDelete,
  },
];

export default routes;
