import Router from 'vue-router' 
import Vue from 'vue'
import Article from '../components/Article'
import PostList from '../components/postList'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'
import PostLIstSlideBar from '../components/PostLIstSlideBar'
import UserInfoSlideBar from '../components/UserInfoSlideBar'

Vue.use(Router)

export default new Router({
    routes: [
        {
            name: 'root',
            path: '/',
            components: {
                main: PostList,
                aside:PostLIstSlideBar,
            }
        },
        {
            name: 'post_content',
            path: '/topic/:id&&:loginname',
            components: {
                main: Article,
                aside:SlideBar,
            }
        },
        {
            name: 'user_info',
            path: '/userInfo/:loginname ',
            components: {
                main: UserInfo,
                aside:UserInfoSlideBar,

            }
        },

    ]
})