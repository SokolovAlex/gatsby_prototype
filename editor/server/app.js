
const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');
const static = require('koa-static');
const { createReadStream } = require('fs');

const { publish } = require('./publish-api');

const router = Router();
const app = new koa();

app.use(static('build'));
app.use(bodyParser());

router
    .get('/api/template', (ctx, next) => {
        console.log(`get`, ctx.request.body);
        next();
    })
    .post('/api/template', (ctx) => {
        const body = ctx.request.body;
        publish(body);
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