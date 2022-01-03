<template>
<v-container fluid>
  <v-card flat>
    <v-card-title>
      <v-toolbar dense color="tertiary">
        <v-toolbar-title>Préstamos</v-toolbar-title>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <div>{{rolePermissionSelected}}</div>
    </v-card-text>
  </v-card>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name:'statistics',
  components: {

  },
  props: {

  },
    data () {
    return {
      rolesPermissionsItems: [],
    }
  },
  async created() {
    this.rolePermissionSelected
  },
  computed:{
     ...mapGetters(['rolePermissionSelected']),
  }
}
</script>

<style>

</style>