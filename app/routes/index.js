const Router = require('koa-router');

const router = new Router();

router.get('/foo', ctx => ctx.body={
  id: 'foo'
});

router.get('/bar', ctx => ctx.body={
  id: 'bar'
});


module.exports = router;