import Vue from 'vue'
import App from './homepage.vue'
import { createStore } from "./store/index";

export function createPage () {
    const store = createStore();

    const app = new Vue({
        store,
        render: h => h(App)
    });
    return { app, store }
}