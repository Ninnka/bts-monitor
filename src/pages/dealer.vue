<template>
    <div class="page-container textalign-left">
      <div class="posi-rel">
        <div class="il-block self-gutter">
          <el-select v-model="dealerSelected" filterable placeholder="请选择交易商" :loading="dealerLoading">
            <el-option v-for="dealer in dealerOptions" :key="dealer.id" :label="dealer.name" :value="dealer"></el-option>
          </el-select>
          <el-select class="cus-gutter" v-model="rulerSelected" filterable placeholder="请选择监控规则" :loading="rulerLoading">
            <el-option v-for="ruler in rulerOptions" :key="ruler.value" :label="ruler.label" :value="ruler"></el-option>
          </el-select>
          <el-button type="success" @click="addDealer" class="cus-btnsize cus-gutter">添加</el-button>
          <el-date-picker v-model="searchTimeRange" type="datetimerange" placeholder="选择时间范围" class="cus-gutter"></el-date-picker>
          <el-button type="primary" @click="emitSearch" class="cus-btnsize cus-gutter">查询</el-button>
        </div>
        <auto-refresh-comp :refreshStatus="pageSwitchStatus" @switchStatusChange="switchStatusChange"></auto-refresh-comp>
      </div>
      <div class="disp-flex muti-row">
        <content-item-wrap-comp class="dealer-monitor-item" v-for="(dealerItem, index) in dealersHadSelected" :key="dealerItem.id"
          :itemDetail="{
            'itemTitle': dealerItem.name,
            'itemSubTitle': [...(dealerItem.rulers), '监控']
          }"
          >
          <template slot="cus-box-top_right">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="getCommand('stop', index)" class="textalign-center menu-font">
                  暂停
                </el-dropdown-item>
                <el-dropdown-item
                  :command="getCommand('delete', index)" class="textalign-center menu-font">
                  删除监控
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template slot="cus-box-main">
            <div class="chart-wrap">
              <chart :options="dealerMonitorOptionsArr[index]" ref="chart"></chart>
            </div>
          </template>
        </content-item-wrap-comp>
      </div>
    </div>
</template>

<script>
import autoRefreshComp from '@comps/auto-refresh-comp';
import contentItemWrapComp from '@comps/content-item-wrap-comp';

import { dealerMonitorOptions, seriesOption, getRandom } from '@mixins/tmp-dealer-monitor-options';
import { cloneDeep } from 'lodash';

export default {
  firstRender: true,
  name: 'dealer',
  components: {
    autoRefreshComp,
    contentItemWrapComp,
  },
  data () {
    let xAxisData = [];
    for (let i = 0; i < 24; i++) {
      if (i < 10) {
        xAxisData.push('0' + i + ':00');
      }else {
        xAxisData.push(i + ':00');
      }
    }

    return {
      msg: 'dealer',
      pageSwitchStatus: true,
      searchTimeRange: ['', ''],
      dealersHadSelected: [
        {
          name: 'dealer-1',
          id: 1,
          rulers: [
            {
              label: '流入',
              value: 'in'
            },
            {
              label: '流出',
              value: 'out'
            }
          ]
        }
      ],
      rulerLoading: false,
      dealerLoading: false,
      dealerSelected: '',
      rulerSelected: '',
      dealerOptions: [
        {
          name: 'dealer-1',
          id: 1
        },
        {
          name: 'dealer-2',
          id: 2
        },
        {
          name: 'dealer-3',
          id: 3
        }
      ],
      rulerOptions: [
        {
          label: '全部',
          value: 'all'
        },
        {
          label: '流出',
          value: 'out'
        },
        {
          label: '流入',
          value: 'in'
        }
      ],
      dealerMonitorOptionsColor: {
        out: '#ff4949',
        in: '#13ce66'
      },
      dealerMonitorOptionsArr: []
    }
  },
  methods: {
    addDealer () {
      if (!this.dealerSelected) {
        this.$message({
          showClose: true,
          message: '请选择交易商',
          type: 'error',
          duration: 1500
        });
        return;
      }
      if (!this.rulerSelected) {
        this.$message({
          showClose: true,
          message: '请选择监控规则',
          type: 'error',
          duration: 1500
        });
        return;
      }
      let tmpRulerOptions = this.rulerOptions.slice(0, this.rulerOptions.length);
      let preRuler = [];
      if (this.rulerSelected.value == 'all') {
        preRuler = [...tmpRulerOptions];
        preRuler.shift();
      }else {
        preRuler = [this.rulerSelected];
      }
      this.dealersHadSelected.push({
        name: this.dealerSelected.name,
        id: this.dealersHadSelected.length + 1,
        rulers: [...preRuler]
      });
      this.dealerMonitorOptionsArr.push(Object.assign({}, this.customChartOption(this.dealersHadSelected.length - 1)));
      this.dealerSelected = '';
      this.rulerSelected = '';
    },
    emitSearch () {

    },
    switchStatusChange (newStatus) {
      this.pageSwitchStatus = newStatus;
    },
    handleCommand (command) {
      let commandObj = JSON.parse(command);
      this.dealersHadSelected.splice(commandObj.index, 1);
    },
    getCommand (type, index) {
      return JSON.stringify({
        cm: type,
        index: index
      })
    },
    customChartOption (index) {
      let series = [];
      let color = [];
      let dealerMonitorOptionsTmp = JSON.parse(JSON.stringify(dealerMonitorOptions));
      for (let ruler of this.dealersHadSelected[index].rulers) {
        color.push(this.dealerMonitorOptionsColor[ruler.value]);
        dealerMonitorOptionsTmp.legend.data.push(ruler.label);
        let seriesOptionTmp = JSON.parse(JSON.stringify(seriesOption));
        seriesOptionTmp.name = ruler.label;
        for (let i = 0; i <= 24; i++) {
          seriesOptionTmp.data.push(getRandom(100, 500));
        }
        series.push(seriesOptionTmp);
      }
      dealerMonitorOptionsTmp.color = color;
      dealerMonitorOptionsTmp.series = series;
      return dealerMonitorOptionsTmp;
    },
    resizeChart () {
      let chartRefs = this.$refs.chart;
      if (chartRefs && chartRefs.length > 0) {
        for (let chart of chartRefs) {
          chart.resize();
        }
      }
    }
  },
  watch: {},
  created () {
    console.log('dealer created');
  },
  mounted () {
    console.log('dealer mounted');
    // 以下仅为测试用
    this.dealerMonitorOptionsArr.push(JSON.parse(JSON.stringify(this.customChartOption(0))));
  },
  activated () {
    console.log('dealer activated');
    window.addEventListener('resize', this.resizeChart);
    if (!this.firstRender) {
      this.resizeChart(); 
    }else {
      this.firstRender = false;
    }
  },
  deactivated () {
    console.log('dealer deactivated');
    window.removeEventListener('resize', this.resizeChart);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.textalign-left {
  text-align: left;
}
.textalign-center {
  text-align: center;
}
.page-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px 10px 20px 30px;
  background: #eceef3;
  overflow-y: auto;
  box-sizing: border-box;
  overflow: hidden;
}
.il-block {
  display: inline-block;
}
.self-gutter {
  margin: 0 0 20px;
}
.cus-btnsize {
  width: 88px;
  height: 36px;
  letter-spacing: 3px;
}
.cus-gutter {
  margin-left: 10px;
}
.disp-flex {
  display: flex;
  flex-wrap: wrap;
}
.muti-row {
  width: 100%;
  justify-content: space-between;
  padding-right: 30px;
  max-height: calc(~"100% - 56px");
  overflow-x: auto;
  overflow-y: auto;
  box-sizing: content-box;
}
.dealer-monitor-item {
  max-width: 49%;
  min-width: 49%;
  height: 280px;
  flex-grow: 1;
  flex-shrink: 1;
}
.menu-font {
  font-family:PingFangSC-Regular;
  font-size:14px !important;
}
.chart-wrap {
  width: 100%;
  height: 258px;
}
.echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
