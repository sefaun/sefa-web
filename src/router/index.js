import Vue from 'vue'
import VueRouter from 'vue-router'
import AnaSayfa from '../ana_sayfa.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Anasayfa',
    component: AnaSayfa
  },
  {
    path: '/kayit',
    name: 'Kayıt Ol',
    component: () => import('../kayit_sayfa.vue')
  },
  {
    path: '/makaleler',
    name: 'Makale',
    component: () => import('../makale_sayfa.vue')
  },
  {
    path: '/makale-ekle',
    name: 'Makale Ekle',
    component: () => import('../makale_ekle_sayfa.vue')
  },
  {
    path: '/makale-detayi',
    name: 'Makale Detayı',
    component: () => import('../makale_detay_sayfa.vue')
  },
  {
    path: '/giris',
    name: 'Giriş Yap',
    component: () => import('../giris_sayfa.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  store.state.token = localStorage.getItem('token')
  next();
})


export default router
