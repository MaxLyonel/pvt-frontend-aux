//Alemecenamiento central
export const state = () => ({
    authentication: {
      //access_token:'223|uPXfJJ6POWW5k0hVEUG3Sna2gr68osvklc9o8ki6',
      //token_type: 'Bearer'
    }
  });
  //getters
  //Se llaman desde las propiedades computadas
  export const getters = {
    getAuth(state){
      return state.authentication;
    }
  }
  //mutations, el unico fin es modificar el state o almacenamiento, son metodos privados que no se debe acceder desde los componentes
  export const mutations = {
    setAuth(state, user){
      state.authentication = user
    }
  }
  
  //acciones sirven para llamar a las mutaciones pueden sera asincronas llama a apis , logica de negocio y tambien llaman a varias mutaciones
  export const actions = {
    async loadUser({commit}){
      let response = null
      try {
        response = await fetch(process.env.BASE_URL+'/api/auth/auth_user', { method: 'GET', headers: { 'Authorization': 'Bearer 243|1184VyuJtXW7XtUgzsF0YyqZYsEv87lNdwIb8QYD', 'accept': 'application/json' } })  
        let usuario = (await response.json())
        console.log(usuario)
      } catch(error) {
        console.error(error)
      }
      //commit('setAuth', miuser.data.payload)

      //console.log(`${miuser.data.payload.token_type} ${miuser.data.payload.access_token}`)
    }
  }