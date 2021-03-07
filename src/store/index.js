import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    package: {
      owner: {},
      repository: {},
    },
    valueVersion: []
  },
  mutations: {
    // добавление приходящих данных в state
    setItem(state, data) {
      state.package = data
      state.package.owner = data.owner
      state.package.repository = data.repository
    },

    // добавление приходящих данных в state
    setVersion(state, data) {
      state.valueVersion = data
    },
  },
  actions: {
    addPackage({ commit }, item) {
      console.log(item)
      // вызов мутации setPackages
      commit('setItem', item)
    },

    // Запрос файлов выбранной версии
    async fetchVersions({ commit }, { name, version }) {
      const res = await fetch(`https://data.jsdelivr.com/v1/package/npm/${name}@${version}`)
      const versionRes = await res.json()
      console.log(versionRes)
      commit('setVersion', versionRes)
    }
  },
  modules: {},
  getters: {
    // получение данных из state
    packageData(state) {
      return state.package
    },

    // получение данных из state
    versionData(state) {
      return state.valueVersion
    }
  }
});