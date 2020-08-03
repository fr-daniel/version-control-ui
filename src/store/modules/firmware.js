import axios from 'axios'
import FileDownload from 'js-file-download'

// initial state
const state = () => ({
  all: [],
  projetoFilter: null,
  placaFilter: null,
})

// getters
const getters = {
  getByProjetoEPlaca(state) {
    return state.all.filter(firmware => {
      const projetoIgual = state.projetoFilter != null ? state.projetoFilter.id == firmware.projeto.id : true;
      const placaIgual = state.placaFilter != null ? state.placaFilter.id == firmware.placa.id : true;
      return projetoIgual && placaIgual;
    });
  },
}

// actions
const actions = {
  getAllFirmwares({ commit }) {
    return new Promise((resolve) => {
      axios.get('/firmware')
        .then(res => {
          commit('setFirmwares', res.data)
        })
        .finally(() => resolve())

    })
  },

  downloadFirmware({ commit }, firmware) {
    return new Promise((resolve) => {
      axios.get(`/firmware/download/${firmware.id}`, { responseType: 'arraybuffer', })
        .then(res => {
          FileDownload(res.data, res.headers.nomefirmware)
        })
        .finally(() => resolve())

    })
  },

  getAllFirmwaresPorProjetoOuPlaca({ commit }, { projeto, placa }) {
    commit('setProjetoEPlacaFilter', { projeto, placa });
  },

  addFirmware({ commit }, { projeto, placa, tipoVersao, currentFile }) {
    const formData = new FormData();
    formData.append('projeto', projeto.id);
    formData.append('placa', placa.id);
    formData.append('tipoVersao', tipoVersao);
    formData.append('file', currentFile);

    return new Promise((resolve) => {
      axios.post('/firmware', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          commit('addFirmware', res.data)
        })
        .finally(() => resolve())

    })

  }
}

// mutations
const mutations = {
  setFirmwares(state, firmwares) {
    state.all = firmwares
  },

  setProjetoEPlacaFilter(state, { projeto, placa }) {
    state.projetoFilter = projeto;
    state.placaFilter = placa;
  },

  decrementProductInventory(state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  },

  addFirmware(state, firmware) {
    state.all.push(firmware);
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}