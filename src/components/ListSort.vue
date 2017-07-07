<template>
  <div class="list-sort">
    <el-dropdown trigger="click" @command="changeList">
      <span class="el-dropdown-link">
        {{text}}<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in sortList" :key="item" :command="item.text">{{item.text}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'listSort',
  data () {
    return {
      text:''
    }
  },
  props: {
    list: {
      type: Array,
      default: []
    },
    listIndex: {
      type: Object,
      default: {
        start: 0,
        end: 4
      }
    },
    num: {
      type: Number,
      default: 5
    }
  },
  computed:{
    sortList(){
      let list = []
      for(let i=0;i<(this.list.length/this.num);i++){
        list.push(
          {
            text:i>0?"top"+i*this.num+"-"+"top"+(i+1)*this.num:"top"+(i+1)*this.num,
            start:i*this.num,
            end:(i+1)*this.num-1
          }
        )
      }
      return list
    }
  },
  created:function () {
    if(this.sortList.length>0){
      this.text = this.sortList[0].text
    }
  },
  methods:{
    changeList:function (item) {
      this.text = item
      let sortData = this.sortList.filter((i)=>{
        if(i.text===item){
          return i
        }
      })[0]
      this.$emit('update:listIndex', {
        start:sortData.start,
        end:sortData.end
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .list-sort{
  }
</style>
