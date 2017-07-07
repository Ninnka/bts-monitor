// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
Vue.mixin({
  methods:{
    filterShowList(list,start,end){
      return list.filter((item,index)=>{
        if(index>=start&&index<=end){
          return item
        }
      })
    },
    sort:function(array,key) {
      let tmp_array = array.slice(0), result,
        quickSort = function(arr) {
          if (arr.length <= 1) { return arr; }
          let pivotIndex = Math.floor(arr.length / 2);
          let pivot = arr.splice(pivotIndex, 1)[0];
          let left = [];
          let right = [];
          for (var i = 0; i < arr.length; i++){
            if (arr[i][key] < pivot[key]) {
              left.push(arr[i]);
            } else {
              right.push(arr[i]);
            }
          }
          return quickSort(left).concat([pivot], quickSort(right));
        };
      result = quickSort(tmp_array);
      return result;
    },
  }
});
// Vue.filter('filterIndex', function (array,start,end) {
//   return array.filter((item,index)=>{
//     if(index>=start&&index<=end){
//       return item
//     }
//   })
// })
Vue.filter('filterKey', function (array,key) {
  return array.map((item,index)=>{
      return item[key]
  })
})
//引进路由模块
import router from './router';

//引进公共样式
import "assets/css/common.less";

//引进element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

//引入状态管理
import store from './store'

//引入图表
import ECharts from 'vue-echarts'
// register component to use
Vue.component('chart', ECharts)

//引入全局组件
import detailBtn from "@/components/DetailBtn.vue"
import listSort from "@/components/ListSort.vue"
Vue.component('detail-btn', detailBtn)
Vue.component('list-sort', listSort)

Vue.config.productionTip = true;
Vue.use(ElementUI);
/* eslint-disable no-new */
var app = new Vue({
    router: router,
    store,
    render: h => h(App)
}).$mount('#app');
