export default {
  namespaced: true,
  state: {
    endpoint: 'sede',
    params: {},
    loading: false,
    sedes: [],
  },
  getters: {
    endpoint: (state) => state.endpoint,
    params: (state) => state.params,
    loading: (state) => state.loading,
    sedes: (state) => state.sedes
  },
  mutations: {
    setParams: (state, payload) => state.params = payload,
    setLoading: (state, payload) => state.loading = payload,
    setSede: (state, payload) => state.sedes = payload
  },
  actions: {
    index({
      commit,
      state
    }, payload) {
      commit('setLoading', true)
      let response = new Promise((res, rej) => {
        this.getters.api.get(state.endpoint, payload)
          .then(response => {
            res(response.data)
          }).catch(error =>
            rej(error)
          )
      })

      response.then(data => {
        commit('setSede', data)
      }).catch(error => {
        console.log(error)
      }).then(() => {
        commit('setLoading', false)
      })
    }
  }
}
