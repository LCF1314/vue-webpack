<template>
    <section id="appContent">
        <v-header class="appHeader"></v-header>
        <Menu></Menu>
        <content-subnav class="appContent-view-nav appContent-view-open" :class="{'appContent-view-close': !appMenuOpen}"></content-subnav>
        <div class="appContent-view appContent-view-open" :class="{'appContent-view-close': !appMenuOpen}">
            <keep-alive>
                <router-view ></router-view>
            </keep-alive>
        </div>
    </section>
</template>
<script>
    import VHeader from '../commons//Header';
    import Menu from '../commons/Menu';
    import ContentSubnav from '../commons/ContentSubnav';
    import { mapMutations } from 'vuex';
    export default {
        components: {
            VHeader, Menu, ContentSubnav
        },
        
        data() {
            return { 
                isShowNotice: false
            }
        },
        methods: {

        },
        computed: {
            appMenuOpen() {
                return this.$store.state.global.isAppMenuOpen;
            },
        },
        
    }
</script>

<style lang="scss" scoped>
   .appContent-view-open{
        margin-left: 180px;
   }
   .appContent-view-close{
        margin-left: 60px;
   }
   .appContent-view{
        padding-top: 96px;
        height: 100%;
        background-color: #fff;
        transition: margin-left 0.2s linear;
   }
</style>


