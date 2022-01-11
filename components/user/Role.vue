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
              <template v-for="rolesColumn in roles">
                <v-col :key="rolesColumn.id" cols="12" sm="4" md="3">
                    <v-hover v-slot:default="{ hover }">
                      <v-chip
                        :class="hover ? 'elevation-4' : 'elevation-0'"
                        :color="rolesColumn.active ? 'info' : 'secondary'"
                        dark
                        style="width: 230px;"
                        :outlined="!rolesColumn.active"
                        @click.stop="switchRole(rolesColumn.id)"
                      >
                      {{rolesColumn.id}}
                        <v-avatar left v-if="rolesColumn.active">
                          <v-icon>mdi-checkbox-marked-circle</v-icon>
                        </v-avatar>
                        {{ rolesColumn.display_name }}
                      </v-chip>
                    </v-hover>
                </v-col>
              </template>
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
      lastPage: 1,
      itemsPerPage: 18,
    },
  }),
  watch: {
    selectedModule(newVal, oldVal) {
      if (newVal != oldVal) {
        this.getRolesModuleUser(this.user);
      }
    },
  },
  created() {
    this.getModules();
  },
  mounted() {
    this.getRolesModuleUser(this.user);
  },
  computed: {
    slicedRoles() {
      console.log(this.options.page)
      console.log(parseInt(this.options.page - 1) * 18)
      return this.roles.slice(parseInt(this.options.page - 1) * 18,  parseInt(this.options.page) * 18)
    }
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
        let res = await this.$axios.get(`api/admin/user/${id}/module_role_state_user`,
          {
            params: {
              module_id: this.modules[this.selectedModule].id
            },
          }
        );
        this.roles = res.payload.role.data
        this.options = res.payload.role
        this.options.page= 1,
        this.options.lastPage= 1,
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