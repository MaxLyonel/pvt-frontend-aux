<template>
  <v-dialog persistent v-model="dialog" max-width="31%" @keydown.esc="close">
    <v-card>
      <v-card-title>¿Seguro que desea eliminar el registro?</v-card-title>
      <v-card-actions v-if="!loading">
        <v-spacer></v-spacer>
        <v-btn color="success" small @click.stop="close()"><v-icon small>mdi-check</v-icon> Cancelar</v-btn>
        <v-btn color="error" small @click.stop="remove()"><v-icon small>mdi-close</v-icon> Eliminar</v-btn>
      </v-card-actions>
      <GlobalLoading v-else/>
    </v-card>
  </v-dialog>
</template>

<script>
import GlobalLoading from '@/components/common/GlobalLoading'

export default {
  name: 'remove-item',
  components: {
    GlobalLoading
  },

  data: () => ({
    loading: false,
    path: '',
    dialog: false
  }),
  methods: {
    close() {
      this.dialog = false
      this.path = ''
      this.$nuxt.$emit('closeRemoveDialog')
    },
    async remove() {
      try {
        this.loading = true
        let res = await this.$axios.delete(this.path)
        if(!res.data.message){
          this.$toast.success('Eliminado correctamente')
        }else{
          this.$toast.error(res.data.message)
        }
        this.close()
        this.$nuxt.$emit('removed', Number(this.path.split('/').pop()))
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.$nuxt.$on('openRemoveDialog', url => {
      this.path = url
      this.dialog = true
    })
  }
}
</script>