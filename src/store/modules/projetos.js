import axios from 'axios'

// initial state
const state = () => ({
  all: []
})

// getters
const getters = {}

// actions
const actions = {
  getAllProjetos({ commit }) {
    return new Promise((resolve) => {
      axios.get('/projetos')
        .then(res => {
          commit('setProjetos', res.data)
        })
        .finally(() => resolve())
    });
  },
  deletarProjeto({ commit }, projeto) {
    return new Promise((resolve) => {
      axios.delete(`/projetos/${projeto.id}`)
        .then(() => {
          commit('deletarProjeto', projeto);
        })
        .finally(() => resolve())
    });
  },
  adicionarProjeto({ commit }, projeto) {
    return new Promise((resolve) => {
      axios.post(`/projetos`, projeto)
        .then((res) => {
          commit('adicionarProjeto', res.data);
        })
        .finally(() => resolve())
    });
  }
}

// mutations
const mutations = {
  setProjetos(state, projetos) {
    state.all = projetos
  },

  deletarProjeto(state, projeto) {
    state.all = state.all.filter(projetoState => projetoState != projeto)
  },

  adicionarProjeto(state, projeto) {
    state.all.push(projeto);
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}