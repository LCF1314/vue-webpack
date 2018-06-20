<template>
  <aside class="menu" :class="{isOpen:!open}">
    <h3 @click="isOpen">
      <i class="iconfont" v-html = "open?`&#xe606;`:`&#xe602;`"></i>
    </h3>
    <ul role="menubar" class="el-menu">
      <li v-for="(item,index) in menuList" @click="clickFn(index)"  :key="index" @mouseenter = "rowIndex = index">
            <el-tooltip v-if="!open && !item.child" class="item" effect="dark" :content="item.name" placement="right">
                <router-link tag="div" :to="item.link">
                  <i class="iconfont" v-html="item.iconfont"></i>
                  <span class="menu-name" >{{item.name}}</span>
                </router-link>
            </el-tooltip>
            <div v-if="item.child">
              <i class="iconfont" v-html="item.iconfont"></i>
              <span class="menu-name" >{{item.name}}</span>
              <i class="iconfont icon_arrow" >&#xe70a;</i>
            </div>
            <router-link v-if="open && !item.child" tag="div" :to="item.link">
              <i class="iconfont" v-html="item.iconfont"></i>
              <span class="menu-name" >{{item.name}}</span>
            </router-link>
      </li>
    </ul>
    <ul role="menubar"  class="child-content" :class="{isOpen:!open}" @mouseleave = "rowIndex = 9999999" v-if="menuList[rowIndex] && menuList[rowIndex].child && menuList[rowIndex].child.length > 0">
      <li class = "child_h3" >
          <h3>{{menuList[rowIndex].name}}</h3>
      </li>
      <li class = "child_list" v-for="(item,index) in menuList[rowIndex].child" @click="clickFn(index)" :key="index" >
          <router-link tag="div" :to="item.link">
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
      child: '',
      rowIndex: 9999999,
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
    mouseover(){
      log(111)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .isOpen{
    width: 60px;
    .child-content{
      left: 60px;
    }
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
  .child{
    display: block;
  }
  aside{
    position: fixed;
    left: 0;
    top: 60px;
    width: 180px;
    height: 100%;
    // overflow: hidden;
    z-index: 1002;
    background-color: $-color-theme-menu;
    .child-content{
      position: absolute;
      top: 0;
      left: 180px;
      width: 179px;
      height: 100%;
      background-color: $-color-theme-menu;
      border-left: 1px solid hsla(0,0%,100%,.15);
      li{
        color: #fff;
        cursor: pointer;
        div{
            text-align: center;
            height: 40px;
            line-height: 40px;
        }
        &:hover{
          color: $-color-theme-bg;
          // background-color: $-color-theme-bg;
        }
        .iconfont{
          font-size: 20px;
          vertical-align: middle;
        }
        span{
          margin-left: 16px;
          vertical-align: middle;
          white-space:nowrap; 
          overflow:hidden; 
          text-overflow:ellipsis;
        }
        h3{
          font-size: 18px;
        }
      }
      li.child_list{
        div{
            text-align: center;
            height: 50px;
            line-height: 50px;
        }
      }
        
    }
    h3{
      background: $-color-theme-menu-h3;
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
        overflow: hidden;
        // height: 50px;
        line-height: 50px;
        color: #fff;
        position: relative;
        cursor: pointer;
        &:hover{
          // background-color: $-color-theme-bg;
          color: $-color-theme-bg;
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
        .icon_arrow{
          left: 150px;
        }
        ul{
          background-color: #373d41;
          font-size: 14px;
          .iconfont{
            font-size: 14px;
          }
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
