export default class Module {
  constructor() {
    this.resource = `api/admin/module`
  }

  async get(id = null, params = {}) {
    try {
      let res = await this.$axios.get(id ? `${this.resource}/${id}` : this.resource, {
        params: params
      })
      return res.data
    } catch (e) {
      return e
    }
  }
}