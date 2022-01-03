<template>
  <v-container  >
    <v-row class="justify-center my-4">
			<strong class="grey--text text-h5">Plataforma Virtual de Trámites</strong><br>
		</v-row>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="12"
        v-for="(modulo, index) in rolesPermissionsItems"
        :key="index"
      >
        <div class="font-weight-medium text-uppercase">{{ modulo.display_name }}</div>
          <v-progress-linear></v-progress-linear>
        <v-row>
          <v-col cols="12" sm="4" md="3" v-for="(rol, index) in modulo.roles" :key="index">
            <v-card
              class="rounded-pill"
              outlined
              @click="clickRole(rol)"
              style="cursor: pointer; border: thin solid rgba(0, 0, 0, 0.5)"
              elevation="2"
            >
              <v-card-text>
                <v-icon color="teal">mdi-account-circle</v-icon>&nbsp;
                <span class="teal--text font-weight-bold text-center">{{rol.display_name}}</span
                ><br />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "dashboard-ChangeModuleRol",
  data() {
    return {
      rolesPermissionsItems: [],
    };
  },
  async created() {
		// al entrar a esta pagina se elimina el rolePermissionSelected del store
    this.$store.commit('setRolePermissionSelected', null)
    await this.getRolePermissions()
		// si es administrador va directo al dashboard
		/*if(this.$store.getters.userRoles[0] == 'TE-admin') {
			// this.$store.commit('setRolePermissionSelected', {})
			this.$router.push("dashboard")
		}*/
    //this.setDefaultValues()
  },
  computed: {
    modules() {
      return this.$store.state.modules;
    },
  },

  methods: {
    async getRolePermissions() {
			try {
        let res = await this.$axios.get(`/api/auth/auth_user`)
          let aux_rolesPermissionsItems = res.payload.user.modules
          for(let i=0; i<aux_rolesPermissionsItems.length; i++){
            aux_rolesPermissionsItems[i].roles.forEach(item => {
            //delete item.id
            delete item.module_id
            delete item.action
            delete item.created_at
            delete item.updated_at
            delete item.correlative
            delete item.name
            delete item.sequence_number
            item.permissions = item.permissions.map(item => ({display_name: item.display_name, name: item.name }))
          })
        }
        this.rolesPermissionsItems =  aux_rolesPermissionsItems
        console.log(this.rolesPermissionsItems)

      } catch (e) {
        console.log(e)
      }
    },
    clickRole(item) {
			this.$store.commit('setRolePermissionSelected', item)
      console.log(item)
			this.$router.push("statistics")
		}
  },
};
</script>