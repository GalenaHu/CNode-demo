<template>
  <div class="slideBar">
    <div class="userInfo">
      <div class="headerInfo">作者</div>
      <div class="slideContainer">
        <div class="avatar"><img :src="mainInfo.avatar_url" width="48px"></div>
        <div class="authorName">{{mainInfo.loginname}}</div>
        <div>积分：{{mainInfo.score}}</div>
      </div>
    </div>
    <div class="recentTopics">
      <div class="headerInfo">作者创建的话题</div>
      <div class="slideContainer">
        <ul>
          <li v-for='topic in recentTopics'>
            <router-link :to="{name:'PostArticle', params:{id:topic.id,loginname:topic.author.loginname}}" :title="topic.title">
              {{topic.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="recentReplies">
      <div class="headerInfo">作者参与的话题</div>
      <div class="slideContainer">
        <ul>
          <li v-for='reply in recentReplies'>
            <router-link :to="{name:'PostArticle', params:{id:reply.id,loginname:reply.author.loginname}}">
              {{reply.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SlideBar',
  data() {
    return {
      mainInfo: {},
      recentTopics: [],
      recentReplies: []
    }
  },
  methods: {
    getUserData() {
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.loginname}`)
        .then(response => {
          this.mainInfo = response.data.data
          this.recentTopics = response.data.data.recent_topics
          this.recentReplies = response.data.data.recent_replies
        }).catch(err => {
          console.log(err)
        })
    },
  },
  beforeMount() {
    this.getUserData()
  },
}

</script>
<style scoped>
.slideBar {
  width: 290px;
  margin-left: 20px;
}

.slideBar>div {
  margin-bottom: 20px;
}

.slideContainer {
  background: white;
  padding: 10px 20px;
}

.slideContainer>ul>li {
  list-style: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 4px 0;
}

.slideContainer>ul>li>a {
  text-decoration: none;
  color: #778087;
}

</style>
