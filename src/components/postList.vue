<template>
    <div class="PostList">
        <div class="loading" v-if="isLoading">
            <a href="#"><img src="../images/loading.png" alt="加载中"></a>
        </div>

        <div class="post" v-else>
            <ul>
                <li>
                    <div class="toobar">
                        <a href="#"><span>全部</span></a>
                        <a href="#"><span>精华</span></a>
                        <a href="#"><span>分享</span></a>
                        <a href="#"><span>问答</span></a>
                        <a href="#"><span>招聘</span></a>
                        <a href="#"><span>客户端测试</span></a>
                    </div>
                </li>
                <li v-for="(post, index) in posts" :key="index">
                    <!-- 头像  -->
                    <router-link :to="{
                        name: 'user_info',
                        params: {
                            loginname: post.author.loginname,
                        }
                    }">
                        <img :src="post.author.avatar_url" alt="头像" />
                    </router-link>

                    <!-- 回复/浏览 -->
                    <span>
                        <span class="reply_count"><span>{{ post.reply_count }}</span></span>
                        <span class="visit_count">
                            /{{ post.visit_count }}
                        </span>
                    </span>
                    <!-- 动态帖子分类 -->
                    <span
                        :class="[{ post_good: (post.good == true), put_top: (post.top == true), 'topiclist-tab': (post.good != true && post.top != true) }]">
                        {{ post | tabFormatter }}
                    </span>
                    <!-- 标题 -->
                    <router-link :to="{
                        name: 'post_content',
                        params: {
                            id: post.id,
                            loginname: post.author.loginname,
                        },
                    }">
                        <span class="title">
                            {{ post.title }}
                        </span>
                    </router-link>
                    <!-- 最后回复时间 -->
                    <span class="last_reply_at">
                        <!-- <img src="post.author[index].avatar_url"> -->
                        {{ post.last_reply_at | formatDate }}
                    </span>
                </li>
                <Pagination @handleList="raderList"></Pagination>
            </ul>
        </div>
    </div>
</template>

<script>
import Pagination from './Pagination.vue'
export default {
    name: 'PostList',
    data() {
        return {
            isLoading: false,
            posts: [],//容纳当前文章的所有内容
            postpage: 1,
        }
    },
    components: {
        Pagination
    },
    methods: {

        getData() {
            this.$http.get('https://cnodejs.org/api/v1/topics', {
                params: {
                    page: this.postpage,
                    limit: 40,
                }
            })
                .then(res => {
                    //加载成功
                    this.isLoading = false;//加载图隐藏
                    this.posts = res.data.data //将加载的数据放入定义好的数组

                })
                .catch(err => {
                    console.log(err);
                })
        },
        raderList(value) {
            this.postpage = value;
            this.getData();
            // alert(value);
        }
    },
    //页面加载成功之前的操作
    beforeMount() {
        this.isLoading = true;
        this.getData();
    }

}
</script>

<style scoped>

.PostList {
    background-color: #ffffff;
}

img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    cursor: pointer;
}

ul {
    list-style: none;
}

.toobar {
    height: 40px;
    display: flex;
    align-items: center;
    background: #f5f5f5;
}

.toobar span {
    margin-left: 20px;
    color: #80BD01;
    padding: 2px;
    font-size: 14px;
    border-radius: 10%;
}

.toobar a:first-child span {
    color: #ffffff;
    background-color: #80BD01;
}

.toobar span:hover {
    color: #08c;
}

ul li:not(:first-child) {
    padding: 9px;
    font-size: 15px;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
    font-weight: 400;
    background-color: white;
    color: #333;
    border-top: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    position: relative;
}

li:not(:first-child):hover {
    background: #f5f5f5;

}

.reply_count {
    margin-left: 10px;
    color: #9e78c0;
    font-size: 14px;
    display: inline-block;
    width: 20px;

}

.reply_count span {
    display: flex;
    justify-content: flex-end;
}

.visit_count {
    font-size: 10px;
    color: #B4B4C5;
    display: inline-block;
    width: 40px;

}

.title {
    margin-left: 10px;
    color: #333333;
    cursor: pointer;
    display: flow-root;
    white-space: nowrap;
    /*强行不换行 */
    text-overflow: ellipsis;
    /*多余的。。。 */
    overflow: hidden;
    /*超出隐藏 */
}

.title:hover {
    text-decoration: underline;
}

.put_good,
.put_top {
    margin-left: 10px;
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
    margin-left: 10px;
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
</style>
