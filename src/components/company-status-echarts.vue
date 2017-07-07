<template>
  <div class="chart-wrap">
    <chart :options="companyStatusOptions" ref="chart"></chart>
  </div>
</template>

<script>
export default {
  data () {
    return {
      companyStatusOptions: {
        tooltip: {
          trigger: 'axis'
        },
        radar: [
          {
            indicator: [
              {text: '充值', max: 100},
              {text: '佣金', max: 100},
              {text: '贡献', max: 100},
              {text: '持仓', max: 100},
              {text: '提现', max: 100}
            ],
            center: ['50%','50%'],
            radius: 100
          }
        ],
        series: [
          {
            type: 'radar',
              tooltip: {
              trigger: 'item'
            },
            itemStyle: {normal: {areaStyle: {type: 'default'}, color: 'rgba(19,206,102,0.50)'}},
            data: [
              {
                value: [60,73,85,40],
                name: '某软件'
              }
            ]
          }
        ],
        autoResize: true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.chart-wrap {
  width: 100%;
  height: 293px;
}
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
