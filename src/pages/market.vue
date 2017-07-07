<template>
  <div class="market">
      <div class="is-flex top-head">
        <el-date-picker v-model="timeFrame" type="datetimerange" placeholder="选择时间范围" align="right">
        </el-date-picker>
        <el-button type="primary">查询</el-button>
        <div class="top-switch">
          <span>自动刷新</span>
          <el-switch v-model="openRefresh">
          </el-switch>
        </div>
      </div>
      <div class="market-content">
        <div class="is-flex market-one">
          <overview :overviewList="overviewList" :title="'大盘总览'"></overview>
          <warning :warnList="warnList" :title="'最新预警'"></warning>
        </div>
        <div class="is-flex market-two">
          <article class="region region-blend" style="flex-basis: 38%">
            <header>
              资金流入/流出
            </header>
            <div class="region-main">
              <chart :options="capitalFlowOption"></chart>
            </div>
          </article>
          <article class="region region-blend" style="flex-basis: 34%">
            <header>
              订单变化
            </header>
            <div class="region-main">
              <chart :options="changeOrderOption"></chart>
            </div>
          </article>
          <article class="region" style="flex: 1">
            <header>
              资金组成
            </header>
            <pie-echarts class="region-main fund-composition" :pieOption="fundCompositionOption">
              <template slot="pieContent">
                <div class="pie-content">
                  <p>资金总量</p>
                  <p>{{fundComposition.total}}</p>
                  <p>同比昨日<span :class="fundComposition.color">{{fundComposition.proportion+'%'}}<i class="iconfont" :class="fundComposition.icon"></i></span></p>
                </div>
              </template>
            </pie-echarts>
          </article>
        </div>
        <div class="is-flex market-three">
          <article class="region member-overview">
            <header>
              综合类会员概览
              <div class="is-flex right">
                <list-sort :list="memberStatusList" :listIndex.sync="memberStatusListIndex" :num="10"></list-sort>
                <detail-btn></detail-btn>
              </div>
            </header>
            <div class="region-main">
              <ul class="member-overview-top is-flex">
                <li class="is-flex">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shezhi"></use>
                  </svg>
                  <div>
                    <p>综合类会员</p>
                    <p>{{memberStatusList.length}}</p>
                  </div>
                </li>
                <li>
                  <span>正常</span>
                  <span class="green">{{filterMemberStatusKeyList('success').length}}</span>
                </li>
                <li>
                  <span>预警</span>
                  <span class="yellow">{{filterMemberStatusKeyList('').length}}</span>
                </li>
                <li>
                  <span>异常</span>
                  <span class="red">{{filterMemberStatusKeyList('exception').length}}</span>
                </li>
              </ul>
              <div class="member-overview-bottom is-flex">
                <ul class="member-overview-list child-flex">
                  <li class="is-flex" v-for="item in filterMemberStatusShowList(memberStatusList,memberStatusListIndex.start,memberStatusListIndex.end,'left')">
                    <p>{{item.name}}</p>
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="item.ratio*100" :status="item.exception"></el-progress>
                  </li>
                </ul>
                <ul class="member-overview-list child-flex">
                  <li class="is-flex" v-for="item in filterMemberStatusShowList(memberStatusList,memberStatusListIndex.start,memberStatusListIndex.end,'right')">
                    <p>{{item.name}}</p>
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="item.ratio*100" :status="item.exception"></el-progress>
                  </li>
                </ul>
              </div>
            </div>
          </article>
          <!-- 疑似刷单交易商 -->
          <article class="region">
            <header>
              疑似刷单交易商
              <div class="is-flex right">
                <list-sort :list="membershipList" :listIndex.sync="membershipListIndex"></list-sort>
                <detail-btn></detail-btn>
              </div>
            </header>
            <suspicious-dealer-table-comp class="region-main" :suspiciousDealerTableData="suspiciousDealerTableData"></suspicious-dealer-table-comp>
          </article>
        </div>
        <article class="region market-four hold">
          <header>
            持仓详情
          </header>
          <positions-detail-echarts></positions-detail-echarts>
        </article>
        <article class="region market-five shouzhi is-flex">
            <div class="shouzhi-line">
              <header>
                订单变化
              </header>
              <div class="region-main">
                <chart :options="BalancePaymentLineOption"></chart>
              </div>
            </div>
            <pie-echarts class="shouzhi-pie region-main" :pieOption="BalancePaymentPieOption">
              <template slot="pieContent">
                <div class="pie-content">
                  <p>资金总量</p>
                  <p>{{BalancePaymentPie.total}}</p>
                  <p>同比昨日<span :class="BalancePaymentPie.color">{{BalancePaymentPie.proportion+'%'}}<i class="iconfont" :class="BalancePaymentPie.icon"></i></span></p>
                </div>
              </template>
            </pie-echarts>
        </article>
        <article class="region market-six">
          <header>
            综合类会员盈亏
          </header>
          <chart :options="memberGainLossOption"></chart>
        </article>
        <article class="region market-six">
          <header>
            综合类会员成员组成
            <div class="is-flex right">
              <list-sort :list="membershipList" :listIndex.sync="membershipListIndex"></list-sort>
              <detail-btn></detail-btn>
            </div>
          </header>
          <chart :options="membershipOption"></chart>
        </article>
      </div>
  </div>
</template>

<script>
//引入组件
import overview from "@comps/overview.vue";
import warning from "@comps/warning.vue";
import pieEcharts from '@comps/pie-echarts';
import contentItemWrapComp from '@comps/content-item-wrap-comp';
import positionsDetailEcharts from '@comps/positions-detail-echarts';
import suspiciousDealerTableComp from '@comps/suspicious-dealer-table-comp';

//引入混合数据
import mixin from "@mixins/market-mixin";
// 资金流入/流出
import capitalFlowListMixin from "@mixins/market/capitalFlowList-mixin";
// 订单变化
import changeOrderListMixin from "@mixins/market/changeOrderList-mixin";
// 资金组成
import fundCompositionMixin from "@mixins/market/fundComposition-mixin";
//综合类会员概览
import memberStatusListMixin from "@mixins/market/memberStatusList-mixin";
// 交易所收支变化
import BalancePaymentLineListMixin from "@mixins/market/BalancePaymentLineList-mixin";
// 交易所收支组成
import BalancePaymentPieListMixin from "@mixins/market/BalancePaymentPieList-mixin";
// 综合类会员盈亏
import memberGainLossListListMixin from "@mixins/market/memberGainLossList-mixin";
// 综合类会员成员组成
import memberShipListMixin from "@mixins/market/memberShipList-mixin";
export default {
  name: 'market',
  components: {
    overview,
    warning,
    contentItemWrapComp,
    positionsDetailEcharts,
    pieEcharts,
    suspiciousDealerTableComp
  },
  mixins: [
    mixin,
    capitalFlowListMixin,
    changeOrderListMixin,
    fundCompositionMixin,
    memberStatusListMixin,
    BalancePaymentLineListMixin,
    BalancePaymentPieListMixin,
    memberGainLossListListMixin,
    memberShipListMixin,
  ],
  data () {
    return {
      msg: 'market',
      positionsDetail: {
        itemTitle: '持仓详情'
      },
      suspiciousDealerTableData: [
        {
          organizetionName: 'jigou1',
          rechargeFrequency: '6',
          rechargeMount: '2',
          profitFrequency: '3',
          profitMount: '2',
          withDrawalFrequency: '4',
          withDrawalMount: '3'
        },
        {
          organizetionName: 'jigou2',
          rechargeFrequency: '2',
          rechargeMount: '3',
          profitFrequency: '4',
          profitMount: '1',
          withDrawalFrequency: '2',
          withDrawalMount: '5'
        },
        {
          organizetionName: 'jigou3',
          rechargeFrequency: '3',
          rechargeMount: '1',
          profitFrequency: '5',
          profitMount: '3',
          withDrawalFrequency: '1',
          withDrawalMount: '4'
        },
        {
          organizetionName: 'jigou4',
          rechargeFrequency: '7',
          rechargeMount: '6',
          profitFrequency: '7',
          profitMount: '4',
          withDrawalFrequency: '5',
          withDrawalMount: '1'
        },
        {
          organizetionName: 'jigou5',
          rechargeFrequency: '4',
          rechargeMount: '2',
          profitFrequency: '5',
          profitMount: '2',
          withDrawalFrequency: '2',
          withDrawalMount: '3'
        }
      ],
      currentTableHeaderClick: '',
      sortStatus: {
        recharge: {
          frequency: 'default',
          total: 'default'
        },
        profit: {
          frequency: 'default',
          total: 'default'
        },
        withDrawal: {
          frequency: 'default',
          total: 'default'
        }
      },
      timeFrame: [new Date(2017, 1, 10, 10, 10), new Date(2017, 8, 11, 10, 10)],
      openRefresh:true,
      overviewShowList:[],
    }
  },
  created:function(){
  },
  computed:{
  },
  mounted:function () {

  },
  methods:{
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .market{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px 10px 20px 30px;
    .top-head{
      position: relative;
      padding-left: 10px;
      button{
        margin-left: 20px;
      }
      .top-switch{
        position: absolute;
        right: 10px;
        top:0;
        span{
          display: inline-block;
          height: 22px;
          width: auto;
          font-size: 14px;
          margin-right: 10px;
          line-height: 22px;
        }
      }
    }
    .market-content{
      margin-top: 20px;
      width: 100%;
      height: calc(~"100% - 60px");
      padding-right: 30px;
      overflow-y: auto;
      .market-one{
        height: 200px;
      }
      .market-two{
        margin-top: 20px;
        height: 280px;
        box-sizing: border-box;
        .fund-composition{
          .pie-content{
            top:40%;
            left: 0;
          }
        }
      }
      .market-three{
        height: 280px;
        margin-top: 20px;
        .member-overview{
          text-align: center;
          box-sizing: border-box;
          .region-main{
            padding: 10px 20px;
          }
          .member-overview-top{
            box-sizing: border-box;
            border:1px solid #d3dce6;
            box-shadow:0 2px 4px 0 rgba(0,0,0,0.12), 0 0 6px 0 rgba(0,0,0,0.04);
            width:100%;
            height:70px;
            padding: 10px;
            .is-flex{
              height: 50px;
              border-right: 3px solid #979797;
              justify-content:center;
              .icon{
                width: 40px;
                height: 40px;
                margin-right: 20px;
              }
              p{
                width: 100%;
                height: 20px;
                line-height: 20px;
                font-size: 14px;
              }
              p:nth-of-type(2){
                font-size: 20px;
              }
            }
            li{
              flex: 1;
              height: 50px;
              line-height: 50px;
              span{
                font-size: 20px;
                vertical-align: top;
                margin-right: 20px;
              }
              span:nth-of-type(2){
                font-size: 36px;
              }
            }
          }
          .member-overview-bottom{
            margin-top: 10px;
            align-items: flex-start;
            ul{
              margin-right:10px;
              li{
                height: 30px;
                line-height: 30px;
                p{
                  font-size: 12px;
                  width: 100px;
                }
                .el-progress{
                  flex: 1;
                }
              }
            }
          }
        }
      }
      .market-four{
        width: calc(~"100% - 20px");
        box-sizing: border-box;
        margin: 20px 0 0 10px;
        height: 350px;
        .region-main{
          padding: 10px 23px;
        }
      }
      .market-five{
        width: calc(~"100% - 20px");
        box-sizing: border-box;
        margin: 20px 0 0 10px;
        height: 280px;
      }
      .shouzhi{
        justify-content:space-between;
        .shouzhi-line{
          flex: 1;
          height: 100%;
        }
        .shouzhi-pie{
          flex: 1;
          margin-left: 5%;
          height: 100%;
          .pie-content{
            width: 20%;
            height: 80px;
            top:40%;
            left: 20%;
          }
        }
      }
      .market-six{
        width: calc(~"100% - 20px");
        box-sizing: border-box;
        margin: 20px 0 0 10px;
        height: 350px;
      }

      .suspiciousDealer{
        margin: 0;
      }
    }
  }
</style>
