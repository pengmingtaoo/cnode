<template>
    <div class="loading" v-if="isLoading">
        <a href="#"><img src="../images/loading.png" alt="加载中"></a>
    </div>
    <div class="slideBar" v-else>
        <!-- //作者 -->
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

        <!-- 其他话题 -->
        <div class="before">
            <div class="recent_topics">
                <span class="topics_title">{{ recent_topics }}</span>
                <ul>
                    <li v-for="(list, id) in recent_topicsBy5" :key="id">
                        <router-link :to="{
                            name: 'post_content',
                            params: {
                                id: list.id,
                                loginname: list.author.loginname,
                            },
                        }">
                            <span>{{ list.title }}</span>
                        </router-link>
                    </li>

                </ul>
            </div>
        </div>
        <!-- 无人回复的话题 -->
        <div class="before">
            <div class="recent_replies">
                <span class="replies_title">{{ recent_replies }}</span>
                <ul>
                    <li v-for="(list, id) in recent_topicsBy0" :key="id">
                        <router-link :to="{
                            name: 'post_content',
                            params: {
                                id: list.id,
                                loginname: list.author.loginname,
                            },
                        }">
                            <span>{{ list.title }}</span>
                        </router-link>
                    </li>
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
            autherinfo: '作者',
            jifen: '积分： ',
            recent_topics: '作者其他话题',
            recent_replies: '无人回复的话题',
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
    computed: {
        recent_topicsBy5() {
            if (this.userInfo.recent_topics.length > 5) {
                return this.userInfo.recent_topics.slice(0, 5);
            } else {
                return this.userInfo.recent_topics;
            }
        },
        recent_topicsBy0() {

            if (this.userInfo.recent_replies.length > 0) {
                return this.userInfo.recent_replies.slice(0, 5);
            } else {
                return this.userInfo.recent_replies;
            }
        }
    }

}
</script>

<style scoped>
.slideBar {
    background-color: #fff;
}

.slideBar .info_title,
.topics_title,
.replies_title {
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

.recent_replies ul,
.recent_topics ul {
    list-style: none;
}

.recent_replies ul li,
.recent_topics ul li {
    max-width: 290px;
    font-size: 14px;
    color: #778087;
    cursor: pointer;
    padding: 15px 10px 0px 10px;
    white-space: nowrap;
    /*强行不换行 */
    text-overflow: ellipsis;
    /*多余的。。。 */
    overflow: hidden;
    /*超出隐藏 */
}

.recent_replies ul li span,
.recent_topics ul li span {
    color: #778087;
}

.recent_replies ul li:last-child,
.recent_topics ul li:last-child {
    padding-bottom: 15px;
}
</style>
