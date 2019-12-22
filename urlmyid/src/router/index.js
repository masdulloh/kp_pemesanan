import Vue from 'vue'
import Router from 'vue-router'

import Beranda from '@/components/home/Beranda'

import Products from '@/components/products/Products'
import Orders from '@/components/home/Orders'

import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'

import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Beranda',
      component: Beranda,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    // check auth state of user
    let user = firebase.auth().currentUser
    if(user){
      //user sign in, proses router
      next()
    } else {
      // nop user sign, arahkan ke login
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
