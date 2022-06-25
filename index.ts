import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';
import * as Boom from '@hapi/boom';
import AuthBearer from 'hapi-auth-bearer-token';
import routes from './routes';
import dataSource from './ormconfig';
import { authStrategy } from './common';
import AuthControllers from './controllers/Auth';

(async () => {
  try {
    const server = Hapi.server({
      port: 8888,
      routes: {
        cors: {
          origin: ['*'],
        },
        validate: {
          failAction: async (request, h, err) => {
            if (err) {
              throw Boom.badRequest(err.message);
            }
          },
          options: {
            abortEarly: false,
          },
        },
      },
    });

    // add plugins
    await server.register([Inert, Vision, AuthBearer]);
    await server.register({
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'API Documentation',
          description: 'API Documentation',
        },
        jsonPath: '/documentation.json',
        documentationPath: '/documentation',
        schemes: ['http', 'https'],
        debug: true,
        securityDefinitions: {
          Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            description: 'Bearer token',
            in: 'header',
          },
        },
        security: [{ Bearer: [] }],
      },
    });

    //auth
    server.auth.strategy(authStrategy.STATIC, 'bearer-access-token', {
      allowQueryToken: false,
      validate: AuthControllers.auth,
    });

    // routes
    server.route(routes);

    // start
    await server.start();

    console.log(
      'Server running on %s://%s:%s',
      server.info.protocol,
      server.info.address,
      server.info.port
    );

    console.log(
      'Documentation running on %s://%s:%s/documentation',
      server.info.protocol,
      server.info.address,
      server.info.port
    );

    // data sourse
    await dataSource.initialize();
    await dataSource.runMigrations();
  } catch (error) {
    console.log(error);
  }
})();
