<template>
  <div class="content-items-container">
    <div class="disp-flex">
      <!--总览部分-->
      <content-item-wrap-comp :itemDetail="detailOverview" class="detailOverview item-wrap-gutter">
        <template slot="cus-box-main"></i>
          <div class="detailOverview--region-main">
            <ul>
              <li v-for="item in overviewList" :key="item.type">
                <div class="left-icon">
                  <svg class="icon" aria-hidden="true">
                    <use :xlink:href="'#'+item.icon"></use>
                  </svg>
                </div>
                <div class="right-text">
                  <div class="text-detail">
                    <p v-for="o in item.details" :key="o.type">
                      {{o.type}}: {{o.value}}
                      <span v-if="o.ratio != undefined"><span>{{o.ratio+'%'}}</span><i class="iconfont"></i></span>
                    </p>
                    <img v-if="item.type==='保证金'" src="../../assets/img/one.png">
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </template>
      </content-item-wrap-comp>

      <!-- 预警部分 -->
      <content-item-wrap-comp :itemDetail="preWarning" class="preWarning">
        <template slot="cus-box-top_right">
          <detail-btn></detail-btn>
        </template>
        <template slot="cus-box-main">
          <ul class="warn-item-list">
            <li v-for="warnItem in warnList" :key="warnItem.id" class="warn-item">
              <i v-if="warnItem.state === 'waring'" class="iconfont icon-gantanhao"></i>
              <i v-if="warnItem.state === 'error'" class="iconfont icon-gantanhao"></i>
              <span class="warn-item-msg">{{ warnItem.msg }}</span>
              <el-dropdown>
                <span class=""><i class="iconfont icon-shezhi"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>忽略</el-dropdown-item>
                  <el-dropdown-item>已处理</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </template>
      </content-item-wrap-comp>
    </div>

    <div class="disp-flex">
      <!-- 保证金变化 -->
      <content-item-wrap-comp :itemDetail="bailStatus" class="bailStatus item-wrap-gutter">
        <template slot="cus-box-top_right">
          <detail-btn></detail-btn>
        </template>
        <template slot="cus-box-main">
          <bail-status-echarts ref="bailStatusEcharts"></bail-status-echarts>
        </template>
      </content-item-wrap-comp>

      <!-- 运营概况 -->
      <content-item-wrap-comp :itemDetail="companyStatus" class="companyStatus">
        <template slot="cus-box-main">
          <company-status-echarts ref="companyStatusEcharts"></company-status-echarts>
        </template>
      </content-item-wrap-comp>
    </div>

    <div class="disp-flex">
      <!-- 成员构成 -->
      <content-item-wrap-comp :itemDetail="memberStructure" class="memberStructure item-wrap-gutter">
        <template slot="cus-box-top_right">
          <detail-btn></detail-btn>
        </template>
        <template slot="cus-box-main">
          <member-structure-echarts ref="memberStructureEcharts"></member-structure-echarts>
        </template>
      </content-item-wrap-comp>

      <!-- 订单变化 -->
      <content-item-wrap-comp :itemDetail="orderStatus" class="orderStatus">
        <template slot="cus-box-top_right">
          <detail-btn></detail-btn>
        </template>
        <template slot="cus-box-main">
          <order-status-echarts ref="orderStatusEcharts"></order-status-echarts>
        </template>
      </content-item-wrap-comp>
    </div>

    <!-- 持仓详情 -->
    <article class="region hold">
      <header>
        持仓详情
      </header>
      <positions-detail-echarts ref="positionsDetailEcharts"></positions-detail-echarts>
    </article>

    <div class="disp-flex">
      <!-- 机构运营概况 -->
      <content-item-wrap-comp :itemDetail="organizationOperaStatus" class="organizationOperaStatus item-wrap-gutter-small">
        <template slot="cus-box-top_right">
          <detail-btn></detail-btn>
        </template>
        <template slot="cus-box-main">
          <div class="inner-gutter-normal">
            <el-table :data="organizationOperaStatusTableData" border style="width: 100% " max-height="221" :default-sort = "{prop: 'organizetionName', order: 'ascending'}">
              <el-table-column prop="organizetionName" label="机构"></el-table-column>
              <el-table-column prop="frequency" label="交易次数" sortable>
                <template scope="scope">
                  <div class="const-updown-cell">
                    <p>{{scope.row.frequency}}</p>
                    <p>同比昨日：<span :class="{compare_up: scope.row.frequencyCompare > 0, compare_down: scope.row.frequencyCompare < 0}">{{scope.row.frequencyCompare}} <span v-if="scope.row.frequencyCompare > 0">↑</span><span v-else>↓</span></span></p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="volume" label="交易量" sortable>
                <template scope="scope">
                  <div class="const-updown-cell">
                    <p>{{scope.row.volume}}</p>
                    <p>同比昨日：<span :class="{compare_up: scope.row.volume > 0, compare_down: scope.row.volume < 0}">{{scope.row.volume}} <span v-if="scope.row.volume > 0">↑</span><span v-else>↓</span></span></p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="dealer" label="交易商" sortable>
                <template scope="scope">
                  <div class="const-updown-cell">
                    <p>{{scope.row.dealer}}</p>
                    <p>同比昨日：<span :class="{compare_up: scope.row.dealer > 0, compare_down: scope.row.dealer < 0}">{{scope.row.dealer}} <span v-if="scope.row.dealer > 0">↑</span><span v-else>↓</span></span></p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="profit" label="佣金" sortable>
                <template scope="scope">
                  <div class="const-updown-cell">
                    <p>{{scope.row.profit}}</p>
                    <p>同比昨日：<span :class="{compare_up: scope.row.profit > 0, compare_down: scope.row.profit < 0}">{{scope.row.profit}} <span v-if="scope.row.profit > 0">↑</span><span v-else>↓</span></span></p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </content-item-wrap-comp>

      <!-- 用金收入趋势 -->
      <content-item-wrap-comp :itemDetail="profitTrend" class="profitTrend" :showTitle="profitTrend.showTitle" :showTitleIndicator="profitTrend.showTitleIndicator">
        <template slot="cus-box-main">
          <profit-trend-echarts ref="profitTrendEcharts"></profit-trend-echarts>
        </template>
        <template slot="cus-posi-abs">
          <div class="posi-abs cus-title-indicator"></div>
        </template>
      </content-item-wrap-comp>
    </div>

    <div class="disp-flex">
      <!-- 活跃交易商 -->
      <content-item-wrap-comp :itemDetail="activeDealer" class="activeDealer item-wrap-gutter">
        <template slot="cus-box-top_right">
          <detail-btn></detail-btn>
        </template>
        <template slot="cus-box-main">
          <div class="inner-gutter-normal">
            <el-table ref="activeDealerTable" :data="organizationOperaStatusTableData" border style="width: 100% " max-height="221" :default-sort = "{prop: 'organizetionName', order: 'ascending'}">
              <el-table-column prop="dealer" label="交易商">
                <template scope="scope">
                  <el-tooltip class="item" effect="dark" :content="getFormatTime(scope.row.createdTime)" placement="bottom">
                    <div class="tabledata-dealer">
                      <p class="hightlight">{{scope.row.organizetionName}}</p>
                      <p>{{ getTimeDifference(scope.row.createdTime) }}天前开通</p>
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="frequency" label="交易次数" sortable>
                <template scope="scope">
                  <div class="const-updown-cell">
                    <p>{{scope.row.frequency}}</p>
                    <p>同比昨日：<span :class="{compare_up: scope.row.frequencyCompare > 0, compare_down: scope.row.frequencyCompare < 0}">{{scope.row.frequencyCompare}} <span v-if="scope.row.frequencyCompare > 0">↑</span><span v-else>↓</span></span></p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="volume" label="交易量" sortable>
                <template scope="scope">
                  <div class="const-updown-cell">
                    <p>{{scope.row.volume}}</p>
                    <p>同比昨日：<span :class="{compare_up: scope.row.volume > 0, compare_down: scope.row.volume < 0}">{{scope.row.volume}} <span v-if="scope.row.volume > 0">↑</span><span v-else>↓</span></span></p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="profit" label="盈亏" sortable>
                <template scope="scope">
                  <div class="const-updown-cell">
                    <p>{{scope.row.profit}}</p>
                    <p>同比昨日：<span :class="{compare_up: scope.row.profit > 0, compare_down: scope.row.profit < 0}">{{scope.row.profit}} <span v-if="scope.row.profit > 0">↑</span><span v-else>↓</span></span></p>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </content-item-wrap-comp>

      <!-- 疑似刷单交易商 -->
      <content-item-wrap-comp :itemDetail="suspiciousDealer" class="suspiciousDealer">
        <template slot="cus-box-top_right">
          <detail-btn></detail-btn>
        </template>
        <template slot="cus-box-main">
          <suspicious-dealer-table-comp :suspiciousDealerTableData="suspiciousDealerTableData"></suspicious-dealer-table-comp>
        </template>
      </content-item-wrap-comp>
    </div>

  </div>
</template>

<script>
import contentItemWrapComp from '@comps/content-item-wrap-comp';
// import customTableHeaderDropdownComp from '@comps/custom-table-header-dropdown-comp';
import suspiciousDealerTableComp from '@comps/suspicious-dealer-table-comp';

import bailStatusEcharts from '@comps/bail-status-echarts';
import companyStatusEcharts from '@comps/company-status-echarts';
import memberStructureEcharts from '@comps/member-structure-echarts';
import orderStatusEcharts from '@comps/order-status-echarts';
import positionsDetailEcharts from '@comps/positions-detail-echarts';
import profitTrendEcharts from '@comps/profit-trend-echarts';

import timeFormatMixins from '@mixins/time-format-mixins';

import tmpDataTestMixins from '@mixins/tmp-data-test-mixins';
import tmpTableDataMixins from '@mixins/tmp-table-data-mixins';

export default {
  mixins: [timeFormatMixins, tmpDataTestMixins, tmpTableDataMixins],
  components: {
    contentItemWrapComp,
    suspiciousDealerTableComp,
    bailStatusEcharts,
    companyStatusEcharts,
    memberStructureEcharts,
    orderStatusEcharts,
    positionsDetailEcharts,
    profitTrendEcharts
  },
  props: {
    memberId: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      hasLoaded: false,
      detailOverview: {
        itemTitle: '总览'
      },
      preWarning: {
        itemTitle: '预警'
      },
      bailStatus: {
        itemTitle: '保证金变化'
      },
      companyStatus: {
        itemTitle: '运营概况'
      },
      memberStructure: {
        itemTitle: '成员构成'
      },
      orderStatus: {
        itemTitle: '订单变化'
      },
      positionsDetail: {
        itemTitle: '持仓详情'
      },
      organizationOperaStatus: {
        itemTitle: '机构运营概况'
      },
      profitTrend: {
        showTitle: false,
        showTitleIndicator: false
      },
      activeDealer: {
        itemTitle: '活跃交易商'
      },
      suspiciousDealer: {
        itemTitle: '疑似刷单交易商'
      }
    }
  },
  methods: {
    setLoaded () {
      this.hasLoaded = true;
    },
    checkHasLoaded () {
      return this.hasLoaded;
    },
    resetLoaded () {
      this.hasLoaded = false;
    }
  },
  computed: {

  },
  mounted () {}
}
</script>

<style lang="less">
.icon-gantanhao {
  color: #f7ba2a;
}
.hold{
  width: 100%;
  margin: 0 0 20px 0;
}
.content-items-container {
  box-sizing: border-box;
  padding: 20px 0 0;
}
.item-wrap-gutter {
  margin-right: 20px;
}
.item-wrap-gutter-small {
  margin-right: 11px;
}
.detailOverview--region-main{
  margin: 10px 0 0;
  ul{
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    li{
      margin: 0 0 5px 15px;
      display: flex;
      overflow: hidden;
      flex-grow: 1;
      min-width: 30%;
      max-width: 32%;
      justify-content: center;
      .left-icon{
        width: 60px;
        height: auto;
        text-align: center;
        .icon{
          width: 40px;
          height: 40px;
          line-height: 40px;
        }
        p{
          width: 100%;
          height: 16px;
          line-height: 14px;
          font-size: 14px;
        }
      }
      .right-text{
        flex: 1;
        display: flex;
        align-items: center;
        max-width: 50%;
        .text-detail{
          p{
            width: 100%;
            height: 20px;
            line-height: 20px;
            font-family:PingFangSC-Regular;
            font-size:12px;
            color:#475669;
            letter-spacing:0;
            text-align:left;
            span{
              vertical-align: top;
              font-family:PingFangSC-Semibold;
              font-size:12px;
              color:#ff4949;
              letter-spacing:0;
              text-align:center;
            }
          }
          img{
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
}
.warn-item-list {
  margin: 10px 0 0 20px;
}
.warn-item {
  margin: 0 0 10px 0;
  .warn-item-msg {
    font-family:HelveticaNeue;
    font-size:14px;
    letter-spacing:0;
    text-align:left;
    .hightlight {
      color:#475669;
    }
  }
}

.disp-flex {
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
}

.full-block {
  width: 100%;
  height: 100%;
}

.posi-abs {
  position: absolute;
}

.posi-rel {
  position: relative;
}

.inner-gutter-normal {
  box-sizing: border-box;
  padding: 12px 15px 18px 17px;
  text-align: center;
  font-size: 0;
}

.compare_up {
  color: red;
}
.compare_down {
  color: green;
}

.const-updown-cell{
  text-align: center;
  font-size: 12px;
  p {
    text-align: center;
    &:first-child {
      line-height: 16px;
      margin-top: 4px;
    }
  }
}

.cus-title-indicator {
  background:#20a0ff;
  width:2px;
  height:22px;
  left: 0;
  top: 10px;
}

.tabledata-dealer {
  .hightlight {
    color: #20a0ff;
  }
}

.tabledata-suspicious-dealer {
  .hightlight {
    color: #20a0ff;
  }
}

.echarts {
  > div:first-child {
    width: 100% !important;
    height: 100% !important;
  }
}

.cus-icon-float-right {
  float: right;
  margin-top: 12px;
  font-size: 14px;
}

@import './classify.less';

</style>
