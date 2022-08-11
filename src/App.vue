<template>
  <div id="app">
    <div class="navbar">
      <Header></Header>
    </div>
    <div class="main clearfix">
      <div class="aside">
        <router-view name="aside"></router-view>
      </div>
      <div class="content">
        <router-view name="main"></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-decoration: none;
}

html body {
  width: 100%;
  min-width: 1000px;
  background-color: #e1e1e1;
}

.navbar {
  width: 100%;
}

.main {
  width: 100%;
  max-width: 1400px;
  min-width: 750px;
  margin: 15px auto;
  margin-bottom: 0;
  min-height: 400px;
  overflow: hidden;
}

.content {
  margin-right: 305px;
}

.aside {
  width: 290px;
  font-size: 14px;
  float: right;
}

.clearfix:after {
  content: ' ';
  display: block;
  clear: both;
}

.clearfix {
  zoom: 1;
}
</style>
