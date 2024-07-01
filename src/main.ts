// src/main.ts

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import Vue3TouchEvents from "vue3-touch-events";


// tailwind
import './styles/index.css'

const routes = setupLayouts(generatedRoutes)

// `export const createApp` is required
export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes, base: import.meta.env.BASE_URL },
  // function to have custom setups
  (ctx) => {
    ctx.app.use(Vue3TouchEvents);
    Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
  }
)
