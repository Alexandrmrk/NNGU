import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';
import routes from './routes';
import dataSource from './ormconfig';

(async () => {
  try {
    const server = Hapi.server({
      port: 8888,
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });

    // add plugins
    await server.register([Inert, Vision]);
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
          },
        },
      },
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
