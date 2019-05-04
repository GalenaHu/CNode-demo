<template>
  <div class="userInfo">
    <div class="mainInfo">
      <div class="headerInfo">主页</div>
      <div class="user">
        <span>
          <img :src="mainInfo.avatar_url" width="40px">
        </span>
        <span>{{mainInfo.loginname}}</span>
      </div>
      <div>{{mainInfo.score}}积分</div>
      <div>注册时间 {{mainInfo.create_at | formateDate}}</div>
    </div>
    <div class="recentTopics">
      <div class="headerInfo">最近创建的话题</div>
      <div class="userTopics">
        <ul>
          <li class='userTopic' v-for='topic in recentTopics'>
            <span>
              <img :src="topic.author.avatar_url" width="30px">
            </span>
            <span class="userTitle">
              <router-link :to="{name:'PostArticle', params:{id:topic.id}}">
                {{topic.title}}
              </router-link>
            </span>
            <span>{{topic.last_reply_at | formateDate}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="recentReplies">
      <div class="headerInfo">最近回复的话题</div>
      <div class="userReplies">
        <ul>
          <li class='userReply' v-for='reply in recentReplies'>
            <span>
              <router-link :to="{name:'UserInfo', params:{loginname:reply.author.loginname}}"><img :src="reply.author.avatar_url" width="30px"></router-link>
            </span>
            <span class="userTitle">
              <router-link :to="{name:'PostArticle', params:{id:reply.id}}">
                {{reply.title}}
              </router-link>
            </span>
            <span>{{reply.last_reply_at | formateDate}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserInfo',
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
  watch: {
    '$route'(to, from) {
      this.getUserData()
    }
  }
}

</script>
<style scoped>
li {
  list-style: none;
}

.userTitle>a {
  color: #0088cc;
  text-decoration: none;

}

.userTitle>a:hover {
  color: #005580;
  text-decoration: underline;
}

.userInfo {
  max-width: 1400px;
  margin: 10px auto;
}

.userInfo>div {
  background: white;
  margin-bottom: 13px;
  border-radius: 5px 5px 0 0;
}

.userInfo>div>div {
  padding: 10px;
}

.headerInfo {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 5px 5px 0 0;
}

.userTopics>ul>li,
.userReplies>ul>li {
  display: flex;
  vertical-align: middle;
  line-height: 34px;
}

.userTopics>ul>li>span,
.userReplies>ul>li>span {
  margin-right: 5px;
}

.userTopics>ul>li>span:nth-child(2),
.userReplies>ul>li>span:nth-child(2) {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
