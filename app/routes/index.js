const Router = require('koa-router');

const router = new Router();

router.get('/api/foo', ctx => {
  ctx.body = {id: 'foo'};
  ctx.status = 200;
});

router.get('/api/bar', ctx => ctx.body={
  id: 'bar'
});


module.exports = router;