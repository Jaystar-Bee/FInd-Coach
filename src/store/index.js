import { createStore } from "vuex";

import coacheStore from './modules/coaches/index'
import authModule from './modules/auth/index'
import requestStore from './modules/requests/index'

const store = createStore({
    modules: {
        coaches: coacheStore,
        requests: requestStore,
        auth: authModule,
    },
})

export default store