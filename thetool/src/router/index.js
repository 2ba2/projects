import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import TopNews from '@/components/TopNews/TopNews'
import Weixin from '@/components/Weixin/Weixin'
import CookCategory from '@/components/Cook/CookCategory'
import CookList from '@/components/Cook/CookList'
import CookDetail from '@/components/Cook/CookDetail'
import CookSearch from '@/components/Cook/CookSearch'
import Iqa from '@/components/Iqa/Iqa'
import Joke from '@/components/Joke/Joke'
import JokeText from '@/components/Joke/JokeText'
import JokePic from '@/components/Joke/JokePic'
import JokeGif from '@/components/Joke/JokeGif'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/top-news',
      name: 'TopNews',
      component: TopNews
    },
    {
      path: '/weixin',
      name: 'Weixin',
      component: Weixin
    },
    {
      path: '/cook-category',
      name: 'CookCategory',
      component: CookCategory
    },
    {
      path: '/cook-list',
      name: 'CookList',
      component: CookList
    },
    {
      path: '/cook-detail',
      name: 'CookDetail',
      component: CookDetail
    },
    {
      path: '/cook-search',
      name: 'CookSearch',
      component: CookSearch
    },
    {
      path: '/iqa',
      name: 'Iqa',
      component: Iqa
    },
    {
      path: '/joke',
      name: 'Joke',
      component: Joke,
      children: [
        {
          path: '',
          component: JokeText
        },
        {
          path: 'text',
          component: JokeText
        },
        {
          path: 'pic',
          component: JokePic
        },
        {
          path: 'gif',
          component: JokeGif
        }
      ]
    }
  ]
})
