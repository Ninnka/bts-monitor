export default {
  data(){
    return{
      changeOrderList:[],
      changeOrderOption:{}
    }
  },
  created:function(){
    this.changeOrderList = [
      {
        time:'00.00',
        num:100,
        total:9000
      },
      {
        time:'00.00',
        num:100,
        total:9000
      },
      {
        time:'00.00',
        num:100,
        total:9000
      },
      {
        time:'00.00',
        num:100,
        total:9000
      },
      {
        time:'00.00',
        num:100,
        total:9000
      },
    ]
  },
  watch:{
    changeOrderList:function(val,oldval){
      this.changeOrderOption = Object.assign({},{
        color: ['#13ce66', '#f7ba2a'],
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data:['数量','总额'],
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
        yAxis: [
          {
            name: '数量（个）',
            type: 'value',
          },
          {
            name: '交易总额（人民币）',
            nameLocation: 'start',
            type: 'value',
          }
        ],
        series: [
          {
            name:'数量',
            type:'line',
            data:val.map((item)=>{
              return item.num
            }),
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
          },
          {
            name:'总额',
            type:'line',
            yAxisIndex:1,
            data:val.map((item)=>{
              return item.total
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
