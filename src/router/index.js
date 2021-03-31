import Vue from 'vue'
import Router from 'vue-router'
import Todos from '@/components/Todos'
import Carousel from '@/components/carousel/Carousel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todos',
      component: Todos
    },
    {
      path: '/carousel',
      name: 'Carousel',
      component: Carousel
    }
  ]
})
