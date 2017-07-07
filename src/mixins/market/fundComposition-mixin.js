export default {
  data(){
    return{
      fundComposition:{},
      fundCompositionOption:{}
    }
  },
  created:function(){
    this.fundComposition = {
      total:10000,
      frozen:2000,
      hold:4000,
      free:4000,
      proportion:2,
      color:"up",
      icon:'icon-pu'
    }
  },
  watch:{
    fundComposition:function(val,oldval){
      this.fundCompositionOption = Object.assign({},{
        color:['#13ce66','#f7ba2a','#20a0ff'],
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          x: 'center',
          top:'10',
          itemGap:40,
          data:['冻结','持仓','空闲']
        },
        series: [
          {
            name:'资金组成',
            type:'pie',
            center:['50%','55%'],
            radius: ['50%', '80%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter:(params)=>{
                  return params.percent.toFixed(0)+'%'
                },
                textStyle:{
                  fontSize:10
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data:[
              {value:val.frozen, name:'冻结'},
              {value:val.hold, name:'持仓'},
              {value:val.free, name:'空闲'},
            ],
          }
        ]
      });
    },
  }
}
