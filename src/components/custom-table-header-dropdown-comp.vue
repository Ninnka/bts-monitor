<template>
  <div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{text}}<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item of dropdownItems" :key="item.value" :command="item.value">{{item.label}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      default: '',
      type: String
    },
    dropdownItems: {
      default: function () {
        return [];
      },
      type: Array
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleCommand (command) {
      let params = {};
      this.$emit('handleCommand', params);
    }
  }
}
</script>

<style lang="less" scoped>

</style>
