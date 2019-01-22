const Koa = require('koa');
const mount = require('koa-mount');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const {oas} = require('koa-oas3');
const routes = require('./routes');

const swaggerStaticResource = new Koa();
swaggerStaticResource.use(serve(`${__dirname}/swagger`, {index: 'index.yml'}));
const app = new Koa();

app.use(bodyParser());
app.use(mount('/', swaggerStaticResource));
app.use(oas({
  file: `${__dirname}/swagger/index.yml`,
  uiEndpoint: '/docs',
  errorHandler: (err, ctx) => {
    throw err;
  }
}));


app.use(routes.routes());
app.use(routes.allowedMethods());
module.exports = app;