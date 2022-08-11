<template>
  <div class="header">
    <div class="all">
      <div class="left">
        <router-link :to="{ name: 'root' }">
          <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" />
        </router-link>
        <form action="https://www.baidu.com/s" method="get" target="_blank">
          <input type="text" class="in" name="wd" value>
        </form>
      </div>
      <div class="right">
        <ul>
          <router-link :to="{ name: 'root' }">
            <li>首页</li>
          </router-link>
          <li><a href="https://cnodejs.org/getstart">新手入门</a></li>
          <li><a href="https://cnodejs.org/api">API</a></li>
          <li><a href="https://cnodejs.org/about">关于</a></li>
          <li>注册</li>
          <li>登录</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'HeaderApp',


}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  height: 50px;
  background: #444444;
}

.all {
  display: flex;
  justify-content: space-between;
}

.header .left {
  margin-left: 74px;
  height: 50px;
  position: relative;
}

.header .right {
  margin-right: 60px;
}

.header .left img {
  height: 50px;
  max-width: 120px;
  margin-top: -4px;
}


.header .left input {
  position: absolute;
  top: 13px;
  left: 138px;
  height: 27px;
  width: 235px;
  border-radius: 20px;
  border: none;
  outline: none;
  background: url(../images/s1.png) 6px 7px no-repeat #888;
  padding: 6px 5px 3px 25px;
  transition: background .6s;

}

.header .left input:hover,
.header .left input:focus {
  background: url(../images/s1.png) 6px 7px no-repeat #fff;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  list-style: none;
}

a,
li {
  height: 50px;
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 13.5px;
  color: #CCCCC3;
  cursor: pointer;
}

a:hover,
li:hover {
  color: #ffffff;
}
</style>