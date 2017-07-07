const state = {
	modeList: [
		{ 'mode': 0, 'text': '周期' },
		{ 'mode': 1, 'text': '点差' }
	],
	marketList: [],
	marketSocket:'',
  point:{},
}

// getters
const getters = {
	goodsList: state => state.goodsList,
	modeList: state => state.modeList,
  point: state => state.point,
}

// actions
const actions = {

}

// mutations
const mutations = {
	clean_marketList(state){
		while(state.marketList.length) {
			state.marketList.pop()
		}
	},
  get_marketList(state, payload) {
    state.marketList.push(payload)
  },
	http_marketList(state, payload) {
		state.marketList = state.marketList.map((good)=>{
			payload.map((market)=>{
				if(good.sn === market.code){
					good.open = market.open
					good.close = market.close
					good.high = market.high
					good.low = market.low
					good.value = Number(market.value.toFixed(good.decimalPlace))
					good.time = market.time
				}
			})
			return good
		})
	},
	socket_marketList(state, payload) {
    state.marketList = state.marketList.map((item) => {
      if (item.sn === payload.code) {
        if (item.value < payload.value) {
          item.bg = 'up-bg'
          item.color = 'up'
        } else if (item.value > payload.value) {
          item.bg = 'down-bg'
          item.color = 'down'
        }
        item.value = Number(payload.value.toFixed(item.decimalPlace))
        item.time = payload.time
      }
      return item
    })
	},
  update_point(state, payload){
    state.point = state.marketList.filter((item)=>{
        if(item.sn === payload){
        return item
      }
    })[0]
  }
}

export default {
	state,
	getters,
	actions,
	mutations
}
