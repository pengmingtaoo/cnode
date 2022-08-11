<template>
    <div id="article">
        <div class="loading" v-if="isLoading">
            <a href="#"><img src="../images/loading.png" alt="加载中"></a>
        </div>
        <div v-else>
            <div class="topic_header">
                <div class="topic_title">
                    <!-- 动态帖子分类 -->
                    <span
                        :class="[{ post_good: (post.good == true), put_top: (post.top == true), 'topiclist-tab': (post.good != true && post.top != true) }]">
                        {{ post | tabFormatter }}
                    </span>
                    {{ post.title }}
                </div>
                <ul>
                    <li>发布于{{ post.create_at | formatDate }}</li>
                    <li>作者 {{ post.author.loginname }}</li>
                    <li>{{ post.visit_count }} 次浏览</li>
                    <li>最后一次编辑是 {{ post.last_reply_at | formatDate }}</li>
                    <li>来自 {{ post | tabFormatter }}</li>
                </ul>
                <hr>
                <div v-html="post.content" class="topic_content"></div>
            </div>

            <div class="topic_reply">
                <!-- 回复 -->
                <div class="topbar">
                    <span v-if="post.replies.length > 0">
                        {{ post.replies.length }} {{ isReplyNum }}
                    </span>
                    <!-- <span v-else></span> -->
                </div>
                <!-- //回复列表 -->
                <div v-for="(reply, index) in post.replies" :key="index" class="replySec">
                    <div class="replyUp">
                        <router-link :to="{
                            name: 'user_info',
                            params: {
                                loginname: reply.author.loginname,
                            }
                        }">
                            <img :src="reply.author.avatar_url" alt="">
                        </router-link>
                        <span class="left">
                            <router-link :to="{
                                name: 'user_info',
                                params: {
                                    loginname: reply.author.loginname,
                                }
                            }">
                                <span>{{ reply.author.loginname }}</span>
                            </router-link>
                            <span>
                                {{ index + 1 }}楼•{{ post.create_at | formatDate }}
                            </span>
                        </span>
                        <span class="right">
                            <span v-if="reply.ups.length > 0">
                                {{ reply.ups.length }}
                            </span>
                            <span v-else></span>
                        </span>
                    </div>
                    <p v-html="reply.content"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ArticleApp',
    data() {
        return {
            isLoading: false,//是否正在加载
            post: {},//代表当前文章页面的所以内容，所有属性
            isReplyNum: '回复',
        }
    },
    methods: {
        getArticleData() {
            // this.$http.get('https://cnodejs.org/api/v1/topic/' + this.$route.params.id)
            this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
                .then(res => {
                    if (res.data.success == true) {
                        this.isLoading = false;
                        this.post = res.data.data;
                    }
                })
                .then(err => {
                    console.log(err);
                })
        }
    },
    beforeMount() {
        this.isLoading = true;
        this.getArticleData();
    },
    watch: {
        '$route'() {
            this.getArticleData();
        }
    }

}
</script>

<style scoped>
@import url('../assets/markdown-github.css');

#article {
    background-color: #fff;
}


.topic_header {
    font-size: 22px;
    display: inline-block;
    vertical-align: bottom;
    width: 1024px;
}


.topic_title {
    font-weight: 700;
    margin-top: 15px;
    margin-left: 8px;
}

.put_good,
.put_top {
    margin-left: 5px;
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
    margin-left: 5px;
}

.topic_header ul {
    font-size: 12px;
    color: #838383;
    margin-left: 8px;
    margin-top: 7px;
    margin-bottom: 7px;
    list-style: none;
}

.topic_header ul li {
    display: inline-block;
}

.topic_header ul li::before {
    font-size: 12px;
    display: inline-block;
    content: '';
    background-color: #838383;
    width: 4px;
    height: 4px;
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 2px;
    border-radius: 50%;
}

.topic_content {
    margin: .5em 1em 1em 1em;
}



.topic_reply::before {
    content: '';
    display: flow-root;
    background-color: #e1e1e1;
    height: 12px;

}

.topbar {
    background-color: #F6F6F6;
}

.topbar span {
    display: flow-root;
    padding: 10px 0;
    margin-left: 11px;
    font-size: 14px;
    color: #444444;
}

.replySec {
    border-top: 1px solid #f6f6f6;
}

.replyUp {
    margin: 10px;
    font-size: 13px;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
    position: relative;
}

.replyUp img {
    width: 30px;
    height: 30px;
}

.replyUp .left {
    position: absolute;
    left: 50px;
}

.replyUp .left span:last-child {
    color: #0088CC;
    font-size: 11px;
}

.replyUp .left span:last-child:hover {
    text-decoration: underline;
    cursor: pointer;
}

.replyUp .right {
    position: absolute;
    right: 10px;
}

.replySec p {
    margin-left: 60px;
    margin-top: -20px;
    padding-bottom: 20px;
}
</style>
