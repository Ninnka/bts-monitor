<template>
  <div class="chart-wrap">
    <chart :options="bailStatusOptions" ref="chart"></chart>
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
      bailStatusOptions: {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['占用','空闲'],
            orient: 'vertical',
            x: 'right',
            y: 'center',
            align: 'left',
            right: '10'
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        grid: {
          top: '8%',
          right: '10%'
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: xAxisData
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name:'占用',
                type:'line',
                stack: '总量',
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: [320, 332, 301, 334, 390, 330, 320, 150, 232, 201, 154, 190, 330, 410, 220, 182, 191, 234, 290, 330, 134, 90, 230, 210]
            },
            {
                name:'空闲',
                type:'line',
                stack: '总量',
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901]
            }
        ]
      }
    }
  },
  methods: {

  }
}
</script>


<style lang="less" scoped>
.chart-wrap {
  width: 819px;
  height: 294px;
}
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
