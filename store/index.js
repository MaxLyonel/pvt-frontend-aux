export const actions = {

  /**
   * Esta funcion se ejecuta al inicializarse la APP
   * @param {*} vuexContext commit, dispatch, state
   * @param {*} context es el mismo de asyncData y aqui tenemos acceso a toda la app: app, $axios, env, store
   */
  async nuxtServerInit({ dispatch }, { req } ) {
    await dispatch('authentication/loadUser');
    console.log('iniciando servidor... cliente:' + process.client)
    console.log('iniciando servidor... servidor:' + process.server)
  },

}

