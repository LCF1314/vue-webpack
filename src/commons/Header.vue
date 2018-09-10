<template>
    <header v-if="userInfo">
        <div class="fl header-fl" >
          后台管理系统
        </div>
        <div class="fr">
         
          <i class="iconfont">&#xe642;</i>
          <div class="userName">
            您好，{{userName}}，欢迎您登录
          </div>
          <div class="header-fr" @click = "backFn" title ="退出">
            <i class="iconfont">&#xe60b;</i>
          </div>
        </div>
    </header>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
    }
  },
  computed: {
      appMenuOpen() {
          return this.$store.state.global.isAppMenuOpen;
      },
  },
  created() {
      this.userInfo = localStorage.getItem('userInfo');
      if(!localStorage.getItem('userInfo')){
          this.$router.push('/');
          return;
      }
      this.userName = JSON.parse(localStorage.getItem('userInfo')).username;
  },
  methods: {
    backFn(){
      this.$confirm('您确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          localStorage.clear();
          setTimeout(() =>{
              this.$router.push('/');
          },1000)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出。'
          });
        });
      
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    header{
        min-width: 500px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1001;
        width: 100%;
        height: 60px;
        background-color: $-color-theme;
        .header-fl{
          width: 180px;
          line-height: 60px;
          text-align: center;
          color: #fff;
          font-size: 18px;
          font-weight: 600;
        }
        .appContent-view-close{
            width: 60px;
        }
        .fr{
          div{
            display: inline-block;
          }
          .iconfont{
            font-size: 20px;
            color: #fff;
            vertical-align: middle;
          }
        }
        .userName{
          color: #fff;
          font-size: 12px;
        }

        .header-fr{
          margin-left: 20px;
          width: 60px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          background: $-color-theme-bg;
          color: #fff;
          .iconfont{
            font-size: 18px;
          }
          cursor: pointer;
        }
    }
    
</style>
