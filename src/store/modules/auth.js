import axios from 'axios'
import router from '../../router'

// state
const state = {
  token: localStorage.getItem("token"),
  token_update_date: new Date(localStorage.getItem("token_update_date")),
  user: { permissions: [], email: '' }
};

// actions
const actions = {
  login({ commit }, authData) {
    return new Promise((resolve) => {
      axios.post('/login', {
        email: authData.email,
        password: authData.password
      })
        .then(res => {
          const date = new Date();
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('token_update_date', date);
          localStorage.setItem('user', { permissions: res.data.papeis, email: res.data.email });
          commit('AUTHENTICATE', { token: res.data.token, permissions: res.data.papeis, date },)
        })
        .finally(() => resolve())

    })
  },

  logout({ commit }) {
    localStorage.removeItem('token');
    localStorage.removeItem('token_update_date');
    commit('CLEAR_AUTH_DATA');
    router.push('/login')
  },

  updateToken({ commit }, tokenData) {
    const date = new Date();
    localStorage.setItem('token', tokenData.token);
    localStorage.setItem('token_update_date', date);
    commit('UPDATE_AUTH_DATA', { token: tokenData.token, date });
  },

  removeToken({ commit }) {
    localStorage.removeItem('token');
    localStorage.removeItem('token_update_date');
    commit('CLEAR_AUTH_DATA')
  }
};

// getters
const getters = {
  isAuthenticated(state) {
    if (state.token !== null) {
      const MINUTOS_VALIDADE_TOKEN = 60;
      const minutos = parseInt(((new Date() - state.token_update_date) / 1000) / MINUTOS_VALIDADE_TOKEN);
      return minutos < MINUTOS_VALIDADE_TOKEN;
    }
    return false;
  },
  token(state) {
    return state.token
  },
  user(state) {
    return state.user
  },

};

// mutations
const mutations = {
  AUTHENTICATE: (state, authUser) => {
    state.token = authUser.token;
    state.token_update_date = authUser.date;
  },
  CLEAR_AUTH_DATA: (state) => {
    state.token = null;
    state.token_update_date = null;
  },
  UPDATE_AUTH_DATA: (state, tokenData) => {
    state.token = tokenData.token;
    state.token_update_date = tokenData.date;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
