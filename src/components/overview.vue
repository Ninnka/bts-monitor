<template>
  <article class="region overview">
    <header>
      {{title}}
    </header>
    <div class="region-main">
      <ul>
        <li v-for="item in overviewList">
          <div class="main-icon">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="'#'+item.icon"></use>
            </svg>
            <p>{{item.type}}</p>
          </div>
          <div class="main-text">
            <div class="text-detail">
              <p v-for="o in item.details">
                {{o.type}}:{{o.value}}（
                <span>{{o.ratio+'%'}}</span>
                <i class="iconfont"></i>）
              </p>
              <img v-if="item.type==='保证金'" src="../assets/img/one.png">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
export default {
  name: 'overview',
  data () {
    return {
      msg: 'overview'
    }
  },
  props: {
    title: {
      type: String,
      default: '总览'
    },
    overviewList: {
      type: Array,
      default: []
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .overview{
    flex-basis: 68%;
    .region-main{
      ul{
        width: 100%;
        height: 170px;
        display: flex;
        flex-wrap:wrap;
        li{
          width: 30%;
          height: 65px;
          margin: 10px 0 10px 20px;
          display: flex;
          overflow: hidden;
          .main-icon{
            width: 80px;
            height: auto;
            text-align: center;
            .icon{
              width: 40px;
              height: 40px;
              line-height: 40px;
            }
            p{
              width: 100%;
              height: 16px;
              line-height: 14px;
              font-size: 14px;
            }
          }
          .main-text{
            flex: 1;
            display: flex;
            align-items: center;
            .text-detail{
              p{
                width: 100%;
                height: 20px;
                line-height: 20px;
                font-family:PingFangSC-Regular;
                font-size:12px;
                color:#475669;
                letter-spacing:0;
                text-align:left;
                span{
                  vertical-align: top;
                  font-family:PingFangSC-Semibold;
                  font-size:12px;
                  color:#ff4949;
                  letter-spacing:0;
                  text-align:center;
                }
              }
              img{
                width: 100%;
                height: auto;
              }
            }
          }
        }
      }
    }
  }
</style>
