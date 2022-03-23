'use strict'

export default (context, inject) => {
  const Filters = {
    money (value) {
        if(value == 0) return '0,00'
        else 
        return parseFloat(value).toLocaleString("de-DE", {minimumFractionDigits: 2, maximumFractionDigits: 2})
    },
    thousands (value) {
        if(value == 0) return '0'
        else 
        return parseFloat(value).toLocaleString("de-DE", {minimumFractionDigits: 0, maximumFractionDigits: 0})
    },

  }

  inject('filters', Filters)
}
