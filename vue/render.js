// Шаг 1: Создаём экземпляр Vue
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer');

// Шаг 2: Создаём рендерер
const indexTemplate = fs.readFileSync('./src/index.html', 'utf-8');

const renderer = createBundleRenderer('dist/vue-ssr-server-bundle.json', {
    template: indexTemplate
});

// Шаг 3: Рендерим экземпляр Vue в HTML
renderer.renderToString({ title: '' }).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})