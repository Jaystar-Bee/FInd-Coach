export default {
    async addRequest(context, payload) {
        const coachId = payload.coachId

        const newRequest = {
            email: payload.email,
            message: payload.message,
        }
        try {
            const response = await fetch(`https://coach-de336-default-rtdb.firebaseio.com/requests/${coachId}.json`, {
                method: 'POST',
                body: JSON.stringify(newRequest)

            })
            const responseData = await response.json()
            newRequest.id = responseData.name
            newRequest.coachId = coachId
            context.commit('addRequest', newRequest)

        } catch (error) {
            console.log(error)
            const err = new Error(error.message || 'Unable to send the request')
            throw err
        }
    },
    async loadRequest(context) {

        const coachId = context.rootGetters.activeId
        const token = context.rootGetters.token
        try {
            const response = await fetch(`https://coach-de336-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`)
            const responseData = await response.json()
            const requests = []
            for (const key in responseData) {
                const request = {
                    id: key,
                    coachId: coachId,
                    message: responseData[key].message,
                    email: responseData[key].email
                }
                requests.push(request)
            }
            context.commit('setRequest', requests)

        } catch (error) {
            const err = new Error(error.message || 'Unable to send the request')
            throw err
        }
    }
}