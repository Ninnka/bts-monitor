<template>
  <div class="page-container textalign-left">
    <div class="posi-rel">
      <div class="il-block self-gutter">
        <el-date-picker
          v-model="searchTimeRange"
          type="datetimerange"
          placeholder="选择时间范围">
        </el-date-picker>
        <el-button type="primary" @click="emitSearch" class="cus-btnsize cus-gutter">查询</el-button>
      </div>
      <auto-refresh-comp :refreshStatus="pageSwitchStatus" @switchStatusChange="switchStatusChange"></auto-refresh-comp>
    </div>
    <el-tabs v-model="currentTab" type="card" editable @edit="handleTabsEdit" @tab-remove="handleTabRemove" @tab-add="handleTabAdd" @tab-click="handleTabClick">
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in memberTabList"
        :label="item.tabTitle"
        :name="item.name"
      >
      </el-tab-pane>
      <keep-alive>
        <tab-content v-show="memberTabList.length > 0" ref="tabContent" v-loading.lock="tabContentLoading" element-loading-text="拼命加载中"></tab-content>
      </keep-alive>
    </el-tabs>
  </div>
</template>

<script>
import autoRefreshComp from '@comps/auto-refresh-comp';
import tabContent from '@pages/member-tabs/tab-content';

import { Loading } from 'element-ui';

export default {
  name: 'member',
  components: {
    autoRefreshComp,
    tabContent
  },
  data () {
    return {
      windowResize: false,
      tabIsActived: false,
      firstRender: true,
      msg: 'member',
      currentTab: '1',
      memberTabList: [{
        tabTitle: '综合类会员1',
        name: '1'
      }],
      pageSwitchStatus: true,
      searchTimeRange: ['', ''],
      tabContentLoading: true
    }
  },
  methods: {
    handleTabsEdit (targetName, action) {
      console.log('targetName: ', targetName);
      console.log('action: ', action);
    },
    handleTabRemove (tabRemovedName) {
      for (let i = 0; i < this.memberTabList.length; i++) {
        if (tabRemovedName === this.memberTabList[i].name) {
          if (i > 0) {
            this.currentTab = this.memberTabList[i - 1].name;
            // this.chartResizeAction(i - 1, true);
            // TODO: 重新加载下一个tab的对应数据
          }else if (i == 0 && this.memberTabList.length >= 2) {
            this.currentTab = this.memberTabList[i + 1].name;
          }
          // TEST-START:
          this.setTabContentLoading();
          setTimeout(() => {
            this.removeTabContentLoading();
          }, 2000);
          // TEST-END:
          this.memberTabList.splice(i, 1);
          break;
        }
      }
    },
    handleTabAdd () {
      // 创建新的tab栏
      let targetTabAdded = {
        tabTitle: '综合类会员' + (this.memberTabList.length + 1),
        name: '' + (this.memberTabList.length + 1)
      };
      this.memberTabList.push(targetTabAdded);
      // TODO: 跳转到新增的tab并请求对应数据
    },
    handleTabClick (tab) {
      // TEST-START:
      this.setTabContentLoading();
      setTimeout(() => {
        this.removeTabContentLoading();
      }, 2000);
      // TEST-END:

      // TODO: 切换tba并重新加载对应数据，tabcontent进入loading状态

      // NOTE:
      // if (this.currentTab != tab.name) {
        
      // }
      // this.chartResizeAction(tab.index, true);
    },
    switchStatusChange (newStatus) {
      this.pageSwitchStatus = newStatus;
    },
    emitSearch () {
      console.log('emitSearch');
      // TODO: 根据关键字搜索
    },
    chartResizeAction (index, once) {
      this.$nextTick(() => {
        let clickTabRefs = this.$refs.tabContent.$refs;
        if(!this) return;
        if(this.$refs.tabContent.checkHasLoaded()) return;
        for (let ref of Object.values(clickTabRefs)) {
          if(ref.$refs && ref.$refs.chart != undefined) {
            ref.$refs.chart.resize();
          }
        }
        clickTabRefs.positionsDetailEcharts.$refs.positionStatusEcharts.$refs.chart.resize();
        clickTabRefs.positionsDetailEcharts.$refs.positionStructureEcharts.$refs.chart.resize();
        if (!!once) this.$refs.tabContent.setLoaded();
      });
    },
    useChartResize () {
      if (!this.tabIsActived) {
        return;
      }
      this.windowResize = false;
      for (let i = 0; i < this.memberTabList.length; i++) {
        this.$refs.tabContent.resetLoaded();
        this.chartResizeAction();
        // NOTE:
        // if (this.currentTab === this.memberTabList[i].name) {
        // }
      }
    },
    setTabContentLoading () {
      this.tabContentLoading = true;
    },
    removeTabContentLoading () {
      this.tabContentLoading = false;
    }
  },
  created () {},
  mounted () {
    window.addEventListener('resize', () => {
      this.windowResize = true;
    });
    window.addEventListener('resize', this.useChartResize);

   // TEST-START:
    setTimeout(() => {
      this.removeTabContentLoading();
    }, 2000);
   // TEST-END:
    
    // NOTE:
    // let loadingInstance = Loading.service({
    //   target: '.el-tabs__content',
    //   lock: true,
    //   text: '死命加载中',
    //   body: true
    // });
    // setTimeout(() => {
    //   loadingInstance.close();
    // }, 10000);
  },
  activated () {
    this.tabIsActived = true;
    if (this.windowResize) {
      this.useChartResize(); 
    }else {
      this.firstRender = false;
    }
  },
  deactivated () {
    this.tabIsActived = false;
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.useChartResize);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.textalign-left {
  text-align: left;
}
.page-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px 10px 20px 30px;
  background: #eceef3;
  box-sizing: border-box;
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
</style>
