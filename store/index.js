export const state = () => ({
  isAuthenticated: false,
  user: null,
  token: null,
  //rolePermissionSelected: null
  roleSelected: null,
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
  // devuelve todo el objeto seleccionado rol con sus permisos
  /*rolePermissionSelected(state) {
    return state.rolePermissionSelected
  },*/
  // devuelve todo el array de objetos permisos
  /*permissionSelected(state) {
    if(state.rolePermissionSelected && state.rolePermissionSelected.permissions && state.rolePermissionSelected.permissions.length > 0) {
      return state.rolePermissionSelected.permissions
    } else {
      return []
    }
  },*/
  // devuelve un array de names de los permisos
  permissionSimpleSelected(state, getters) {
    //console.log(getters)
    if(getters.currentRole && getters.currentRole.permissions && getters.currentRole.permissions.length > 0) {
      return getters.currentRole.permissions.map(item => item.name)
    } else {
      return []
    }
  },
  modules(state) {
    let result = null
    try {
      //let aux_rolesPermissionsItems = JSON.parse(JSON.stringify(this.$store.getters.user.modules))
      let aux_rolesPermissionsItems = JSON.parse(JSON.stringify(state.user.modules))
      for(let i=0; i<aux_rolesPermissionsItems.length; i++) {
        aux_rolesPermissionsItems[i].roles.forEach(item => {
          //delete item.id
          delete item.module_id
          delete item.action
          delete item.created_at
          delete item.updated_at
          delete item.correlative
          delete item.name
          delete item.sequence_number
          item.permissions = item.permissions.map(item => ({display_name: item.display_name, name: item.name }))
        })
      }
      result =  aux_rolesPermissionsItems
    } catch (e) {
      console.log(e)
    }
    return result
  },
  //Obtenermos la información del rol seleccionado basandonos en el id del rol
  currentRole(state) {
    for(let module of state.user.modules) {
      for(let rol of module.roles) {
        if(rol.id == state.roleSelected) {
          return rol
        }
      }
    }
    return null
  }
}

export const mutations = {
  START_SESSION(state, {user, token}) {
    state.isAuthenticated = true
    state.token = token
    state.user = user
  },
  DESTROY_SESSION(state) {
    state.isAuthenticated = false
    state.token = null
    state.user = null
  },
  /*setRolePermissionSelected(state, data) {
    state.rolePermissionSelected = data
  },*/
  setRoleSelected(state, role) {
    state.roleSelected = role
  }
}

export const actions = {
  startSession({commit}, {user, token}) {
    commit('START_SESSION', {user: user, token: token})
  },
  endSession({commit}) {
    commit('DESTROY_SESSION')
  },
  setRoleSelected({commit}, role) {
    commit('setRoleSelected', role)
  },
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
        let cookieEncoded = null
        let cookieDecoded = null
        // OBTIENDO DATOS DE USUARIO MEDIANTE EL TOKEN
        cookieEncoded = this.$utils.getCookieValue(req.headers.cookie, 'token')
        if (cookieEncoded) {
          cookieDecoded = JSON.parse(decodeURIComponent(cookieEncoded))
          let sessionEncontrada = await dispatch('loadUser', {url: process.env.BASE_URL+'/api/auth/auth_user', token: cookieDecoded.token });
          if(sessionEncontrada) {
            commit('START_SESSION', {user: sessionEncontrada, token: cookieDecoded.token})
          }
        }
        // OBTIENDO ROL SELECCIONADO
        cookieEncoded = this.$utils.getCookieValue(req.headers.cookie, 'role')
        if (cookieEncoded) {
          cookieDecoded = JSON.parse(decodeURIComponent(cookieEncoded))
          console.log(cookieDecoded)
          commit('setRoleSelected', cookieDecoded)
        }
      } catch(error) {
        console.error('Ocurrio un error al obtener los datos de la cookie...', error)
      }
    }
  },

}

