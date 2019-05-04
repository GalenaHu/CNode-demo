<template>
  <div class="article">
    <div class="main">
      <div class="container">
        <div class="head">
          <div class="articleTitle">
            <span class="tab">
              <span :class="[{goodTab:(post.good === true || post.top === true),normalTab:(post.good !== true && post.top !== true)}]">{{post | formateTab}}</span>
            </span>
            <span class="titleText">{{post.title}}</span>
          </div>
          <div class="info">
            <ul>
              <li>• 发布于{{post.create_at | formateDate}}</li>
              <li>• 作者
                <router-link :to="{name:'UserInfo', params:{loginname:author.loginname}}">{{author.loginname}}</router-link>
              </li>
              <li>• {{post.visit_count}}次浏览</li>
              <li>• 来自 {{post.tab | tabFormate}}</li>
            </ul>
          </div>
        </div>
        <div class="articleContent markdown-body" v-html='post.content'>
        </div>
      </div>
      <div class="replies">
        <div class="headerInfo">{{replies.length}}回复</div>
        <ul>
          <li v-for='(reply, index) in replies' class="reply">
            <div class="replyHead">
              <span>
                <router-link :to="{name:'UserInfo', params:{loginname:reply.author.loginname}}"><img :src="reply.author.avatar_url" width="30px"></router-link>
              </span>
              <span>
                <router-link :to="{name:'UserInfo', params:{loginname:reply.author.loginname}}"> {{reply.author.loginname}}
                </router-link>
              </span>
              <span>{{index+1}}楼</span>
              <span>{{reply.create_at | formateDate}}</span>
              <span class="thumb">🖒</span>
              <span>{{reply.ups.length}}</span>
            </div>
            <div class="replyContent markdown-body" v-html="reply.content"></div>
          </li>
        </ul>
      </div>
    </div>
    <div class="aside">
    </div>
  </div>
</template>
<script>
export default {
  name: 'PostArticle',
  data() {
    return {
      post: {},
      author: {},
      replies: {}
    }
  },
  filters: {
    tabFormate(value) {
      if (value === 'share') {
        return '分享'
      } else if (value === 'ask') {
        return '问答'
      } else if (value === 'job') {
        return '招聘'
      } else if (value === 'dev') {
        return '客户端测试'
      }
    }
  },
  methods: {
    getArticleData() {
      this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(response => {
          this.post = response.data.data
          this.author = response.data.data.author
          this.replies = response.data.data.replies
        }).catch(err => {
          console.log(err)
        })
    }
  },
  beforeMount() {
    this.getArticleData()
  },
  watch: {
    '$route'(to, from) {
      this.getArticleData()
    }
  }

}

</script>
<style>
@import url('../assets/markdown.css');

.tab {
  text-align: center;
  line-height: 44px;
}

.tab>span {
  border-radius: 3px;
  padding: 2px 4px;
}

.normalTab {
  color: #999;
  background: #e5e5e5;
}

.goodTab {
  background: #80BD01;
  color: white;
}

.article {
  display: block;
}

.container {
  background: white;
}

.head {
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.articleTitle {
  margin: 8px;
}

.titleText {
  font-size: 22px;
  font-weight: 700;
  margin: 8px 0;
  display: inline-block;
  vertical-align: bottom;
  width: 75%;
  line-height: 130%;
}

.info>ul {
  display: flex;
}

.info>ul>li {
  list-style: none;
  margin-left: 5px;
  font-size: 12px;
  color: #838383;
}

.info a {
  text-decoration: none;
  color: #838383;
}

.info a:hover {
  text-decoration: underline;
}

.articleContent {
  padding: 10px 20px;
  box-sizing: border-box;
}

.replies {
  background: white;
  margin-top: 13px;
  border-radius: 5px 5px 0 0;
}

.headerInfo {
  padding: 10px 20px;
  background-color: #f6f6f6;
  border-radius: 5px 5px 0 0;
}

.reply {
  padding: 10px 20px;
  list-style: none;
  border-top: 1px solid #f0f0f0;
}

.replyHead {
  display: flex;
  align-items: center;
}

.replyHead>span {
  margin-left: 4px;
  font-size: 12px;
}

.replyHead>span:nth-child(2)>a {
  font-weight: 700;
  color: #666;
  text-decoration: none;
}

.replyHead>span:nth-child(2)>a:hover {
  color: #385f8a;
  text-decoration: underline;
}

.replyHead>span:nth-child(3) {
  color: #0088cc;
}

.replyHead>span:nth-child(4) {
  color: #0088cc;
  flex: 1;
}

.replyHead>.thumb {
  font-size: 30px;
}

.replyHead>span:nth-child(6) {
  font-size: 15px;
  margin-left: 0;
}

</style>
