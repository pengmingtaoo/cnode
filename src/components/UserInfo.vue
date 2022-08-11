<template>
    <div id="UserInfo">
        <div class="loading" v-if="isLoading">
            <a href="#"><img src="../images/loading.png" alt="加载中"></a>
        </div>
        <div class="UserInfoTop" v-else>
            <!-- //主页 -->
            <div class="HomePage">
                <router-link :to="{
                    name: 'root'
                }">
                    <span>{{ home }}</span>
                </router-link>
                <span> /</span>
            </div>
            <!-- 信息 -->
            <div class="UserInfoAction">
                <section>
                    <img :src="userInfo.avatar_url" />
                    <span>{{ userInfo.loginname }}</span>
                    <p class="jifen">{{ userInfo.score }} 积分</p>
                    <p>注册时间:{{ userInfo.create_at | formatDate }}</p>
                </section>
            </div>
            <div class="creates">
                <!-- //创建话题 -->

                <div class="CreateTopic">
                    <p>{{ create }}</p>
                </div>

                <div class="CreateContent" v-if="userInfo.recent_topics.length > 0">
                    <ul>
                        <li v-for="(item, id) in userInfo.recent_topics" :key="id">
                            <router-link :to="{
                                name: 'user_info',
                                params: {
                                    loginname: item.loginname,
                                }
                            }">
                                <span class="firstImg">
                                    <img :src="item.author.avatar_url" alt="头像" />
                                </span>
                            </router-link>
                            <!-- 回复/浏览
                            <span>
                                <span class="reply_count"><span>{{ item.reply_count }}</span></span>
                                <span class="visit_count">
                                    /{{ item.visit_count }}
                                </span>
                            </span> -->

                            <router-link :to="{
                                name: 'post_content',
                                params: {
                                    id: item.id
                                }
                            }">
                                <span class="post_content">{{ item.title }}</span>
                            </router-link>
                            <span class="last_reply_at">
                                <!-- <img src="#"> -->
                                {{ item.last_reply_at | formatDate }}
                            </span>
                        </li>
                    </ul>
                </div>
                <div v-else class="isNull">
                    <span>无话题</span>
                </div>
            </div>

            <div class="replies">
                <!-- //回复话题 -->
                <div class="ReplyTopic">
                    <p>{{ reply }}</p>
                </div>
                <div class="ReplyContent" v-if="userInfo.recent_replies.length > 0">
                    <ul>
                        <li v-for="(item, id) in userInfo.recent_replies" :key="id">
                            <router-link :to="{
                                name: 'user_info',
                                params: {
                                    loginname: item.author.loginname,
                                }
                            }">
                                <span class="firstImg">
                                    <img :src="item.author.avatar_url" />
                                </span>
                            </router-link>
                            <!-- 回复/浏览
                            <span>
                                <span class="reply_count"><span>{{ item.reply_count }}</span></span>
                                <span class="visit_count">
                                    /{{ item.visit_count }}
                                </span>
                            </span> -->

                            <router-link :to="{
                                name: 'post_content',
                                params: {
                                    id: item.id
                                }
                            }">
                                <span
                                    :class="[{ post_good: (item.good == true), put_top: (item.top == true), 'topiclist-tab': (item.good != true && item.top != true) }]">
                                    {{ item | tabFormatter }}
                                </span>
                                <span class="post_content">{{ item.title }}</span>
                            </router-link>
                            <!-- 最后回复时间 -->
                            <span class="last_reply_at">
                                <!-- <img src="#"> -->
                                {{ item.last_reply_at | formatDate }}
                            </span>
                        </li>
                    </ul>
                </div>
                <div v-else class="isNull">
                    <span>无话题</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: 'UserInfo',
    data() {
        return {
            isLoading: false,//是否正在加载
            userInfo: {},//代表当前文章页面的所以内容，所有属性
            home: '主页',
            create: '最近创建的话题',
            reply: '最近参与的话题'
        }
    },
    methods: {
        getUserInfoData() {
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
        this.getUserInfoData();
    }
}
</script>

<style scoped>
#UserInfo {
    background-color: #fff;
}

.HomePage {
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #F6F6F6;
    border-bottom: 1px solid #E5E5E5;
}

.HomePage span {
    padding: 2px;
    font-size: 14px;
    color: #CCCCCD;
}

.HomePage span:first-child {
    color: #80BD01;
    margin-left: 10px;
}

.UserInfoAction {
    padding: 10px;
    font-size: 14px;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
    position: relative;
}

.UserInfoAction img {
    width: 40px;
    height: 40px;
}

.UserInfoAction span {
    position: absolute;
    left: 60px;
    color: #778087;
    top: 12px;
}

.UserInfoAction p {
    margin-top: 10px;

}


.creates::before,
.replies::before {
    content: '';
    display: flow-root;
    background-color: #e1e1e1;
    height: 12px;
}

.creates .CreateTopic,
.replies .ReplyTopic {
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #F6F6F6;
    border-bottom: 1px solid #E5E5E5;

}

.creates .CreateTopic p,
.replies .ReplyTopic p {
    padding: 2px;
    font-size: 14px;
    margin-left: 10px;
}

.CreateContent ul,
.ReplyContent ul {
    list-style: none;
}

.CreateContent li .firstImg img,
.ReplyContent li .firstImg img {
    width: 30px;
    height: 30px;
}

.CreateContent li,
.ReplyContent li {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #E5E5E5;
    position: relative;
}

.put_good,
.put_top {
    margin-left: 3px;
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
}

.topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-left: 3px;
}

.CreateContent li span,
.ReplyContent li span {
    margin-left: 5px;
}

.CreateContent li .post_content,
.ReplyContent li .post_content {
    color: #0088CC;
    margin-left: 20px;
}

.CreateContent li .post_content:hover,
.ReplyContent li .post_content:hover {
    color: #426D88;
    text-decoration: underline;
}

.last_reply_at {
    text-align: right;
    width: 75px;
    white-space: nowrap;
    position: relative;
    position: absolute;
    right: 10px;
    color: #8D8087;
    font-size: 12px;
    cursor: pointer;
}

.last_reply_at img {
    width: 15px;
    height: 15px;
    position: absolute;
    left: 0;
    top: 3px;
}

.isNull {
    padding: 15px;
    font-size: 14px;
}
</style>
