export default {
    namespaced: true,
    state: {
        endpoint: 'module',
        params: {
            page: 1,
            paginar: true
        },
        loading: false,
        navs: [],
    },
    getters: {
        endpoint: (state) => state.endpoint,
        params: (state) => state.params,
        loading: (state) => state.loading,
        navs: (state) => state.navs
    },
    mutations: {
        setParams: (state, payload) => state.params = payload,
        setLoading: (state, payload) => state.loading = payload,
        setNavs: (state, payload) => state.navs = payload
    },
    actions: {
        index ({ commit, state }, payload) {
            return new Promise((res, rej) => {
                this.dispatch('index', {endpoint: state.endpoint, params: payload})
                .then((data) => {
                    commit('setNavs', data)
                    res(data)
                }).catch(error => {
                    rej(error.response)
                })
            })
        }
    }
}
