<template>
  <header class="headBar">
    <div class="headContainer">
      <div class="logo">
        <router-link :to='{name:"RootPage"}'><img src="../../static/cnodejs_light.svg" width="120px"></router-link>
      </div>
      <div class="search">
        <span style="font-size:18px;">
          <form method="get" action="http://www.google.com/search" target="_blank">
            <input name="q" size="40" maxlength="255" type="text" />
          </form>
        </span>
      </div>
      <nav class="nav">
        <ul>
          <li>
            <router-link :to='{name:"RootPage"}'>首页</router-link>
          </li>
          <li><a href="https://cnodejs.org/getstart">新手入门</a></li>
          <li><a href="https://cnodejs.org/api">API</a></li>
          <li><a href="https://cnodejs.org/about">关于</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  name: 'headBar'
}

</script>
<style scoped='true'>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ul {
  display: flex;
}

li {
  list-style: none;
  padding: 10px 15px;
}

a {
  text-decoration: none;
  color: #ccc;
  white-space: nowrap;
}

a:hover {
  color: white;
}

img {
  padding: 6px;
}

.headBar {
  background: #444444;
  padding: 5px;
}

.headContainer {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  height: 40px;

}

.headContainer>div:nth-child(2) {
  flex: 1;
}

.logo>a {
  display: block;
}

.search {
  padding: 7px;
  padding-top: 8px;
  position: relative;
}

.search::before {
  content: '⚲';
  display: block;
  position: absolute;
  transform: rotate(45deg);
  color: #444444;
  left: 15px;
  top: 5px;
  font-size: 25px;
}

input {
  font-size: 15px;
  border-radius: 20px;
  background: #ccc;
  border: none;
  padding: 5px 10px 5px 30px;
  outline: none;
}

input:hover,
input:focus {
  background: white;
}

</style>
