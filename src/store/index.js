import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import firmware from './modules/firmware'
import projetos from './modules/projetos'
import placas from './modules/placas'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    firmware,
    projetos,
    placas,
  },
})

