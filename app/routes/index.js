const Router = require('koa-router');

const router = new Router();

router.get('/api/foo', ctx => {
  const {foo} = ctx.request.query;
  if (foo === 'bar') {
    ctx.body={
      id: foo,
      fooValue: 1024,
      type: 'bar'
    }
  } else if (foo === 'foo'){
    ctx.body={
      id: foo,
      barValue: 512,
      type: 'foo'
    }
  } else {
    ctx.body = {
      id: foo,
      value: 256,
      type: 'Unknown'
    }
  }

});

module.exports = router;