<template>
  <div class="top-switch">
    <span>自动刷新</span>
    <el-switch
      :value="refreshStatus"
      @change="switchChange">
    </el-switch>
  </div>
</template>

<script>
export default {
  props: {
    refreshStatus: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {

    }
  },
  methods: {
    switchChange (newStatus) {
      this.$emit('switchStatusChange', newStatus);
    }
  }
}
</script>

<style lang="less">
  .top-switch{
    position: absolute;
    right: 40px;
    top: 8px;
    span{
      display: inline-block;
      height: 22px;
      width: auto;
      font-size: 14px;
      margin-right: 10px;
    }
  }
</style>
