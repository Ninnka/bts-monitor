let xAxisData = [];
for (let i = 0; i <= 24; i++) {
  if (i < 10) {
    xAxisData.push('0' + i + ':00');
  }else {
    xAxisData.push(i + ':00');
  }
}
let getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
let seriesOption = {
  name: '',
  type: 'line',
  data: [],
  smooth: true
}
let dealerMonitorOptions = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: [],
    top: '83%'
  },
  grid: {
    top: '8%',
    left: '3%',
    right: '4%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xAxisData
  },
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [

  ]
}

export {
  dealerMonitorOptions,
  seriesOption,
  getRandom
}
