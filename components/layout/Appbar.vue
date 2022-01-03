<template>
  <v-app-bar
    app
    fixed
    dense
    flat
    clipped-left
    dark
    :color="bar.color"
  >
    <template v-if="rolePermissionSelected">
      <v-app-bar-nav-icon @click.stop="$emit('update:expanded', !expanded)"></v-app-bar-nav-icon>
    </template>
    <v-toolbar-title>{{ bar.text }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <div width="300px">

      <span class="text-caption font-weight-bold">{{ rolePermissionSelected ? rolePermissionSelected.display_name : '' }}</span>
        <v-btn
          fab
          dark
          x-small
          v-if="rolePermissionSelected!=null"
          color="white"
          outlined
          class="mx-3"
          @click="$router.push('/changeModuleRol')"
       >
          <v-icon>mdi-keyboard-return</v-icon>
        </v-btn>
    </div>
    <LoggedUser/>
    {{$store.getters.user.username}}
  </v-app-bar>
</template>


<script>
import { mapGetters } from 'vuex'
import LoggedUser from '@/components/layout/LoggedUser'
export default {
  name:'appbar',
  components: {
    LoggedUser
  },
  props: {
    expanded: {
      type: Boolean,
      default: false
    }
  },
    data () {
    return {
      rolesPermissionsItems: [],
    }
  },
  async created() {
    await this.getRolePermissions()
  },
  watch: {
    'rolePermissionSelected.display_name'(val) {
      this.$store.commit('setRolePermissionSelected', this.rolePermissionSelected)
    }
  },
  computed:{
    ...mapGetters(['rolePermissionSelected']),
        bar() {
      if (process.env.NODE_ENV != 'production') {
        return {
          color: `primary`,
          text: `PLATAFORMA VIRTUAL DE TRÁMITES (VERSIÓN DE PRUEBA)`
        }
      } else {
        return {
          color: `primary`,
          text: `PLATAFORMA VIRTUAL DE TRÁMITES`
        }
      }
    },
  },
  methods:{
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
  },
}
</script>
