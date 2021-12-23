import axios from 'axios'
//import Vue from 'vue'
//import store from '@/store/authentication.js'

//Vue.prototype.$http = Axios
//Vue.prototype.$http.defaults.withCredentials = true
//Vue.prototype.$http.defaults.baseURL = `${process.env.MIX_BASE_URL}`
//Vue.prototype.$http.defaults.timeout = 10000
//Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer 242|AAgwc0rbRcdOjMx9uR32KlH9eF7lxmT9hlzLNLYi`
////Vue.prototype.$http.defaults.headers.common['Authorization'] = `${context.store.getters['authentication/getAuth'].token_type} ${context.store.getters['authentication/getAuth'].access_token}`
//Vue.prototype.$http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
//Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
//Vue.prototype.$http.defaults.headers.common['Accept'] = 'application/json'
//Vue.prototype.$http.defaults.headers.common['Content-Type'] = 'application/json'

//console.log(`${context.store.getters['authentication/getAuth'].token_type} ${context.store.getters['authentication/getAuth'].access_token}`)
export default (context, inject) => {
  const responseSuccessHandler = response => {
    return response
  }

  const responseErrorHandler = async error => {
    try {
      if ([401,403].includes(error.response.status)) {

        /*if (router.currentRoute.name != 'welcome') {
          if (error.response.status == 403) {
            await store.dispatch('logout')
          } else {
            await store.commit('logout')
          }
          window.location.replace('/');
        }*/
      }
    } catch(error) {
      console.error(error)
    } finally {
      return Promise.reject(error)
    }
  }

  function getUrl(url) {
    let baseUrl = process.env.BASE_URL
    if (!baseUrl.endsWith('/')) {
      baseUrl = `${baseUrl}/`
    }
    if (url.startsWith('/')) {
      url = url.substring(1)
    }
    return baseUrl + url
  }

  function _http(method, url, data, customConfig) {
    const _url = getUrl(url)
    let setting = {
      method,
      url: _url,
      uri: url
    }
    if ( (typeof data === 'object' && Object.keys(data).length) || typeof data === 'object' && data.constructor.name === 'FormData' ) {
      setting.data = data
    }
    // Set token in headers
    /*if (context.store.state.session.token) {
      setting.headers = { 'Authorization': `${context.store.state.session.token}` }
    }*/
    //setting.headers = { 'X-CSRF-TOKEN': ` `, 'accept': 'application/json', 'Content-Type': 'application/json' }

    if (customConfig) {
      setting = { ...setting, ...customConfig }
    }
    return axios(setting).then(response => {
      console.log('a',response)
      let data = null
      if(response.data.paginacion) {
        data = {datos: response.data.datos, paginacion: response.data.paginacion }
      } else {
        data = response.data.datos || response.data
      }
      return Promise.resolve(data)
    }).catch(error => {
      console.log('ver error',error)
      if (error.response) {
        let data = error.response.data
        return Promise.reject(data)
      }
    })
  }

  
  axios.interceptors.response.use(
    response => responseSuccessHandler(response),
    error => responseErrorHandler(error),
  )

  const Axios = {
    get: (url, config) => { 
      return _http('get', url, undefined, config)
    },
    post: (url, data, config) => { return _http('post', url, data, config) },
    put: (url, data, config) => axios.put(process.env.BASE_URL+url, data, config),
    patch: (url, data, config) => axios.patch(process.env.BASE_URL+url, data, config),
    delete: (url, config) => axios.delete(process.env.BASE_URL+url, config),
  }

  inject('axios2', Axios)
}


