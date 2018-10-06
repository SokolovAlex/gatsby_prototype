
const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');
const static = require('koa-static');
const mkdirp = require('mkdirp');

const { createReadStream, writeFileSync } = require('fs');

const router = Router();
const app = new koa();

app.use(static('build'));

router
    .get('/api/template', (ctx, next) => {
        console.log(`get`, ctx.request.body);
        next();
    })
    .post('/api/template', (ctx, next) => {
        mkdirp(__dirname + '/../content/templates');
        console.log(`post`, ctx.request.body);
        writeFileSync(__dirname + '/../content/templates/template.json', ctx.request.body);
        next();
    });

app.use(bodyParser());
app.use(router.routes());

app.use(async (ctx) => {
    ctx.type = 'html';
    ctx.body = await createReadStream('build/index.html');
});

const port = 4000;
app.listen(port);

console.log(`server started on port ${port}`)