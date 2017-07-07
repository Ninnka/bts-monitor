const state = {
	userMes: {},
  balance:0,
	bankList:[],
	wBankList:[],
	openId: 'zhou',
	payList:[],
	wDeployList:{
    count_limit:0,
    daily_limit_credit:0,
    maximum_credit:0,
    minimum_credit:0,
  },
  wTimeDeployList:{
	  enable:false,
    ranges:[],
    showTime:'暂无数据',
  },
  rDeployList:{
	  fee:0,
    minimum_credit:0,
  },
	showHistoryDetail:false,
	showHoldDetail:false,
}

// getters
const getters = {
	userMes: state => state.userMes,
	balance: state => state.balance,
	bankList: state => state.bankList,
	wBankList: state => state.wBankList,
	openId: state => state.openId,
	payList: state => state.payList,
  wDeployList: state => state.wDeployList,
  rDeployList: state => state.rDeployList,
	showHistoryDetail: state => state.showHistoryDetail,
	showHoldDetail: state => state.showHoldDetail,
}

// actions
const actions = {

}

// mutations
const mutations = {
	update_usermes(state, payload) {
		state.userMes = payload
	},
	update_balance(state, payload) {
		state.balance = payload
	},
	update_bankList(state, payload) {
		state.bankList = payload
	},
	update_wBankList(state, payload) {
		state.wBankList = payload
	},
	get_openId(state, payload) {
		state.openId = payload
	},
	get_signupUrl(state, payload) {
		state.signupUrl = payload
	},
	change_PayList_bankList_state(state){
		state.payList.forEach((item)=>{
			if(item.bank_list.length > 0){
				if(item.showBankList === false){
            item.showBankList = true
          }else if(item.showBankList === true){
            item.showBankList = false
          }
			}
		})
	},
  update_payList(state, payload) {
		state.payList = payload
	},
	get_wDeployList(state, payload) {
		state.wDeployList = payload
	},
  get_wTimeDeployList(state, payload){
    payload.showTime = ''
    if(payload.ranges.length>0){
      payload.ranges.map((o)=>{
        payload.showTime += o.hourLeft + ':' + (o.minuteLeft<10?('0'+o.minuteLeft):o.minuteLeft)+'~'+o.hourRight + ':' + (o.minuteRight<10?('0'+o.minuteRight):o.minuteRight)
      })
    }
    state.wTimeDeployList = payload
  },
  get_rDeployList(state, payload) {
    state.rDeployList = payload
  },
	show_HistoryDetail(state){
		state.showHistoryDetail = true
	},
	close_HistoryDetail(state){
		state.showHistoryDetail = false
	},
	show_HoldDetail(state){
		state.showHoldDetail = true
	},
	close_HoldDetail(state){
		state.showHoldDetail = false
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}
