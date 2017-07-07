<template>
  <div>
    <chart :options="pieOption" ref="chart"></chart>
    <slot name="pieContent"></slot>
  </div>
</template>

<script>
export default {
  name:'pie-echarts',
  data () {
    return {
    }
  },
  props: {
    pieOption: {
      type: Object,
      default: {}
    }
  },
  created(){
  }
}
</script>

<style lang="less" scoped>
</style>
