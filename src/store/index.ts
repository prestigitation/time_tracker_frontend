import { createStore } from 'vuex'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { state } from './state'
import createPersistedState from "vuex-persistedstate";
//TODO: запоминание состояний колонок (их порядка)
export default createStore({
  plugins: [ createPersistedState() ],
  state,
  mutations,
  actions,
  getters
})
