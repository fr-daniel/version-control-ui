import store from '../store'

import Home2 from '../views/Home2.vue'
import Login from '../components/Login.vue';
import NotFoundPage from '../views/utils/NotFoundPage.vue';

export default [
  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/404'
    }
  },
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: NotFoundPage
  },
  {
    path: '/',
    name: 'Home',
    component: Home2,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      public: true,
    },

  },
  {
    path: '/upload',
    name: 'Upload',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/Upload.vue')
  },
  {
    path: '/projetos',
    name: 'Projetos',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/projeto/ListagemTodos.vue')
  },
  {
    path: '/placas',
    name: 'Placas',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/placa/ListagemTodos.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter() {
      store.dispatch('auth/logout')
    }
  },

]
