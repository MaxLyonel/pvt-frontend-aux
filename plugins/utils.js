'use strict'

export default (context, inject) => {
  const utils = {
    getCookieValue(cookies, cookieName) {
      if (cookies) {
        var b = cookies.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)')
        return b ? b.pop() : ''
      }
      return null
    },
    /*async getModules() {
      console.log('context', context)
      console.log('inject', inject)
      try {
        let res = await context.$axios.get2('api/admin/module')
        let modules = res.payload.modules
        console.log(this.modules)
        return modules
      } catch (e) {
        console.log(e)
        return []
      }
    },*/
  }
  inject('utils', utils)
}