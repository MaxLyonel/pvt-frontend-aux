export const state = () => ({
  loggedIn: false,
  acccessToken: '',
  tokenType: '',
  user: {},
  //permissions: [],
  })

  export const getters = {
    isAuthenticated(state) {
      return '=============='
    },
  
    loggedInUser(state) {
      return state
    }
  }

  export const mutations = {
    login(state, data) {
      //Vue.prototype.$http.defaults.headers.common['Authorization'] = `${data.token_type} ${data.access_token}`
      state.acccessToken = data.access_token
      state.tokenType = data.token_type
      state.user = data.user
      //state.permissions = data.permissions
      state.loggedIn = true
    },
    logout(state) {
      /*state.acccessToken = ''
      state.tokenType = ''
      state.user = {}
      state.permissions = []
      state.loggedIn = false,
      state.name = ''*/
    },
  }

  export const actions = {
    /*login({commit}, data) {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await this.$axios.$post('/api/auth/login', data)
          console.log(response)
          commit('login', response.data)
          resolve(response)
        } catch(error) {
          commit('logout')
          reject(error)
        }
      })
    },*/
    login({commit}, data) {
      return new Promise(async (resolve, reject) => {
        try {
          let response = await axios.post('login', data)
          commit('login', response.data.payload)
          resolve(response)
        } catch(error) {
          commit('logout')
          reject(error)
        }
      })
    },
  }

