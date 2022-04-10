import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
    namespaced: true,
    state() {
        return {
            lastFetch: null,
            coaches: [
                {
                    id: 'c1',
                    firstName: 'Maxmilian',
                    lastName: 'Schwarzmuller',
                    areas: ['frontend', 'backend', 'career'],
                    description: "I'm maximilian and I've worked as a freelance web deveopler for years. I have all the experience concerning the specialties shown.",
                    hourlyRate: 30
                },
                {
                    id: 'c2',
                    firstName: 'John',
                    lastName: 'Ayilara',
                    areas: ['frontend', 'backend'],
                    description: "My name is John, I'm a have all the experience conerning the job listed. A trial will shock you! Buaaah!!!",
                    hourlyRate: 30
                },
                {
                    id: 'c3',
                    firstName: 'Olabode',
                    lastName: 'Paul',
                    areas: ['frontend', 'career'],
                    description: "Design is what i love doing. You want to learn how create a good looking UI, then contact me right away.",
                    hourlyRate: 30
                },
            ]
        }
    },
    mutations: mutations,
    actions: actions,
    getters: getters,

}