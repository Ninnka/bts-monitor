<template>
  <div class="chart-wrap">
    <chart :options="profitTrendOptions" ref="chart"></chart>
  </div>
</template>

<script>

export default {
  data () {
    return {
      profitTrendOptions: {
        title: {
          text: '佣金收入趋势',
          top: '3%',
          left: '2%'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['数量','总额'],
            top: '5%',
            right: '3%'
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: [
            {
              type: 'value'
            },
            {
              type: 'value'
            }
        ],
        series: [
            {
                name:'数量',
                type:'line',
                data:[320, 332, 301, 334, 390, 330, 120],
                smooth: true,
                yAxisIndex: 0
            },
            {
                name:'总额',
                type:'line',
                data:[220, 320, 201, 340, 290, 500, 120],
                smooth: true,
                yAxisIndex: 1
            }
        ],
        autoResize: true
      }
    }
  }
}
</script>

<style lang="less">
.chart-wrap {
  width: 460px;
  height: 280px;
}
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
