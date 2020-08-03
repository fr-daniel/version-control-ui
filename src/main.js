import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

// Adiciona token na requisição
axios.interceptors.request.use(function (config) {
  if (store.getters["auth/isAuthenticated"]) {
    config.headers.Authorization = store.getters["auth/token"];
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {

  const hasAuthorization = Object.prototype.hasOwnProperty.call(response.headers, "authorization");

  if (hasAuthorization) {
    store.dispatch("auth/updateToken", {
      token: response.headers.authorization
    });
  }
  return response;
}, (error) => {
  if (error.response.status === 401 || error.response.status === 403) {
    store.dispatch("auth/removeToken");

    const path = error.response.data.path;
    const to = path.split(window.location.origin).pop();

    router.push({ name: 'Home', params: { to: to, invalidToken: true } })
  } else {
    throw error;
  }
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
