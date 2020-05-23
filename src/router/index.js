import Vue from 'vue'
import VueRouter from 'vue-router'
import AnaSayfa from '../ana_sayfa.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Anasayfa',
    component: AnaSayfa
  },
  /*{
    path: '/kodlar',
    name: 'Kodlar',
    component: () => import('../kodlar.vue')
  }*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
