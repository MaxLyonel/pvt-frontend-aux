<template>
  <div>{{rolePermissionSelected}}</div>
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