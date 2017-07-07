<template>
  <div>
    <div class="chart-wrap">
      <chart :options="memberStructureOptions" ref="chart"></chart>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      memberStructureOptions: {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          align: 'left',
          orient: 'horizontal',
          left: 'left',
          data: ['交易商','经纪人会员','机构'],
          left: 'center',
          top: '10%',
          itemGap: 20
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:335, name:'交易商', itemStyle: {
                normal: {
                  color: '#13ce66'
                }
              }},
              {value:310, name:'经纪人会员', itemStyle: {
                normal: {
                  color: '#f7ba2a'
                }
              }},
              {value:234, name:'机构', itemStyle: {
                normal: {
                  color: '#20a0ff'
                }
              }}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.chart-wrap {
  width: 340px;
  height: 340px;
}
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
