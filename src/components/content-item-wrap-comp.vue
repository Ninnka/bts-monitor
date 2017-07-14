<template>
  <div class="content-item-wrap il-block" :class="cusStyle">
    <div class="il-block item-title-wrap" v-if="showTitle">
      <div class="item-title" :class="[showTitleIndicator ? 'item-title-indicator' : '']">{{ getItemTitle }}
        <span v-if="itemDetail.itemSubTitle != undefined">
          <span v-for="subTitle of itemDetail.itemSubTitle" :key="subTitle.label"> {{ getSubTitle(subTitle) }} </span>
        </span>
      </div>
    </div>
    <div class="cus-box-top_right">
      <slot name="cus-box-top_right"></slot>
    </div>
    <div>
      <slot name="cus-box-main"></slot>
    </div>
    <slot name="cus-posi-abs"></slot>
  </div>
</template>

<script>
export default {
  props: {
    cusStyle: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showTitleIndicator: {
      type: Boolean,
      default: true
    },
    itemDetail: {
      type: Object,
      default: function () {
        return {

        }
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    getSubTitle (subTitle) {
      if (typeof subTitle == 'object') {
        return subTitle.label;
      }else if (typeof subTitle == 'string') {
        return subTitle;
      }
    }
  },
  computed: {
    getItemTitle () {
      if (this.itemDetail.itemTitle != '' && this.itemDetail.itemTitle != undefined) {
        return this.itemDetail.itemTitle;
      }else {
        return '';
      }
    }
  },
  mounted () {}
}
</script>

<style lang="less" scoped>
.il-block {
  display: inline-block;
}
.content-item-wrap {
  background:#ffffff;
  border:1px solid #d3dce6;
  box-shadow:0 2px 4px 0 rgba(0,0,0,0.12), 0 0 6px 0 rgba(0,0,0,0.04);
  border-radius:4px;
  min-height:150px;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
  .item-title-wrap {
    margin-top: 8px;
  }
  .item-title {
    position: relative;
    font-size: 16px;
    padding-left: 12px;
    line-height: 22px;
  }
  .item-title-indicator {
    &:before {
      content: '';
      display: block;
      position: absolute;
      background:#20a0ff;
      width:2px;
      height:22px;
      left: 0;
    }
  }
}
.cus-box-top_right {
  position: absolute;
  top: 10px;
  font-size: 12px;
  right: 10px;
  font-family:PingFangSC-Regular;
  color:#20a0ff;
  letter-spacing:0;
}
.el-dropdown {
  color: #20a0ff !important;
}
.el-dropdown-link {
  color: #20a0ff !important;
}
</style>
