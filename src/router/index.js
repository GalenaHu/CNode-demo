import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/postlist.vue'
import Article from '../components/article.vue'
import UserInfo from '../components/userinfo.vue'
import SlideBar from '../components/slidebar.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      name: 'RootPage',
      path: '/',
      components: {
        main: PostList
      }
    },
    {
      name: 'PostArticle',
      path: '/topic/:id&author=:loginname',
      components: {
        main: Article,
        slide: SlideBar
      }
    },
    {
      name: 'UserInfo',
      path: '/user/:loginname',
      components: {
        main: UserInfo
      }
    }
  ]
})
