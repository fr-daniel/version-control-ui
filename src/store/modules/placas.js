import axios from 'axios'

// initial state
const state = () => ({
  all: []
})

// getters
const getters = {}

// actions
const actions = {
  getAllPlacas({ commit }) {
    return new Promise((resolve) => {
      axios.get('/placas')
        .then(res => {
          commit('setPlacas', res.data)
        })
        .finally(() => resolve())
    });
  },
  deletarPlaca({ commit }, placa) {
    return new Promise((resolve) => {
      axios.delete(`/placas/${placa.id}`)
        .then(() => {
          commit('deletarPlaca', placa);
        })
        .finally(() => resolve())
    });
  },
  adicionarPlaca({ commit }, placa) {
    return new Promise((resolve) => {
      axios.post(`/placas`, placa)
        .then((res) => {
          commit('adicionarPlaca', res.data);
        })
        .finally(() => resolve())
    });
  }
}

// mutations
const mutations = {
  setPlacas(state, placas) {
    state.all = placas
  },

  deletarPlaca(state, placa) {
    state.all = state.all.filter(placaState => placaState != placa)
  },

  adicionarPlaca(state, placa) {
    state.all.push(placa);
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}