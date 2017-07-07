<template>
  <div class="detail-list">
    <el-form ref="dealerSearch" :model="dealerSearch" label-width="80px" label-position="left">
      <el-col :span="24">
        <el-form-item label="查询对象" class="search-name">
          <el-input v-model="dealerSearch.name" placeholder="请输入查询对象"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="查询时间" class="search-time">
          <el-date-picker v-model="dealerSearch.time" type="datetimerange" placeholder="选择时间范围"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label-width="0">
          <el-button type="primary" @click="filterTable">查询</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="自动刷新">
          <el-switch v-model="dealerSearch.autoRefresh" on-text="开" off-text="关"></el-switch>
        </el-form-item>
      </el-col>
    </el-form>
    <article>
      <el-button type="text">操作1</el-button>
      <el-button type="text">操作2</el-button>
    </article>
    <el-table :data="dealerShowTable" stripe highlight-current-row align="left">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date" label="日期" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="name" label="姓名" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="标签" sortable :show-overflow-tooltip="true">
        <template scope="scope">
          <el-tag type="primary">{{ scope.row.tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="comment" label="备注" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text" class="edit">编辑</el-button>
          <el-button type="text" class="del">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="" @current-change="" :current-page="dealerCurrentPage" :page-sizes="[10,20,50,100,200]" layout="total,sizes,prev,pager,next,jumper" :total="dealerTotalItems"></el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'detailList',
    data () {
      return {
        msg: 'detail-list',
        dealerSearch: {
          name: '',
          time: '',
          autoRefresh: true
        },
        dealerTable:[],
        dealerShowTable:[],
        dealerCurrentPage: 1,
        dealerTotalItems: 2
      }
    },
    computed:{
    },
    created(){
      this.dealerTable = [
        {
          date: '2016-06-01',
          name: '王小虎',
          tag: '家',
          address: '上海市普陀区金沙江路1518弄',
          comment: '备注',
          num:2,
        },
        {
          date: '2016-06-02',
          name: '王大虎',
          tag: '公司',
          address: '上海市普陀区金沙江路1520弄',
          comment: '备注',
          num:1,
        }
      ]
      this.dealerShowTable = this.dealerTable
    },
    methods:{
      filterTable:function(){
        if(this.dealerSearch.name === ''){
          this.dealerShowTable = this.dealerTable
          return
        }
        this.dealerShowTable = this.dealerShowTable.filter((item)=>{
          if(item.name===this.dealerSearch.name){
              return item
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .detail-list {
    width: 100%;
    height: 100%;
    padding: 20px 10px 20px 30px;
    overflow-y: auto;
    background: #eceef3;
    .el-form {
      width: 100%;
      display: inline-block;
      border-bottom: 1px solid #d3dce6;
      .search-name {
        text-align: left;
        .el-input {
          width: 325px;
        }
      }
      .search-time {
        text-align: left;
        padding-right: 10px;
        .el-date-editor {
          width: 100%;
        }
      }
      .el-button {
        padding: 10px 30px;
      }
    }
    article {
      margin: 10px 0;
      text-align: left;
    }
    .el-table {
      margin-bottom: 20px;
      .edit {
        font-size:13px;
        color:#20a0ff;
      }
      .del {
        font-size:13px;
        color:#ff4949;
      }
    }
  }
</style>
