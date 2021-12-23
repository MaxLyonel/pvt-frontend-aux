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
      //context.store.commit('START_SESSION', session)
      //this.timerSession()
      //context.store.$router.push("/sistemas")
    },
    /*updateSessionToken(nuevoToken) {
      // actualizando cookie
      let session = JSON.parse(Cookies.get('session'))
      session.token = nuevoToken
      Cookies.set('session', JSON.stringify(session))
      // actualizando vuex
      context.store.commit('UPDATE_SESSION_TOKEN', nuevoToken)
    },*/
    endSession() {
      // eliminando cookie
      Cookies.remove('token')
    },
  }
  inject('auth', Auth)
}
