<template>
    <div class="loading" v-if="isLoading">
        <a href="#"><img src="../images/loading.png" alt="加载中"></a>
    </div>
    <div class="UserInfoSlideBar" v-else>
        <!-- 个人信息 -->
        <div class="autherinfo">
            <span class="info_title">{{ autherinfo }}</span>
            <div class="autherinfo_list">
                <router-link :to="{
                    name: 'user_info',
                    params: {
                        loginname: userInfo.loginname,
                    }
                }">
                    <img :src="userInfo.avatar_url" alt="">
                </router-link>
                <span class="left">

                    <router-link :to="{
                        name: 'user_info',
                        params: {
                            loginname: userInfo.loginname,
                        }
                    }">
                        <span>{{ userInfo.loginname }}</span>
                    </router-link>
                </span>
                <p class="jifen">{{ jifen }}{{ userInfo.score }}</p>
            </div>
        </div>
        <!-- 友情社区 -->
        <div class="before">
            <div class="blogroll">
                <ul>
                    <li class="blogroll_title">友情社区</li>
                    <li><a href="https://ruby-china.org/" target="_blank">
                            <img src="//static2.cnodejs.org/public/images/ruby-china-20150529.png">
                        </a></li>
                    <li><a href="http://golangtc.com/" target="_blank">
                            <img src="//static2.cnodejs.org/public/images/golangtc-logo.png">
                        </a></li>
                    <li><a href="http://phphub.org/" target="_blank">
                            <img src="//static2.cnodejs.org/public/images/phphub-logo.png">
                        </a></li>
                </ul>
            </div>
        </div>
        <!-- 客户端链接 -->
        <div class="before">
            <div class="client">
                <ul>
                    <li class="client_title">客户端二维码</li>
                    <li>
                        <img width="200px" src="//static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU" />
                    </li>
                    <li><a href="https://github.com/soliury/noder-react-native" target="_blank">客户端源码地址</a></li>
                </ul>
            </div>
        </div>


    </div>
</template>

<script>

export default {
    name: 'slideBar',
    data() {
        return {
            isLoading: false,
            autherinfo: '个人信息',
            jifen: '积分： ',

            userInfo: {},

        }
    },
    methods: {
        getSlideBarData() {
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.loginname}`)
                .then(res => {
                    if (res.data.success == true) {
                        this.isLoading = false;
                        this.userInfo = res.data.data;
                    }
                })
                .then(err => {
                    console.log(err);
                })
        }
    },
    beforeMount() {
        this.isLoading = true;
        this.getSlideBarData();
    },



}
</script>

<style scoped>
.UserInfoSlideBar {
    background-color: #fff;
}

.UserInfoSlideBar .info_title,
.blogroll_title,
.client_title {
    display: flow-root;
    padding: 10px;
    background-color: #f6f6f6;
    font-size: 13px;
    color: #444;
}

.autherinfo_list {
    padding: 10px;
    position: relative;
}

ul {
    list-style: none;
}

.autherinfo_list img {
    width: 50px;
    height: 50px;
}

.autherinfo_list .left {
    color: #778087;
    position: absolute;
    margin: 15px 10px;
}

.autherinfo_list .jifen {
    margin-top: 10px;
}

.before::before {
    content: '';
    display: flow-root;
    background-color: #e1e1e1;
    height: 12px;
}

.blogroll img {
    max-width: 150px;
    font-size: 13px;
    cursor: pointer;
    padding: 7px 10px;
}

.client img {
    margin: 10px 40px 0 40px;
    line-height: 2em;
}

.client a {
    display: inline-block;
    padding: 5px 90px;
    text-align: center;
    color: #778087;
}

.client a:hover {
    text-decoration: underline;
}
</style>
