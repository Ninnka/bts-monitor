import Vue from 'vue'
import Router from 'vue-router'
// import SignIn from '@pages/SignIn'
import tab from '@pages/tab'
// import market from '@pages/market'
// import member from '@pages/member'
// import dealer from '@pages/dealer'
import detailList from "@pages/DetailList.vue"

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/signIn'
    },
    {
      path: '/signIn',
      // component: SignIn
      component: (resolve) => {
        require(['@pages/SignIn'], resolve);
      }
    },
    {
      path: '/tab',
      component: tab,
      children: [
        {
          path: 'market',
          name: 'market',
          // component: market
          component: (resolve) => {
            require(['@pages/market'], resolve);
          }
        },
        {
          path: 'member',
          name: 'member',
          // component: member
          component: (resolve) => {
            require(['@pages/member'], resolve);
          }
        },
        {
          path: 'dealer',
          name: 'dealer',
          // component: dealer
          component: (resolve) => {
            require(['@pages/dealer'], resolve);
          }
        },
        {
          path: 'detailList',
          name: 'detailList',
          component: detailList
        },
      ]
    }
  ]
})
