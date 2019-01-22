const Router = require('koa-router');

const router = new Router();

router.get('/api/foo', ctx => ctx.body={
  id: 'foo'
});

module.exports = router;