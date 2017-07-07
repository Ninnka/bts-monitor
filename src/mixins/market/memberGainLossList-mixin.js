export default {
  data(){
    return{
      memberGainLossList:[],
      memberGainLossOption:{}
    }
  },
  created:function(){
    this.memberGainLossList = [
      {
        time:'00.00',
        profit:2000,
        loss:-1000,
        netProfit:1000,
      },
      {
        time:'00.00',
        profit:2000,
        loss:-1000,
        netProfit:1000,
      },
      {
        time:'00.00',
        profit:2000,
        loss:-1000,
        netProfit:1000,
      },
      {
        time:'00.00',
        profit:2000,
        loss:-1000,
        netProfit:1000,
      },
      {
        time:'00.00',
        profit:2000,
        loss:-1000,
        netProfit:1000,
      },
      {
        time:'00.00',
        profit:2000,
        loss:-1000,
        netProfit:1000,
      },
    ]
  },
  watch:{
    memberGainLossList:function(val,oldval){
      this.memberGainLossOption = Object.assign({},{
        color: ['#ff524e', '#00d063', '#20a0ff'],
        legend: {
          data:['盈利','亏损','净收益'],
          right:'0',
          bottom:'50%',
          orient:'vertical',
        },
        xAxis: [
          {
            type: 'category',
            data: val.map((item)=>{
              return item.time
            }),
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '人民币',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name:'盈利',
            type:'bar',
            stack:'one',
            data:val.map((item)=>{
              return item.profit
            }),
          },
          {
            name:'亏损',
            type:'bar',
            stack:'one',
            data:val.map((item)=>{
              return item.loss
            }),
          },
          {
            name:'净收益',
            type:'bar',
            data:val.map((item)=>{
              return item.netProfit
            }),
          }
        ]
      });
    },
  }
}
