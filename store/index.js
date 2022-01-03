export const state = () => ({
  isAuthenticated: false,
  user: null,
  token: null,
  modules: [],
  rolePermissionSelected: null
})

export const getters= {
  session(state){
    return {
      isAuthenticated: state.isAuthenticated,
      token: state.token
    }
  },
  user(state){
    return state.user
  },
  modules(state){
    return state.modules
  },
  // devuelve todo el objeto seleccionado rol con sus permisos
  rolePermissionSelected(state) {
    return state.rolePermissionSelected
  },
  // devuelve todo el array de objetos permisos
  permissionSelected(state) {
    if(state.rolePermissionSelected && state.rolePermissionSelected.permissions && state.rolePermissionSelected.permissions.length > 0) {
      return state.rolePermissionSelected.permissions
    } else {
      return []
    }
  },
  // devuelve un array de names de los permisos
  permissionSimpleSelected(state) {
    if(state.rolePermissionSelected && state.rolePermissionSelected.permissions && state.rolePermissionSelected.permissions.length > 0) {
      return state.rolePermissionSelected.permissions.map(item => item.name)
    } else {
      return []
    }
  }
}

export const mutations = {
  START_SESSION(state, {user, token}) {
    state.isAuthenticated = true
    state.token = token
    state.user = user
    state.modules = user.modules
  },
  DESTROY_SESSION(state) {
    state.isAuthenticated = false
    state.token = null
    state.user = null
    state.modules = null
  },
  setRolePermissionSelected(state, data) {
    state.rolePermissionSelected = data
  },
}

export const actions = {
  async loadUser({commit}, {url, token}){
    let response = null
    try {
      response = await fetch(url, { method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'accept': 'application/json' } })
      let user = (await response.json())
      return user.payload.user
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
            commit('START_SESSION', {user: sessionEncontrada, token: cookieDecoded.token})
          }
        }
      } catch(error) {
        console.error('Ocurrio un error al obtener los datos de la cookie...', error)
      }
    }
  },

}

