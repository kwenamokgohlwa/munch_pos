import Fastify from 'fastify';
import sequelize from './config/database';
import routes from './routes';

const app = Fastify({ logger: true });

// Register routes
app.register(routes);

// Connect to the database
sequelize.authenticate()
  .then(() => {
    app.log.info('Database connected...');
  })
  .catch((err) => {
    app.log.error('Unable to connect to the database:', err);
  });

export default app;
