<template>
  <div class="inner-gutter-normal">
    <el-table ref="activeDealerTable" :data="tableData" border style="width: 100%;" height="240" :default-sort = "{prop: 'dealer', order: 'ascending'}" @header-click="suspiciousDealerTableHeaderClick">
      <el-table-column prop="dealer" label="交易商">
        <template scope="scope">
          <div class="tabledata-dealer">
            <p class="hightlight">{{scope.row.organizetionName}}</p>
            <p>20天前开通</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="recharge" label="充值" width="120" :render-header="renderHeader">
        <template scope="scope">
          <div class="const-updown-cell">
            <p>次数：{{scope.row.rechargeFrequency}}</p>
            <p>总额：{{scope.row.rechargeMount}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="profit" label="盈利" width="110" :render-header="renderHeader">
        <template scope="scope">
          <div class="const-updown-cell">
            <p>次数：{{scope.row.profitFrequency}}</p>
            <p>总额：{{scope.row.profitMount}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="withDrawal" label="提现" width="100" :render-header="renderHeader">
        <template scope="scope">
          <div class="const-updown-cell">
            <p>次数：{{scope.row.withDrawalFrequency}}</p>
            <p>总额：{{scope.row.withDrawalMount}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" width="90">
        <template scope="scope">
          <div class="tabledata-suspicious-dealer">
            <span class="hightlight">监控</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    suspiciousDealerTableData: {
      default: () => {
        return [];
      },
      type: Array
    }
  },
  data () {
    return {
      tableData: this.suspiciousDealerTableData,
      sortStatus: {
        recharge: {
          frequency: 'default',
          total: 'default'
        },
        profit: {
          frequency: 'default',
          total: 'default'
        },
        withDrawal: {
          frequency: 'default',
          total: 'default'
        }
      },
      currentTableHeaderClick: ''
    }
  },
  methods: {
    suspiciousDealerTableHeaderClick (column, event) {
      // console.log(column);
      this.currentTableHeaderClick = column.property;
    },
    sortAscending (colName, sortBy) {
      let col = '';
      if (sortBy == 'frequency') {
        col = colName + 'Frequency';
      }else if (sortBy == 'total') {
        col = colName + 'Mount';
      }
      this.tableData.sort((a, b) => {
        return a[col] - b[col];
      });
      this.tableData = this.tableData.slice(0, this.tableData.length);
    },
    sortDescending (colName, sortBy) {
      let col = '';
      if (sortBy == 'frequency') {
        col = colName + 'Frequency';
      }else if (sortBy == 'total') {
        col = colName + 'Mount';
      }
      this.tableData.sort((a, b) => {
        return b[col] - a[col];
      });
      this.tableData = this.tableData.slice(0, this.tableData.length);
    },
    renderHeader(createElement, { column }) {
      return createElement(
        'el-dropdown',
        {
          on: {
            command: (command) => {
              // console.log('this.currentTableHeaderClick', this.currentTableHeaderClick);
              if (this.sortStatus[this.currentTableHeaderClick][command] == 'default' || this.sortStatus[this.currentTableHeaderClick][command] == 'descending') {
                console.log('action ascending');
                this.sortAscending(this.currentTableHeaderClick, command);
                this.sortStatus[this.currentTableHeaderClick][command] = 'ascending';
              }else if (this.sortStatus[this.currentTableHeaderClick][command] == 'ascending') {
                console.log('action descending');
                this.sortDescending(this.currentTableHeaderClick, command);
                this.sortStatus[this.currentTableHeaderClick][command] = 'descending';
              }
            }
          },
          attrs: {
            trigger: 'click'
          }
        },
        [
          createElement('span',
          [
            column.label,
            createElement('i',
            {
              class: {
                'el-icon-arrow-down': true,
                'el-icon--right': true
              }
            })
          ], {
            class: {
              'el-dropdown-link': true
            }
          }),
          createElement('el-dropdown-menu',
            {
              slot: 'dropdown',
            },
            [
              createElement('el-dropdown-item', {
                attrs: {
                  command: 'frequency'
                }
              }, ['次数',
                createElement('i', {
                  class: {
                    'el-icon-d-caret': true,
                    'cus-icon-float-right': true
                  }
                })
              ]),
              createElement('el-dropdown-item', {
                attrs: {
                  command: 'total'
                }
              }, ['总额',
                createElement('i', {
                  class: {
                    'el-icon-d-caret': true,
                    'cus-icon-float-right': true
                  }
                })
              ])
            ]
          )
        ]
      );
      // return createElement(
      //   'custom-table-header-dropdown-comp',
      //   {
      //     props: {
      //       text: column.label,
      //       dropdownItems: [
      //         {label: '次数', value: 'frequency'},
      //         {label: '总额', value: 'total'}
      //       ]
      //     }
      //   }
      // );
    },
  },
  computed: {},
  watch: {
    suspiciousDealerTableData (newValue) {
      this.tableData = newValue;
    }
  }
}
</script>

<style lang="less" scoped>
  .el-table th {
    text-align: center !important;
  }
</style>
