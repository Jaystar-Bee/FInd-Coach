export default {
    async addCoach(context, payload) {
        const coachId = context.rootGetters.activeId
        const coachData = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            description: payload.description,
            hourlyRate: payload.hourlyRate,
            areas: payload.areas,
        }
        const token = context.rootGetters.token
        try {
            await fetch(`https://coach-de336-default-rtdb.firebaseio.com/coaches/${coachId}.json?auth=${token}`, {
                method: 'PUT',
                body: JSON.stringify(coachData)
            })

        } catch (error) {
            console.log(error)
        }
        context.commit('addCoach', { ...coachData, id: coachId })
    },

    async loadCoaches(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return
        }

        try {

            const response = await fetch(`https://coach-de336-default-rtdb.firebaseio.com/coaches.json`)
            const responseData = await response.json()

            let coaches = []
            for (const key in responseData) {
                const coach = {
                    id: key,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    description: responseData[key].description,
                    hourlyRate: responseData[key].hourlyRate,
                    areas: responseData[key].areas
                }
                coaches.push(coach)

            }
            context.commit('setCoaches', coaches);
            context.commit('setLastFetchStamp')

        } catch (error) {
            const err = new Error(error.message || 'Unable to get the coaches list!')
            throw err
        }

    }
}