<template>
  <v-text-field
    v-model="search"
    append-icon="mdi-magnify"
    label="Buscar"
    single-line
    hide-details
    clearable
  ></v-text-field>
</template>
<script>
export default {
  name: 'search',
  data: function() {
    return {
      search: ''
    }
  },
  watch: {
    search: function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.$nuxt.$emit('search', newVal)
      }
    },
  }
}
</script>