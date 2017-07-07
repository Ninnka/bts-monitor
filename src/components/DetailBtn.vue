<template>
  <div class="detail-btn" @click="showDetailList">
    详细
  </div>
</template>

<script>
export default {
  name: 'detail-btn',
  data () {
    return {
      msg: 'listSort',
    }
  },
  methods:{
    showDetailList:function () {
      window.open('http://localhost:8888/tab/detailList')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .list-sort{
  }
</style>
