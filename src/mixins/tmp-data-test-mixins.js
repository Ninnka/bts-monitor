export default {
  data () {
    return {
      overviewList:[
        {
          type:'总收入',
          icon:'icon-zongshouzhi',
          details:[
            {
              type:'总收入',
              value:99999
            },
            {
              type: '同比昨日',
              ratio: 2
            }
          ]
        },
        {
          type:'总支出',
          icon:'icon-zongyingkui',
          details:[
            {
              type:'总支出',
              value:99999
            },
            {
              type: '同比昨日',
              ratio: 2
            }
          ]
        },
        {
          type:'总资金',
          icon:'icon-zongjinchu',
          details:[
            {
              type:'总资金',
              value:99999
            },
            {
              type: '同比昨日',
              ratio: 2
            }
          ]
        },
        {
          type:'交易量',
          icon:'icon-jiaoyishang',
          details:[
            {
              type:'交易量',
              value:99999
            },
            {
              type: '同比昨日',
              ratio: 2
            }
          ]
        },
        {
          type:'交易商',
          icon:'icon-jiaoyiliang',
          details:[
            {
              type:'交易商',
              value:99999
            },
            {
              type: '同比昨日',
              ratio: 2
            }
          ]
        }
      ],
      warnList:[
        {
          id: 1,
          time:'2016-10-10 10:10:10',
          state:'waring',
          msg:'综合类会员1下属交易商2支付失败，请检查'
        },
        {
          id: 2,
          time:'2016-10-10 10:10:10',
          state:'error',
          msg:'综合类会员1下属交易商2支付失败，请检查'
        },
        {
          id: 3,
          time:'2016-10-10 10:10:10',
          state:'waring',
          msg:'综合类会员1下属交易商2支付失败，请检查'
        }
      ]
    }
  }
}