<template>
  <div class="page-container textalign-left">
    <div class="il-block self-gutter">
      <el-date-picker
        v-model="searchTimeRange"
        type="datetimerange"
        placeholder="选择时间范围">
      </el-date-picker>
      <el-button type="primary" @click="emitSearch" class="cus-btnsize cus-gutter">查询</el-button>
    </div>
    <auto-refresh-comp :refreshStatus="pageSwitchStatus" @switchStatusChange="switchStatusChange"></auto-refresh-comp>
    <el-tabs v-model="currentTab" type="card" editable @edit="handleTabsEdit" @tab-remove="handleTabRemove" @tab-add="handleTabAdd" @tab-click="handleTabClick">
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in memberTabList"
        :label="item.tabTitle"
        :name="item.name"
      >
        <keep-alive>
          <tab-content ref="tabContent"></tab-content>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import autoRefreshComp from '@comps/auto-refresh-comp';
import tabContent from '@pages/member-tabs/tab-content';

export default {
  name: 'member',
  components: {
    autoRefreshComp,
    tabContent
  },
  data () {
    return {
      msg: 'member',
      currentTab: '1',
      memberTabList: [{
        tabTitle: '综合类会员1',
        name: '1'
      }],
      pageSwitchStatus: true,
      searchTimeRange: ['', '']
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
          }
          this.memberTabList.splice(i, 1);
          this.chartResizeAction(i - 1, true);
          break;
        }
      }
    },
    handleTabAdd () {
      let targetTabAdded = {
        tabTitle: '综合类会员' + (this.memberTabList.length + 1),
        name: '' + (this.memberTabList.length + 1),
        tabContentView: 'tabContent' + (this.memberTabList.length + 1)
      };
      this.memberTabList.push(targetTabAdded);
    },
    handleTabClick (tab) {
      this.chartResizeAction(tab.index, true);
    },
    switchStatusChange (newStatus) {
      this.pageSwitchStatus = newStatus;
    },
    emitSearch () {
      console.log('emitSearch');
    },
    chartResizeAction (index, once) {
      this.$nextTick(() => {
        let clickTabRefs = this.$refs.tabContent[index].$refs;
        if(!this) return;
        if(this.$refs.tabContent[index].checkHasLoaded()) return;
        for (let ref of Object.values(clickTabRefs)) {
          if(ref.$refs && ref.$refs.chart != undefined) {
            ref.$refs.chart.resize();
          }
        }
        clickTabRefs.positionsDetailEcharts.$refs.positionStatusEcharts.$refs.chart.resize();
        clickTabRefs.positionsDetailEcharts.$refs.positionStructureEcharts.$refs.chart.resize();
        if (!!once) this.$refs.tabContent[index].setLoaded();
      });
    }
  },
  // watch: {
  //   currentTab (newValue, oldValue) {

  //   }
  // },
  created () {
    console.log('member created');
  },
  mounted () {
    console.log('member mounted');
    window.addEventListener('resize', () => {
      for (let i = 0; i < this.memberTabList.length; i++) {
        this.$refs.tabContent[i].resetLoaded();
        if (this.currentTab === this.memberTabList[i].name) {
          this.chartResizeAction(i);
        }
      }
    });
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
