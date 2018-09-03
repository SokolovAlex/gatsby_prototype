import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: []
    // routes: [
    //   { path: '/', component: () => import('./app/app.vue') },
    //   { path: '/homepage', component: () => import('./pages/homepage/homepage.vue') },
    // ]
  })
}