import { createApp } from './app/app'

const { app, router } = createApp()

router.onReady(() => {
  app.$mount('#app')
})