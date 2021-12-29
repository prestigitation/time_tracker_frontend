import { createStore } from 'vuex'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { state } from './state'
//TODO: запоминание состояний колонок (их порядка)
export default createStore({
  state,
  mutations,
  actions,
  getters
})
