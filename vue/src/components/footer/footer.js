import Vue from 'vue'
import Template from './footer.vue'

export function createPage () {
    const app = new Vue({
        render: h => h(Template)
    });
    return { app }
}