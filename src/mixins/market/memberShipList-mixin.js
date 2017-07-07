export default {
  data(){
    return{
      membershipList:[],
      membershipListIndex:{
        start:0,
        end:4,
      },
      membershipOption:{}
    }
  },
  computed:{
    membershipOptionList(){
      return this.filterShowList(this.membershipList,this.membershipListIndex.start,this.membershipListIndex.end)
    }
  },
  created:function(){
    this.membershipList = [
      {
        time: '00.00',
        dealer: 500,
        newDealer: 100,
        mechanism: 100,
        newMechanism: 50,
      },
      {
        time: '00.00',
        dealer: 500,
        newDealer: 100,
        mechanism: 100,
        newMechanism: 50,
      },
      {
        time: '00.00',
        dealer: 500,
        newDealer: 100,
        mechanism: 100,
        newMechanism: 50,
      },
      {
        time: '00.00',
        dealer: 500,
        newDealer: 100,
        mechanism: 100,
        newMechanism: 50,
      },
      {
        time: '00.00',
        dealer: 500,
        newDealer: 100,
        mechanism: 100,
        newMechanism: 50,
      },
      {
        time: '00.00',
        dealer: 500,
        newDealer: 100,
        mechanism: 100,
        newMechanism: 550,
      },
      {
        time: '00.00',
        dealer: 500,
        newDealer: 100,
        mechanism: 10,
        newMechanism: 500,
      },
      {
        time: '00.00',
        dealer: 50,
        newDealer: 10,
        mechanism: 100,
        newMechanism: 50,
      },
    ]
  },
  methods:{
  },
  watch:{
    membershipOptionList:function(val,oldval){
      this.membershipOption = Object.assign({},{
        color: ['#13ce66', '#f8bc29', '#20a0ff', '#ff554f'],
        legend: {
          data:['交易商','新增交易商','机构','新增机构'],
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
            name: '数量',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name:'交易商',
            type:'bar',
            stack:'one',
            data: val.map((item)=>{
                return item.dealer
            }),
          },
          {
            name:'新增交易商',
            type:'bar',
            stack:'one',
            data: val.map((item)=>{
              return item.newDealer
            }),
          },
          {
            name:'机构',
            type:'bar',
            stack:'two',
            data: val.map((item)=>{
              return item.mechanism
            }),
          },
          {
            name:'新增机构',
            type:'bar',
            stack:'two',
            data: val.map((item)=>{
              return item.newMechanism
            }),
          }
        ]
      });
    },
  }
}
