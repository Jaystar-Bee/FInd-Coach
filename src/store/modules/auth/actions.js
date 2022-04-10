let timer;

export default {
    async signup(context, payload) {
        return context.dispatch('auth', { ...payload, mode: 'signup' })

    },
    async login(context, payload) {
        return context.dispatch('auth', { ...payload, mode: 'login' })
    },
    async auth(context, payload) {
        const mode = payload.mode
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTi_7M9LwEsdMzh6uskW8n3rvJsZrpzes`

        if (mode === 'login') {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTi_7M9LwEsdMzh6uskW8n3rvJsZrpzes`
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            })
        })

        const responseData = await response.json();

        // const expiresIn = +responseData.expiresIn * 1000
        const expiresIn = 5000
        const expirationDate = new Date().getTime() + expiresIn

        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)
        localStorage.setItem('tokenExpiration', expirationDate)

        timer = setTimeout(() => {
            context.dispatch('isAutoLogout')
        }, expiresIn)

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })

        if (!response.ok) {
            const err = new Error(responseData.message || "Authentication Failed. Please check your data")
            throw err
        }

    },
    autoLogin(context) {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        const tokenExpiration = localStorage.getItem('tokenExpiration')

        let expiresIn = +tokenExpiration - new Date().getTime()

        if (expiresIn < 0) {
            return
        }

        // expiresIn += new Date().getTime()
        timer = setTimeout(() => {
            context.dispatch('isAutoLogout')
        }, expiresIn)

        context.commit('setUser', {
            token: token,
            userId: userId,
        })
    },
    logout(context) {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('tokenExpiration')
        clearTimeout(timer)
        context.commit('setUser', {
            token: null,
            userId: null,
        })
    },
    isAutoLogout(context) {
        context.dispatch('logout',)
        context.commit('setAutoLogout')
    },
}