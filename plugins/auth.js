'use strict'
import Cookies from 'js-cookie'

export default (context, inject) => {
  const Auth = {
    startSession(user, token) {
      /* La cookie solamente almacena el token */
      let cookieData = {
        token: token
      }
      Cookies.set('token', JSON.stringify(cookieData))

      /* Los datos de sesion generales se almacenan
      en el store de vuex */
      context.store.commit('START_SESSION', {user: user, token: token})
      context.store.$router.push("/PageChangeModuleRol")
    },
    endSession() {
      // eliminando cookie
      Cookies.remove('token')
      context.store.commit('DESTROY_SESSION')
      context.store.$router.push('/')
    },
    setCurrentRole(role) {
      /* La cookie almacena el rol actual */
      let cookieData = role
      Cookies.set('role', JSON.stringify(cookieData))
      context.store.commit('setRoleSelected', role)
    },
  }
  inject('auth', Auth)
}
