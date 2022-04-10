import { createRouter, createWebHistory } from 'vue-router'

import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue'
import CoachRegister from './pages/coaches/CoachRegister.vue'
import ContactCoach from './pages/request/ContactCoach.vue'
import RequestRecieved from './pages/request/RequestRecieved.vue'
import UserAuth from './pages/auth/UserAuth.vue'
import notFound from './pages/notFound.vue'
import store from './store/index.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id', component: CoachDetails, props: true, children: [
                {
                    path: 'contact', component: ContactCoach
                }
            ],
        },
        { path: '/register', component: CoachRegister, meta: { requiresAuth: true } },
        { path: '/requests', component: RequestRecieved, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
        { path: '/:notFound(.*)', component: notFound },
    ],
})

router.beforeEach(function (to, from, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth')
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/caoches')
    } else {
        next()
    }
})

export default router