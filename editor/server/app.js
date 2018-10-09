
const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');
const static = require('koa-static');
const { createReadStream } = require('fs');
const cors = require('@koa/cors');

const { publish, getTemplate } = require('./publish-api');

const router = Router();
const app = new koa();

app.use(static('build'));
app.use(bodyParser());
app.use(cors());

router
  .get('/api/template', (ctx) => {
      ctx.type = 'json';
      ctx.response.body = getTemplate('page');
  })
  .post('/api/template', (ctx) => {
      const body = ctx.request.body;
      publish('page', body);
      ctx.response.status = 200;
      ctx.response.body = "ok";
  });

app.use(router.routes());

app.use(async (ctx) => {
    ctx.type = 'html';
    ctx.body = createReadStream('build/index.html');
});

const port = 4000;
app.listen(port);

console.log(`server started on port ${port}`)