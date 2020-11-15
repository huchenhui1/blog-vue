import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
/*import Index from '@/views/Index'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Log from '@/views/Log'
import MessageBoard from '@/views/MessageBoard'
import BlogWrite from '@/views/blog/BlogWrite'
import BlogView from '@/views/blog/BlogView'
import BlogAllCategoryTag from '@/views/blog/BlogAllCategoryTag'
import BlogCategoryTag from '@/views/blog/BlogCategoryTag'*/

import ConsoleIndex from '@/views/console/ConsoleIndex'
import ConsoleArticle from '@/views/console/ConsoleArticle'
import ConsoleCategory from '@/views/console/ConsoleCategory'
import ConsoleComment from '@/views/console/ConsoleComment'

import {Message} from 'element-ui';


import store from '@/store'

import {getToken} from '@/request/token'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/write/:id?',
      component: r => require.ensure([], () => r(require('@/views/blog/BlogWrite')), 'blogwrite'),
      //自定义obj，需要登录才能进入/write页面，相当于路由拦截
      meta: {
        requireLogin: false
      },
    },
    {
      path: '',
      name: 'Home',
      component: Home,
      children: [
        //主页：/views/Index.vue
        {
          path: '/',
          component: r => require.ensure([], () => r(require('@/views/Index')), 'index')
        },
        {
          path: '/log',
          component: r => require.ensure([], () => r(require('@/views/Log')), 'log')
        },
        {
          path: '/archives/:year?/:month?',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogArchive')), 'archives')
        },
        {
          path: '/messageBoard',
          component: r => require.ensure([], () => r(require('@/views/MessageBoard')), 'messageboard')
        },
        {
          path: '/view/:id',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogView')), 'blogview')
        },
        //在组件中用path来导航的话，用按照定义的route先后来确定优先级，写在最后会先匹配/:type/:id这个路由
        //应该通过name导航。element导航不知道怎么用   <router-link>有 :to属性
        {
          path: '/console',
          component: ConsoleIndex,
          name:'ConsoleIndex',
          children: [
            {
              path: '',
              redirect:"article"
            },
            {
              path: 'article',
              component: ConsoleArticle,
              name:'ConsoleArticle'
            },
            {
              path: 'category',
              component: ConsoleCategory,
              name:'ConsoleCategory'
            },
            {
              path: 'comment',
              component: ConsoleComment,
              name:'ConsoleComment'
            },
          ]
        },
        {
          path: '/:type/all',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogAllCategoryTag')), 'blogallcategorytag')
        },
        {
          path: '/:type/:id',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogCategoryTag')), 'blogcategorytag')
        }
      ]
    },
    {
      path: '/login',
      component: r => require.ensure([], () => r(require('@/views/Login')), 'login')
    },
    {
      path: '/register',
      component: r => require.ensure([], () => r(require('@/views/Register')), 'register')
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
//vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航
//https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
//全局前置守卫：一般用来做一些进入页面的限制
router.beforeEach((to, from, next) => {

  //从localStorage浏览器对象中获取Token，获取到则已登录
  if (getToken()) {
    //已登录状态下访问登录页面，直接跳转到首页
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      //有Token，如果访问其他页面，但是store中存储的account用户名长度为0
      if (store.state.account.length === 0) {
        //调用store中的getUserInfo方法，向服务端发起请求，服务端根据前端的Token，返回当前用户信息
        store.dispatch('getUserInfo').then(data => { //获取用户信息
          next()
        }).catch(() => {
          next({path: '/'})
        })
      } else {
        next()
      }
    }
  } else {//没获取到获取Token
    //如果要进入的页面是/write需要登录权限
    if (to.matched.some(r => r.meta.requireLogin)) {
      Message({
        type: 'warning',
        showClose: true,
        message: '登录哦'
      })
    }
    //否则进入的页面不需要登录权限，直接允许进入路由
    else {
      next();
    }
  }
})


export default router
