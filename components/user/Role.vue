<template>
  <div>
    <v-tabs v-model="selectedModule" vertical>
      <v-tab v-for="modulo in modules" :key="modulo.id" class="grey lighten-5">
        {{ modulo.display_name }}
      </v-tab>
      <v-tabs-items v-model="selectedModule" class="px-5" >
        <v-tab-item
          v-for="modulo in modules"
          :key="modulo.id"
          @click="getRolesModuleUser(user)"
        >
          <v-list dense>
            <v-subheader v-if="modules.length > 0">
              <span> Roles para el módulo </span>
              <span class="font-weight-bold">
                &nbsp;{{ modulo.display_name }}
              </span>
            </v-subheader>
            <v-row no-gutters>
              <template v-for="rol in roles">
                <v-col :key="rol.id" cols="12" sm="6" md="4" class="pa-1">
                    <v-hover v-slot:default="{ hover }">
                      <v-chip
                        :class="hover ? 'elevation-4' : 'elevation-0'"
                        :color="rol.active ? 'info' : 'secondary'"
                        dark
                        style="width: 230px;"
                        :outlined="!rol.active"
                        @click="switchRole(rol.id)"
                      >
                        <v-avatar left v-if="rol.active">
                          <v-icon>mdi-checkbox-marked-circle</v-icon>
                        </v-avatar>
                        {{ rol.display_name }}
                      </v-chip>
                    </v-hover>
                </v-col>
              </template>
            </v-row>
            <v-row>
              <v-pagination
                v-model="options.page"
                :length="options.lastPage"
                :total-visible="8"
                color="secondary"
              ></v-pagination>
            </v-row>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
import Loading from "@/components/common/Loading";

export default {
  name: "user-role",
  components: {
    Loading,
  },
  props: {
    user: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    loading: true,
    modules: [],
    roles: [],
    selectedModule: null,
    selectedRoles: [],
    filteredRoles: [],
    options: {
      page: 1,
      itemsPerPage: 8,
    },
  }),
  created() {
    this.getModules();
  },
  mounted() {
    this.getRolesModuleUser(this.user);
  },
  computed: {
    slicedRoles() {
      console.log(this.roles.slice(parseInt(this.options.page - 1) * 1))
      console.log(parseInt(this.options.page - 1) * 18)
      return this.roles.slice(parseInt(this.options.page - 1) * 18,  parseInt(this.options.page) * 18)
    }
  },
  watch: {
    selectedModule(newVal, oldVal) {
      if (newVal != oldVal) {
        this.options.page = 1;
        this.getRolesModuleUser(this.user);
      }
    },
    options: function (newVal, oldVal) {
      if (newVal.page != oldVal.page || newVal.itemsPerPage != oldVal.itemsPerPage){
        this.getRolesModuleUser(this.user);
      }
    },
  },
  methods: {
    async getModules() {
      try {
        this.loading = true;
        let res = await this.$axios.get("api/admin/module");
        this.modules = res.payload.modules;
        console.log(this.modules);
      } catch (e) {
        console.log(e);
      }
    },
    async getRolesModuleUser(id) {
      try {
        this.loading = true;
        let res = await this.$axios.get(`api/admin/user/${id}/module_role_state_user`,{
            params: {
              module_id: this.modules[this.selectedModule].id,
              page: this.options.page,
              per_page: 18
            },
          }
        );
        this.roles = res.payload.role.data
        this.options = res.payload.role
        this.options.page= res.payload.role.current_page,
        this.options.lastPage= res.payload.role.last_page,
        this.options.total= res.payload.role.total,
        this.options.itemsPerPage= 18,
        console.log(this.options)
      } catch (e) {
        console.log(e);
      }
    },
    async switchRole(rolesColumn_id) {
      try {
        let res = await this.$axios.patch(`api/admin/user/${this.user}/role`, {
          role_id: rolesColumn_id
        })
        this.selectedRoles = res.payload.modules
        this.$toast.success("Actualizado correctamente");
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>