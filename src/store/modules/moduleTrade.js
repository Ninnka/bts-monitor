const state = {
	fee: 0,
	showOrder:false,
	timeDifference:0,
  id:'zhou'
}

// getters
const getters = {
	fee: state => state.fee,
	showOrder: state => state.showOrder,
}

// actions
const actions = {

}

// mutations
const mutations = {
	get_trade_fee(state, payload) {
		state.fee = payload
	},
	show_order(state){
		state.showOrder = true
	},
	close_order(state){
		state.showOrder = false
	},
  update_id(state,payload){
	  state.id=payload
  },
  update_timeDifference(state, payload) {
    state.timeDifference = payload
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}
