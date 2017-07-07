export default {
  data(){
    return{
      BalancePaymentPie:{},
      BalancePaymentPieOption:{}
    }
  },
  created:function(){
    this.BalancePaymentPie = {
      total:100,
      proportion:2,
      color:"up",
      icon:'icon-pu',
      list:[
        {
          name:'美元/日元',
          num:10,
          color:'#13ce66'
        },
        {
          name:'欧元/美元',
          num:30,
          color:'#f7ba2a'
        },
        {
          name:'澳元/欧元',
          num:5,
          color:'#20a0ff'
        },
        {
          name:'美元/欧元',
          num:15,
          color:'#fd8a35'
        },
        {
          name:'澳元/日元',
          num:30,
          color:'#c080c6'
        },
        {
          name:'澳元/人民币',
          num:10,
          color:'#ea4785'
        },
      ]
    }
  },
  watch:{
    BalancePaymentPie:function(val,oldval){
      this.BalancePaymentPieOption = Object.assign({},{
        color:val.list.map((item)=>{
          return item.color
        }),
        title:{
          text:'收支组成',
          textStyle:{
            color:'#1f2d3d',
            fontSize:16,
            fontFamily:"微软雅黑",
            fontWeight:400
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          top:'20%',
          right:'20%',
          orient:'vertical',
          data:val.list.map((item)=>{
            return item.name
          })
        },
        series: [
          {
            name:'收支组成',
            type:'pie',
            center:['30%','55%'],
            radius: ['50%', '80%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'inner',
                formatter:(params)=>{
                  return params.percent.toFixed(0)+'%'
                },
                textStyle:{
                  fontSize:'12'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: val.list.map((item)=>{
              return {
                value:item.num,
                name:item.name
              }
            })
          }
        ]
      });
    },
  }
}
