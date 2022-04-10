export default {
    coaches(state) {
        return state.coaches
    },
    hasCoaches(state) {
        return state.coaches && state.coaches.length > 0
    },
    isCoach(state, getters, rootState, rootGetters) {
        const id = rootGetters.activeId
        const registeredCoach = getters.coaches
        return registeredCoach.some(coach => coach.id === id)
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch
        if (!lastFetch) {
            return true
        }
        const currentTimeFetch = new Date().getTime()
        return (currentTimeFetch - lastFetch) / 1000 > 60;

    },
}