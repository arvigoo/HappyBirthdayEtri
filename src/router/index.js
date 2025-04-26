// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Photos from '@/views/Photos.vue'
// import Home from '@/views/Home.vue' // misal halaman utama kamu

const routes = [
  // { path: '/', name: 'Home', component: Home },
  { path: '/photos', name: 'Photos', component: Photos },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
