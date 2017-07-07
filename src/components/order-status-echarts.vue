<template>
  <div>
    <div class="chart-wrap">
      <chart :options="orderStatusOptions" ref="chart"></chart>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    let xAxisData = [];
    for (let i = 0; i < 24; i++) {
      if (i < 10) {
        xAxisData.push('0' + i + ':00');
      }else {
        xAxisData.push(i + ':00');
      }
    }
    return {
      orderStatusOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data:['数量', '金额', '盈利数量', '亏损数量', '盈利金额', '亏损金额']
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '数量'
          },
          {
            type: 'value',
            name: '总额'
          }
        ],
        series: [
          {
            name: '数量',
            type: 'line',
            yAxisIndex: 0,
            data: [320, 332, 301, 334, 390, 330, 320, 150, 232, 201, 154, 190, 330, 410, 220, 182, 191, 234, 290, 330, 134, 90, 230, 210]
          },
          {
            name: '金额',
            type: 'line',
            yAxisIndex: 1,
            data: [820, 932, 901, 934, 290, 130, 120, 620, 532, 501, 634, 290, 330, 260, 820, 332, 201, 434, 690, 130, 320, 520, 132, 401]
          },
          {
            name: '盈利数量',
            type: 'bar',
            stack: '数量',
            data: [30, 12, 31, 34, 90, 30, 20, 15, 32, 20, 54, 90, 30, 40, 20, 82, 91, 34, 90, 30, 34, 90, 20, 21]
          },
          {
            name: '亏损数量',
            type: 'bar',
            stack: '数量',
            data: [30, 12, 31, 34, 90, 30, 20, 15, 32, 20, 54, 90, 30, 40, 20, 82, 91, 34, 90, 30, 34, 90, 20, 21]
          },
          {
            name: '盈利金额',
            type: 'bar',
            stack: '金额',
            data: [30, 12, 31, 34, 90, 30, 20, 15, 32, 20, 54, 90, 30, 40, 20, 82, 91, 34, 90, 30, 34, 90, 20, 21]
          },
          {
            name: '亏损金额',
            type: 'bar',
            stack: '金额',
            data: [30, 12, 31, 34, 90, 30, 20, 15, 32, 20, 54, 90, 30, 40, 20, 82, 91, 34, 90, 30, 34, 90, 20, 21]
          }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.chart-wrap {
  width: 820px;
  height: 340px;
}
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
