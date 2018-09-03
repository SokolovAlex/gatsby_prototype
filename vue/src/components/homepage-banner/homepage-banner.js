import Vue from 'vue'
import Template from './homepage-banner.vue'

export function createPage () {
    const app = new Vue({
        render: h => h(Template)
    });
    return { app }
}