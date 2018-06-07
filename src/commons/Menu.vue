<template>
  <aside class="menu" :class="{isOpen:!open}">
    <h3 @click="isOpen">
      <i class="iconfont" v-html = "open?`&#xe606;`:`&#xe602;`"></i>
    </h3>
    <ul role="menubar" class="el-menu">
      <li v-for="(item,index) in menuList" @click="clickFn(index)"  :key="index">
            <el-tooltip v-if="!open" class="item" effect="dark" :content="item.name" placement="right">
                <router-link tag="div" :to="item.link">
                  <i class="iconfont" v-html="item.iconfont"></i>
                  <span class="menu-name" >{{item.name}}</span>
                </router-link>
            </el-tooltip>
            <router-link v-if="open" tag="div" :to="item.link">
              <i class="iconfont" v-html="item.iconfont"></i>
              <span class="menu-name" >{{item.name}}</span>
            </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
      isCollapse: false,
      menuList: this.$lcf.config.menuList.menuList,
      isActive: 0, 
      open: true,
    }
  },
  computed: {
    appMenuOpen() {
        return this.$store.state.global.isAppMenuOpen;
    },
  },
  watch: {
    appMenuOpen: {
        handler(newVal) {
            this.open = newVal
        },
        immediate: true
    }
  },
  created(){
    
  },
  methods: {
    clickFn(index){
      this.isActive = index;
    },
    isOpen(){
      this.open = !this.open; 
      this.UpdateIsAppMenuOpen(this.open);
    },
    ...mapMutations([
        'UpdateIsAppMenuOpen'
    ]),

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .isOpen{
    width: 60px;
    h3{
      .isOpenFont{
        -moz-transform:scaleX(-1);
        -webkit-transform:scaleX(-1);
        -o-transform:scaleX(-1);
        transform:scaleX(-1);
        /*IE*/
        filter:FlipH;
      }
    }
    .el-menu{
      height: 100%;
      background-color: $-color-theme-menu;
      li{
        text-align: center;
        .iconfont{
          left: 20px;
        }
      }
    }
  }
  aside{
    position: fixed;
    left: 0;
    top: 60px;
    width: 180px;
    height: 100%;
    overflow: hidden;
    z-index: 100;
    background-color: $-color-theme-menu;
    h3{
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      .iconfont{
        font-size: 20px;
        color: #ccc;
      }
      &:hover{
        .iconfont{
          color: #fff;
        }
      }
    }
    
    .el-menu{
      height: 100%;
      background-color: $-color-theme-menu;
      border: none;
      li{
        div{
          padding: 0 10px;
        }
        height: 50px;
        line-height: 50px;
        color: #fff;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        &:hover{
          background-color: $-color-theme-bg;
        }
        .iconfont{
          font-size: 20px;
          vertical-align: middle;
          position: absolute;
          left: 30px;
        }
        span{
          margin-left: 16px;
          vertical-align: middle;
          padding-left: 40px;
          white-space:nowrap; 
          overflow:hidden; 
          text-overflow:ellipsis;
        }
        
      }
      li.isActive{
          background-color: $-color-theme-bg;
      }
    }
    header{
      width: 180px;
      height: 60px;
      cursor: pointer;
    }

  }
 
  
</style>
