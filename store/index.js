export const state = () => ({
  isAuthenticated: false,
  session: null,
  token: null,
})

export const mutations = {
  START_SESSION(state, {session, token}) {
    state.isAuthenticated = true
    state.session = session
    state.token = token
  },
  DESTROY_SESSION(state) {
    state.isAuthenticated = false
    state.session = null
    state.token = null
  },
}

export const actions = {
  async loadUser({commit}, {url, token}){
    let response = null
    try {
      response = await fetch(url, { method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'accept': 'application/json' } })  
      let session = (await response.json())
      return session.payload.user
    } catch(error) {
      console.error(error)
      return null
    }
  },
  /**
   * Esta funcion se ejecuta al inicializarse la APP
   * @param {*} vuexContext commit, dispatch, state
   * @param {*} context es el mismo de asyncData y aqui tenemos acceso a toda la app: app, $axios, env, store
   */
  async nuxtServerInit({ commit, dispatch }, { req } ) {
    // SOLAMENTE CUANDO SE EJECUTA EN SERVIDOR - EL USUARIO ENTRA POR 1RA VEZ O RECARGA LA PAGINA
    if (process.server) {
      try {
        let cookieEncoded = this.$utils.getCookieValue(req.headers.cookie, 'token')
        if (cookieEncoded) {
          let cookieDecoded = JSON.parse(decodeURIComponent(cookieEncoded))
          let sessionEncontrada = await dispatch('loadUser', {url: process.env.BASE_URL+'/api/auth/auth_user', token: cookieDecoded.token });
          if(sessionEncontrada) {
            commit('START_SESSION', {session: sessionEncontrada, token: cookieDecoded.token})
          }
        }
      } catch(error) {
        console.error('Ocurrio un error al obtener los datos de la cookie...', error)
      }
    }
  },

}

