<template>
  <div class="region region-nobefore position-holder">
    <header>
      持仓人
      <div class="is-flex right">
        <list-sort :list="positionHolderList" :listIndex.sync="positionHolderListIndex"></list-sort>
        <el-dropdown trigger="click" @command="changeNav">
      <span class="el-dropdown-link">
        {{text}}<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in navList" :key="item" :command="item.text">{{item.text}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <div class="region-main">
      <ul>
        <li class="is-flex" :class="item.className" v-for="item in filterShowList(positionHolderList,positionHolderListIndex.start,positionHolderListIndex.end)" :key="item">
          <div class="serial-num">
            {{ item.index }}
          </div>
          <div class="hold-person-detail">
            <p>
              {{item.name}}
              <span>{{item.num}}笔/￥{{item.value}}</span>
            </p>
            <el-progress :percentage="item.proportion*100" :stroke-width="strokeWidth"></el-progress>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'positionHolder',
  data () {
    return {
      text:'综合类会员',
      navList:[
        {
          text:'综合类会员'
        },
        {
          text:'交易商'
        },
      ],
      strokeWidth:12,
      positionHolderList:[
        {
          name:'综合类会员1',
          num:100,
          value:1000,
          proportion:0.3,
        },
        {
          name:'综合类会员2',
          num:100,
          value:1000,
          proportion:0.2,
        },
        {
          name:'综合类会员3',
          num:100,
          value:1000,
          proportion:0.1,
        },{
          name:'综合类会员4',
          num:100,
          value:1000,
          proportion:0.05,
        },
        {
          name:'综合类会员5',
          num:100,
          value:1000,
          proportion:0.02,
        },
        {
          name:'综合类会员6',
          num:100,
          value:1000,
          proportion:0.2,
        },
        {
          name:'综合类会员7',
          num:100,
          value:1000,
          proportion:0.1,
        }
      ],
      positionHolderListIndex:{
        start:0,
        end:4
      }
    }
  },
//  props: {
//    warnList: {
//      type: Array,
//      default: []
//    },
//  },
  created(){
    this.positionHolderList = this.sort(this.positionHolderList,'proportion').reverse()
    this.positionHolderList.forEach((item,index)=>{
      item.index = index
      switch (index+1){
        case 1:
          item.className = 'hold-one';
          break;
        case 2:
          item.className = 'hold-two';
          break;
        case 3:
          item.className = 'hold-three';
          break;
        default:
          item.className = '';
      }
    })
  },
  methods:{
    changeNav(item){
      this.text = item
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .position-holder{
    flex: 1;
    .region-main{
      ul{
        box-sizing: border-box;
        padding: 20px;
        li{
          height: 40px;
          font-size: 12px;
          align-items: flex-start;
          margin-top: 5px;
          .serial-num{
            width: 20px;
            height: 20px;
            text-align: center;
            border-radius:100%;
            line-height: 20px;
            color:#20a0ff;
          }
          .hold-person-detail{
            flex: 1;
            p{
              text-align: left;
              margin-left: 10px;
              height: 20px;
              span{
                margin-left: 10px;
                color: #20a0ff;
              }
            }
            .el-progress-bar__inner{
              background-color: #20a0ff;
            }
          }
        }
        .hold-one{
          .serial-num{
            background:#ff4c4b;
            color:#fff;
          }
          .hold-person-detail{
            p{
              span{
                color:#ff4c4b;
              }
            }
          }
        }
        .hold-two{
          .serial-num{
            background:#f9be28;
            color:#fff;
          }
          .hold-person-detail{
            p{
              span{
                color:#f9be28;
              }
            }
          }
        }
        .hold-three{
          .serial-num{
            background:#02cf65;
            color:#fff;
          }
          .hold-person-detail{
            p{
              span{
                color:#02cf65;
              }
            }
          }
        }
      }
    }
  }
</style>
