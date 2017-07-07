<template>
  <div class="is-flex region-main">
    <!-- 持仓变化 -->
    <div class="region region-blend region-nobefore" style="flex-basis: 34%">
      <header>
        持仓变化
      </header>
      <div class="region-main">
        <positions-status-echarts ref="positionStatusEcharts"></positions-status-echarts>
      </div>
    </div>

    <!-- 持仓组成 -->
    <div class="region region-nobefore hold-form" style="flex-basis: 28%">
      <header>
        持仓组成
      </header>
      <pie-echarts class="region-main" ref="positionStructureEcharts" :pieOption="positionsStructureOption">
        <template slot="pieContent">
          <div class="pie-content">
            <p>资金总量</p>
            <p>999,999,999</p>
            <p>同比昨日: <span>2%^</span></p>
          </div>
        </template>
      </pie-echarts>
    </div>
    <!-- 持仓人 -->
    <position-holder></position-holder>
  </div>
</template>

<script>
import contentItemWrapComp from '@comps/content-item-wrap-comp';
import pieEcharts from '@comps/pie-echarts';
import positionsStatusEcharts from '@comps/positions-detail/positions-status-echarts';
import positionHolder from '@comps/positions-detail/positionHolder';

export default {
  components: {
    contentItemWrapComp,
    positionsStatusEcharts,
    pieEcharts,
    positionHolder
  },
  data () {
    return {
      positionsStructureOption: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          align: 'left',
          orient: 'vertical',
          x: 'right',
          y: 'center',
          left: '70%',
          data:['美元/日元','欧元/美元','澳元/日元','澳元/欧元']
        },
        series: [
          {
            name:'持仓组成',
            type:'pie',
            radius: ['40%', '70%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: function (params) {
                  return params.percent.toFixed(0) + '%';
                },
                textStyle: {
                  fontSize: 12
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value:335, name:'美元/日元'},
              {value:310, name:'欧元/美元'},
              {value:234, name:'澳元/日元'},
              {value:135, name:'澳元/欧元'}
            ]
          }
        ]
      },
    }
  }
}
</script>

<style lang="less" scoped>
.is-flex{
  .region{
    margin: 0 10px 0 0;
  }
  .hold-form{
    .region-main{
    }
  }
  .pie-content{
    width: 30%;
    height: 65px;
    top: 35%;
    left: 17%;
    p {
      text-align: center;
      span{
        color: red;
        font-size: 12px;
      }
    }
    p:nth-of-type(2){
      font-size: 16px;
    }
  }
}
.positionProportion--main-wrap {
  box-sizing: border-box;
  padding: 13px 25px 0 20px;
  margin-top: 26px;
  font-size: 12px;
  .item-number {
    line-height: 17px;
    width: 17px;
    height: 17px;
    border-radius: 100%;
    text-align: center;
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    top: 5px;
    color: white;
    &.red {
      background-color: red;
    }
  }
  .item-desc {
    width: 100%;
    margin-left: 10px;
    font-size: 12px;
    text-align: left;
    .hightlight {
      margin-left: 10px;
      &.red {
        color: red;
      }
      &.yellow {
        color: yellow;
      }
    }
  }
}
.desc-proportion-wrap {
  margin: 5px 0 0;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: center;
  .desc-proportion {
    position: relative;
    height: 14px;
    width: 90%;
    > div {
      height: 100%;
      border-radius: 30px;
      top: 0;
      left: 0;
      position: absolute;
    }
    .desc-proportion--shadow {
      width: 100%;
      background-color: rgba(160,160,160,1);
    }
    .desc-proportion--colorful {
      width: 30%;
      background-color: rgba(77,77,200,1);
    }
  }
}
</style>

