export default {
    namespaced: true,
    state: {
        endpoint: 'prestacion',
        params: {},
        loading: false,
        prestaciones: [],
    },
    getters: {
        endpoint: (state) => state.endpoint,
        params: (state) => state.params,
        loading: (state) => state.loading,
        prestaciones: (state) => state.prestaciones
    },
    mutations: {
        setParams: (state, payload) => state.params = payload,
        setLoading: (state, payload) => state.loading = payload,
        setPrestaciones: (state, payload) => state.prestaciones = payload
    },
    actions: {
        index ({ commit, state }, payload) {
            commit('setLoading', true)
            let response = new Promise((res, rej) => {
                this.getters.api.get(state.endpoint, payload)
                .then(response => {
                    res(response.data)
                }).catch(error =>
                    rej(error)
                )
            })

            response.then(data => {
                commit('setPrestaciones', data)
            }).catch(error => {
                console.log(error)
            }).then(() => {
                commit('setLoading', false)
            })
        }
    }
}
