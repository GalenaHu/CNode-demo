<template>
  <div>
    <div>
      <ul class='selectBar'>
        <li @click='changTab("all")' :class='{tabSelected:(tab === "all")}'>全部</li>
        <li @click='changTab("good")' :class='{tabSelected:(tab === "good")}'>精华</li>
        <li @click='changTab("share")' :class='{tabSelected:(tab === "share")}'>分享</li>
        <li @click='changTab("ask")' :class='{tabSelected:(tab === "ask")}'>问答</li>
        <li @click='changTab("job")' :class='{tabSelected:(tab === "job")}'>招聘</li>
        <li @click='changTab("dev")' :class='{tabSelected:(tab === "dev")}'>客户端测试</li>
      </ul>
      <ul class="content">
        <li v-for="list in lists">
          <span class="avatar">
            <router-link :to="{name:'UserInfo', params:{loginname:list.author.loginname}}"><img :src="list.author.avatar_url" width="30px"></router-link>
          </span>
          <span class="replyAvisit"><span class="replyCount">{{list.reply_count}}</span>/<span class="visitedCount">{{list.visit_count
              }}</span></span>
          <span class="tab">
            <span :class="[{goodTab:(list.good === true || list.top === true),normalTab:(list.good !== true && list.top !== true)}]">{{list | formateTab}}</span>
          </span>
          <span class="title">
            <router-link :to="{name:'PostArticle', params:{id:list.id,loginname:list.author.loginname}}">{{list.title}}</router-link>
          </span>
          <span>{{list.last_reply_at | formateDate}}</span>
        </li>
      </ul>
    </div>
    <pagination @pageNumber='pageRender' ref="pagination" />
  </div>
</template>
<script>
import Pagination from '../components/pagination.vue'
export default {
  name: 'postList',
  data() {
    return {
      url: 'https://cnodejs.org/api/v1/topics',
      tab: 'all',
      isLoading: false,
      lists: [],
      currentPage: 1
    }
  },
  components: { Pagination },
  methods: {
    getData() {
      this.$http.get(this.url, {
        params: {
          page: this.currentPage,
          limit: 20,
          tab: this.tab
        }
      }).then(response => {
        this.lists = response.data.data
        this.isLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    pageRender(number) {
      this.currentPage = number
      this.getData()
    },
    changTab(tab) {
      this.tab = tab
      this.currentPage = 1
      this.getData()
      this.$refs.pagination.changePage(1)
    }
  },
  beforeMount() {
    this.isLoading = true
    this.getData()
  }
}

</script>
<style scoped>
li {
  list-style: none;
}

.title>a {
  line-height: 34px;
}

.title>a:link {
  text-decoration: none;
  color: #333;
}

.title>a:visited {
  color: #888;
}


.title>a:hover {
  text-decoration: underline;
}


.selectBar {
  display: flex;
  padding: 10px;
  background: #f6f6f6;
}

.selectBar>li {
  margin: 0 10px;
  color: #80BD01;
  text-decoration: none;
  cursor: pointer;
  padding: 3px 4px;
  border-radius: 3px;
}

.selectBar>li:hover {
  color: #005580;
}

.selectBar>.tabSelected {
  background: #80bd01;
  color: white;
}

.selectBar>.tabSelected:hover {
  color: white;
}

.content>li {
  display: flex;
  padding: 10px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}

.content>li:hover {
  background: #f5f5f5;
}

.avatar {
  height: 30px;
  width: 30px;
}

.avatar>a {
  display: block;
  height: 30px;
}

.replyAvisit {
  min-width: 70px;
  text-align: center;
  line-height: 34px;
  font-size: 12px;
}

.replyCount {
  font-size: 14px;
  color: #9E78C0;
}

.visitedCount {
  color: #B4B4B4;
}

.title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tab {
  text-align: center;
  margin: 0 5px;
  line-height: 34px;
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

</style>
