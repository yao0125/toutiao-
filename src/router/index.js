// 定义router对象,导出给main.js使用
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
import store from '@/store'

Vue.use(VueRouter)
// 实例化一个对象
const router = new VueRouter({

  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article }

      ]

    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 1.判断是不是登陆路由
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  // 判读是否是登录
  next()
})
export default router
// Vue.use(Vue)
