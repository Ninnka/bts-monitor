<template>
  <article class="region warning">
    <header>
      {{title}}
    </header>
    <div class="region-main">
      <ul>
        <li class="is-flex" v-for="item in warnList">
          <i class="iconfont icon-gantanhao"></i>
          <div class="child-flex">
            <p>{{item.time}}</p>
            <div class="text is-flex">
              <p>
                {{item.mes}}
              </p>
              <el-dropdown trigger="click">
                <el-button type="primary">
                  <i class="iconfont icon-shezhi"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>忽略</el-dropdown-item>
                  <el-dropdown-item>已处理</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
export default {
  name: 'warning',
  data () {
    return {
      msg: 'member'
    }
  },
  props: {
    title: {
      type: String,
      default: '预警'
    },
    warnList: {
      type: Array,
      default: []
    },
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .warning{
    flex: 1;
    .region-main{
      width: 100%;
      height: 180px;
      overflow-y:auto ;
      ul{
        li{
          width: 100%;
          height: 40px;
          padding: 0 10px;
          font-size:14px;
          color:#475669;
          margin-top: 10px;
          line-height: 20px;
          align-items: flex-start;
          box-sizing: border-box;
          .iconfont{
            color: #f7ba2a;
            margin-right: 5px;
            font-size: 20px;
          }
          .child-flex{
            height: 40px;
            p{
              width: auto;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              max-width: 80%;
              height: 20px;
              text-align: left;
            }
            .text{
              p{
              }
            }
            .el-button{
              padding: 0;
              background: transparent;
              border: 0;
              .iconfont{
                margin-left: 10px;
                color: #666;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
</style>
