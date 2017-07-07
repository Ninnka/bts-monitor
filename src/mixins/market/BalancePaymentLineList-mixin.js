export default {
  data(){
    return{
      BalancePaymentLineList:[],
      BalancePaymentLineOption:{}
    }
  },
  created:function(){
    this.BalancePaymentLineList = [
      {
        time:'00:00',
        inflow:'1000',
        outflow:'600'
      },
      {
        time:'00:00',
        inflow:'1000',
        outflow:'600'
      },
      {
        time:'00:00',
        inflow:'1000',
        outflow:'600'
      },
      {
        time:'00:00',
        inflow:'1000',
        outflow:'600'
      },
      {
        time:'00:00',
        inflow:'1000',
        outflow:'600'
      },
      {
        time:'00:00',
        inflow:'1000',
        outflow:'600'
      },
      {
        time:'00:00',
        inflow:'1000',
        outflow:'600'
      },
    ]
  },
  watch:{
    BalancePaymentLineList:function(val,oldval){
      this.BalancePaymentLineOption = Object.assign({},{
        color: ['#13ce66', '#ff4949'],
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data:['流入','流出'],
          top:'0%',
          right:'10%',
          align: 'left',
        },
        xAxis:  {
          type: 'category',
          boundaryGap: false,
          data: val.map((item)=>{
            return item.time
          })
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name:'流入',
            type:'line',
            data:val.map((item)=>{
              return item.inflow
            }),
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
          },
          {
            name:'流出',
            type:'line',
            data:val.map((item)=>{
              return item.outflow
            }),
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
          }
        ]
      });
    },
  }
}
