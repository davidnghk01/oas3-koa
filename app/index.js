const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const {swaggerMiddleware, initSwagger} = require('./swagger');
const routes = require('./routes');

async function createApp() {
  const swagger = await initSwagger();
  const app = new Koa();
  app.use(bodyParser());
  app.use(swaggerMiddleware(swagger));
  app.use(routes.routes());
  app.use(routes.allowedMethods());
  return app;
}

module.exports = createApp;