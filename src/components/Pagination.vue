<template>
    <div class="pagination">
        <ul>
            <li @click="changeBtn">«</li>
            <li v-if="jduge" class="pagebtn">...</li>
            <li v-for="(btn, id) in pagebtns" :key="id" :class="[{ currentPage: btn == currentPage }, 'pagebtn']"
                @click="changeBtn(btn)">{{ btn }}
            </li>
            <li @click="changeBtn">»</li>
        </ul>

    </div>
</template>

<script>
import $ from 'jquery'
export default {
    name: 'PaginAtion',
    data() {
        return {
            pagebtns: [1, 2, 3, 4, 5, '...'],
            currentPage: 1,
            jduge: false,
        }
    },
    methods: {
        changeBtn(page) {
            if (typeof page != 'number') {
                //表示点击的按钮
                switch (page.target.innerText) {
                    case '»':
                        $('li.currentPage').next().click();
                        break;
                    case '«':
                        this.pagebtns = [1, 2, 3, 4, 5, '...'],
                            this.changeBtn(1);
                        break;
                    default:
                        break;
                }
                return;
            }

            this.currentPage = page;
            // 隐藏前面的数字，出现...
            if (page > 3) {
                this.jduge = true;
            } else {
                this.jduge = false;
            }
            //点相应的页码切换当前页面
            if (page == this.pagebtns[3] && page != '...') {
                this.pagebtns.shift();//移除第一个
                this.pagebtns.splice(4, 0, this.pagebtns[3] + 1);//添加最后一个
            } else if (page == this.pagebtns[0] && page != 1 && page != '...') {//page != 1，减到1就停止
                this.pagebtns.unshift(this.pagebtns[0] - 1);//第一位值添加一个
                this.pagebtns.splice(5, 1);//移除最后一个
            }
            this.$emit('handleList', this.currentPage);
        }
    }
}
</script>

<style scoped>
.pagination {
    background-color: #fff;
}

ul {
    border: 1px solid #ddd;
    display: inline-block;
    border-radius: 4px;
    margin: 10px;
}

li {
    background-color: #fff;
    display: inline-block;
    border-right: 1px solid #ddd;
    padding: 4px 10px;
    font-size: 13px;
    color: #778087;
    cursor: pointer;
}


li:last-child {
    border-right: 0;
    border-radius: 0 4px 4px 0;
}

li:first-child {
    border-radius: 4px 0 0 4px;
}

.currentPage {
    color: #A1BD01;
}

.pagebtn:hover {
    background-color: #f5f5f5;
}

.currentPage:hover {
    background-color: #fff;
    color: #778087;
}
</style>
