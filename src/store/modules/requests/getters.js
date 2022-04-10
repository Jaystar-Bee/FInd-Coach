export default {
    requests(state, getters, rootState, rootGetters) {
        const coachId = rootGetters.activeId
        return state.requests.filter(request => request.coachId === coachId)
    },
    hasRequest(state, getter) {
        return getter.requests && getter.requests.length > 0
    }
}