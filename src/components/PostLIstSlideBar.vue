<template>
    <div class="postlistslidebar">
        <div class="loading" v-if="isLoading">
            <a href="#"><img src="../images/loading.png"></a>
        </div>
        <div v-else>
            <!-- 登录 -->
            <div class="register">
                <ul>
                    <li>CNode:Node.js专业中文社区</li>
                    <li>您可以 <span>登录</span> 或 <span>注册</span> , 也可以</li>
                    <li><span>通过 GitHub 登录</span></li>
                </ul>
            </div>
            <!-- //无人回复的话题 -->
            <div class="before">
                <div class="repliesNull">
                    <ul>
                        <li class="repliesNull_title">无人回复的话题</li>

                        <li v-for="(post, id) in posts" :key="id" class="list">
                            <router-link :to="{
                                name: 'post_content',
                                params: {
                                    id: post.id,
                                    loginname: post.author.loginname,
                                },
                            }">
                                <span>{{ post.title }}</span>
                            </router-link>
                        </li>

                    </ul>
                </div>
            </div>
            <!-- 积分 -->
            <!-- <div class="before">
                <div class="integral">
                    <ul>
                        <li class="integral_title">积分榜 TOP 100 >></li>
                        <li v-for="(post, id) in posts" :key="id" class="list">
                            <span>{{ post.score }}</span>
                        </li>

                    </ul>
                </div>
            </div> -->
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
    </div>
</template>

<script>

export default {
    name: 'PostListSlideBar',
    data() {
        return {
            isLoading: false,
            posts: [],
        }
    },
    methods: {

        getData() {
            this.$http.get('https://cnodejs.org/api/v1/topics', {
                params: {
                    page: 1,
                    limit: 5,
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
        }

    },
    //页面加载成功之前的操作
    beforeMount() {
        this.isLoading = true;
        this.getData();
    }


};
</script>

<style scoped>
.postlistslidebar {
    background-color: #fff;

}

ul {
    list-style: none;
}

.register li:first-child {
    padding: 10px;
    margin-bottom: 10px;
}

.register li:nth-child(2) {
    padding-left: 10px;
}

.register li:nth-child(2) span {
    color: #778087;
    cursor: pointer;
}

.register li:last-child span {
    background-color: #5bc0de;
    display: inline-block;
    font-size: 14px;
    padding: 5px 15px;
    border-radius: 3px;
    margin: 3px 10px;
    letter-spacing: 2px;
    color: #fff;
    cursor: pointer;

}

.register li:last-child span:hover {
    background-color: #08c;
}

.repliesNull .list {
    max-width: 290px;
    font-size: 13px;
    cursor: pointer;
    padding: 7px 10px;
    white-space: nowrap;
    /*强行不换行 */
    text-overflow: ellipsis;
    /*多余的。。。 */
    overflow: hidden;
    /*超出隐藏 */
}

.repliesNull .list span {
    color: #778087;
}

.repliesNull_title,
.integral_title,
.blogroll_title,
.client_title {
    display: flow-root;
    padding: 10px;
    background-color: #f6f6f6;
    font-size: 13px;
    color: #444;
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
