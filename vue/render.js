// Шаг 1: Создаём экземпляр Vue
const { createPage } = require('./src/pages/homepage/homepage');

const app = createPage().app;

// Шаг 2: Создаём рендерер
const renderer = require('vue-server-renderer').createRenderer({
        template: require('fs').readFileSync('./index.template.html', 'utf-8')
    }
);


// Шаг 3: Рендерим экземпляр Vue в HTML
renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
  // => <div data-server-rendered="true">Hello World</div>
})

// с версии 2.5.0+, возвращает Promise если коллбэк не указан:
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})