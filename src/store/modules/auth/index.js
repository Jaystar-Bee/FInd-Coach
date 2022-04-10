import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default {
    state() {
        return {
            userId: null,
            token: null,
            tokenExpiration: null,
            didAutoLogout: false,
        }
    },
    getters: getters,
    mutations: mutations,
    actions: actions
}