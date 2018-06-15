<template>
    <!-- **路由导航组件 -->
    <div class="subnav-box" >
        <div class="subnav">
            <div class="iconfont icon-back"  @click.stop.prevent="scrollClick('left')">&#xe74b;</div>
            <div class="fl nav-list raw-list_box">
                <nav class="clearfix" :style="{transform: `translateX(${translateX}px)`}">
                    <router-link 
                        :to="{path: item.path}" 
                        class="raw-list_item" 
                        v-for="(item, index) in tabRouter" 
                        :key="index"
                        :title="item.name"
                        :class="[{'router-link-exact-active':$route.name == item.name},{'router-link-active':$route.name == item.name}]">
                        <span>{{item.name}}</span>
                        <i class="iconfont icon-close" @click.stop.prevent="removeTab(item.name, index)" v-if="item.name!=rootRouter.name">&#xe6f3;</i>
                    </router-link>
                </nav>
            </div>
            <div class="iconfont icon-more" @click.stop.prevent="scrollClick('right')">&#xe70a;</div>
            <div class="close-all iconfont" :class="{'close-all-bg':allClose}" @click="allCloseClickFn">&#xe603;</div>
            <ul class="allClose" v-if="allClose" @mouseleave="allClose = false">
                <!--<li @click="closeClick('news')"><i class="iconfont">&#xe798;</i>刷新当前</li>-->
                <li @click="closeClick('other')"><i class="iconfont">&#xe6f3;</i>关闭其他</li>
                <li @click="closeClick('all')"><i class="iconfont">&#xe64f;</i>全部关闭</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex';
    export default {
        props: {
            rootRouter: {
                type: Object,
                default: () => {
                    return {
                        path: '/AppContent/index',
                        name: '首页'
                    }
                }
            },
            isShowNotice: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                tabRouter: [
                    this.rootRouter
                ],
                runScroll: false,
                boxWidth: '',
                liAllLen: 1,
                translateX: 0,  // 平移位置
                isindex: true,
                allClose: false,
                liWidth: 100,
            }
        },
        computed:{
            ...mapState({
                // 从vuex获取要删除的router
                deleteRouter: state => {
                    return state.global.deleteRouter;
                },
            })
        },
        mounted(){
            window.addEventListener('resize', this.watch_resize);
            const defaultboxWidth = document.querySelector('.raw-list_box');
            this.boxWidth = defaultboxWidth.offsetWidth;
            this.liAllLen = this.tabRouter.length * this.liWidth;
            this.runScroll = this.liAllLen > this.boxWidth ? true : false;
            this.setNavItem(); 
            
        },
        beforeDestory() {
            window.removeEventListener('resize', this.watch_resize);
        },
        watch: {
            "$route": "setNavItem",
            runScroll(val) {
                if(!val) {
                    this.translateX = 0;
                }
            },
        },
        methods: {
            allCloseClickFn(){
                this.allClose = !this.allClose;
            },
            closeClick(type){
                switch(type){
                    case 'news':
                        // this.$router.replace({
                        //     path: this.$route.path,
                        //     name: this.$route.name,
                        // });
                        // this.$route.meta.keepAlive = true; // 用于单据列表缓存
                    break;
                    case 'other':
                        this.tabRouter = this.tabRouter.filter((i, index) => {
                            return (i.name == this.$route.name || i.name == '首页')
                        })
                    break;
                    case 'all':
                        this.tabRouter = this.tabRouter.filter((i, index) => {
                            return i.name == '首页'
                        })
                        this.$router.push(this.tabRouter[0].path);
                    break;
                    default:
                    break;
                }
                this.allClose = false;
            },
             // 添加
            setNavItem() {
                this.addtabRouter();
            },
            addtabRouter() {
                if(!this.$route.name) return;
                // 判断路由导航不存在
                const Res = this.tabRouter.some(item => {
                    return this.$route.name == item.name;
                })
                const defaultboxWidth = document.querySelector('.raw-list_box');
                this.boxWidth = defaultboxWidth.offsetWidth;
                const nums = this.boxWidth / this.liWidth;
                if(!Res){
                    this.$route.meta.keepAlive = false; // 用于单据列表缓存
                    this.tabRouter.push({
                        path: this.$route.path,
                        name: this.$route.name
                    })
                    if((this.tabRouter.length - nums) <= 0){
                         return;
                    }
                    const len = Math.ceil(this.tabRouter.length - nums);
                    this.translateX = -len * this.liWidth;
                }else {
                     this.$route.meta.keepAlive = true; // 用于单据列表缓存
                    // 判断数组中有的话 循环找到具体位置用当前路由替换旧数据
                    this.tabRouter.forEach((i, index) => {
                        if(i.name === this.$route.name) {
                            this.tabRouter.splice(index, 1, {
                                path: this.$route.fullPath, 
                                name: this.$route.name,
                            })
                            this.liAllLen = this.tabRouter.length * this.liWidth;
                            const len = Math.ceil(this.tabRouter.length - nums);
                            if(len > 0){
                                if(index < len){
                                    this.translateX =  -index * this.liWidth;
                                }else if(Math.ceil(index - nums) > 0 && Math.ceil(index - nums) < len){
                                    log(Math.ceil(index - nums))
                                    this.translateX =  -(index-len-1) * this.liWidth;
                                }
                            }
                        }
                    })
                }
            },
            // 检测浏览器窗口发生变化
            watch_resize() {   
                let defaultboxWidth = document.querySelector('.raw-list_box');
                this.boxWidth = defaultboxWidth.offsetWidth;
                this.liAllLen = this.tabRouter.length * this.liWidth;
                this.runScroll = this.liAllLen > this.boxWidth ? true : false;
            },
            removeTab(name, index){
                if(this.$route.name == name){
                    const nextPathItem = this.tabRouter[index - 1];
                    this.$router.push(nextPathItem.path);
                }
                this.tabRouter.splice(index, 1);
            },
            scrollClick(direction){
                this.liAllLen = this.tabRouter.length * this.liWidth;
                let defaultboxWidth = document.querySelector('.raw-list_box');
                this.boxWidth = defaultboxWidth.offsetWidth;
                const _onceWidth = this.liAllLen * .3;
                const _endWidth = this.liAllLen * .5;
                if(direction == 'left' && this.translateX > -_endWidth && this.liAllLen > this.boxWidth) {
                    this.translateX -= _onceWidth;
                }else if(direction == 'right' && this.translateX < 0 && this.liAllLen > this.boxWidth) {
                    this.translateX = _onceWidth > this.translateX ? 0 : this.translateX + _onceWidth;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
   *, *:before, *:after {-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;-webkit-text-size-adjust: none;}
    .subnav-box {
        position: fixed; height: 40px; line-height: 40px; width: 100%; z-index: 1001; background: #ffffff; color: #494949;top: 60px; transition: top .4s;font-size: 14px;
    }
    .subnav {
        position: relative; padding: 0 74px 0 45px;
        .line-lf {
            border-left: 1px solid #c5d7e5;
        }
        .close-all {
            position: absolute; top: 0; right: 0; font-size: 12px; padding: 0 10px; color: $-color-label; cursor: pointer;&:hover{ background: #e9ecf0;}
        }
        .close-all-bg{
            background: #e9ecf0;
        }
        .icon-back, .icon-more {
            position: absolute; top: 0; padding: 0 12px; font-size: 20px; cursor: pointer;
        }
        .icon-back {
            left: 0;
            &:hover{
                background: #e9ecf0;
            }
        }
        .icon-more {
            right: 32px;
            &:hover{
                background: #e9ecf0;
            }
        }
        .nav-list {
            width: 100%; height: 100%; overflow: hidden;
            >.clearfix{
                width: 6000px; transition: transform .5s ease;
            }
            .raw-list_item {
                box-sizing:border-box; 
                float: left;
                width: 100px;
                span{
                    display: inline-block;
                    width: 60px;
                    overflow: hidden; 
                    text-overflow:ellipsis; 
                    white-space: nowrap;
                    vertical-align: middle;
                }
                text-align: center;
                padding: 0;
                &.router-link-exact-active{
                    background: #e9ecf0;
                    border-right: 1px solid #c5d7e5;
                    border-left: 1px solid #c5d7e5;
                }
            }
            a {
                color: $-color-label; box-sizing: border-box;
                &:hover {
                    text-decoration: none;
                    background: #e9ecf0;
                }
            }
            .icon-close {
                font-size: 12x; cursor: pointer; border-radius: 50%; padding: 2px;
                vertical-align: middle;
                &:hover{
                    padding: 2px;
                    background: #A7ADAF;
                    color: #fff;
                }
            }
        }
        .allClose{
            position: absolute;
            background: #fff;
            right: 0;
            top: 42px;
            border: 1px solid #ccc;
            width: 130px;
            border-radius: 6px;
            li{
                cursor: pointer;
                font-size: 14px;
                text-align: center;
                vertical-align: middle;
                .iconfont{
                    font-size: 16px;
                    vertical-align: middle;
                    margin-right: 10px;
                }
                &:hover{
                    background: #e9ecf0;
                }
            }
        }
    }
</style>