<template>
  <div class="tab">
    <header class="index-head">
      <h2>监控中心</h2>
      <div class="user-menu">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaolian"></use>
        </svg>
        <el-dropdown @command="userAction">
          <span class="el-dropdown-link">
            {{user.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <div class="index-foot">
      <div class="index-nav">
        <el-menu :default-active="defaultRoute" class="el-menu-vertical-demo" @select="goRouter">
          <el-menu-item index="market"><i class="el-icon-menu"></i>大盘监控</el-menu-item>
          <el-menu-item index="member">综合类会员监控</el-menu-item>
          <el-menu-item index="dealer">交易商监控</el-menu-item>
        </el-menu>
      </div>
      <div class="index-content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tab',
  data(){
     return{
       defaultRoute:'market',
     }
  },
  computed:{
    user:function () {
      return this.$store.state.user
    }
  },
  created:function () {
    console.log(this.$route.name)
    this.defaultRoute = this.$route.name
  },
  methods:{
    userAction:function (command) {
      if(command==='exit'){
        this.$router.replace('/signIn')
      }
    },
    goRouter:function(index){
        this.$router.push('/tab/'+index);
    }
  }
}
</script>

<style lang="less" scoped>
.tab {
  width: 100%;
  height: 100%;
  .index-head{
    width: 100%;
    height: 80px;
    background: #324057;
    position: relative;
    color:#fff;
    h2{
      width: 220px;
      height: 80px;
      background: #1f2d3d;
      font-size: 25px;
      line-height: 80px;
    }
    .user-menu{
      width: auto;
      height: 30px;
      position: absolute;
      right: 40px;
      top:  25px;
      display: flex;
      .icon{
        width: 30px;
        height: 30px;
      }
      .el-dropdown{
        width: auto;
        height: 30px;
        line-height: 30px;
        color: #fff;
        text-align: left;
        font-size: 16px;
        i{
          font-size: 12px;
        }
      }
    }
  }
  .index-foot{
    width: 100%;
    height: calc(~"100% - 80px");
    display: flex;
    .index-nav{
      width: 220px;
      height: 100%;
      background:#324057;
      .el-menu{
        background:#1f2d3d;
        font-size:14px;
        line-height:14px;
      }
      .el-menu-item{
        color:#99a9bf;
        text-align: left;
        text-indent: 24px;
      }
      .el-menu-item:nth-of-type(1){
        text-indent: 0;
      }
      .el-menu-item:hover{
        color: #fff;
        background:#324057;
      }
      .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
        color: #fff;
        background:#5e6d82;
      }
    }
    .index-content{
      flex: 1;
      height: 100%;
      position: relative;
      overflow: hidden;
    }
  }
}
</style>
