<template>
  <div id="app">
    <headBar />
    <div class="mainContainer">
      <router-view name='main'>
        <PostList />
      </router-view>
      <router-view name='slide'></router-view>
    </div>
  </div>
</template>
<script>
import HeadBar from './components/header.vue'
import PostList from './components/postlist.vue'
import PostArticle from './components/article.vue'
import UserInfo from './components/userinfo.vue'
import SlideBar from './components/slidebar.vue'

export default {
  name: 'App',
  components: { HeadBar, PostList, PostArticle, UserInfo, SlideBar }
}

</script>
<style>
.mainContainer {
  display: flex;
  max-width: 1400px;
  margin: 20px auto;
}

.mainContainer>div:first-child {
  flex: 1;
}

</style>
