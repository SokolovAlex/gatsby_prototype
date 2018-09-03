import Vue from 'vue'
import App from './app.vue'
import { createRouter } from '../router'

// экспортируем функцию фабрику для создания экземпляров
// нового приложения, маршрутизатора и хранилища
export function createApp() {
    const router = createRouter()

    const app = new Vue({
        // корневой экземпляр просто рендерит компонент App
        router,
        render: h => h(App)
    })
    return {
        app,
        router
    }
}