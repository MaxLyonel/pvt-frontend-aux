<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title>
        <section-bread-crumb></section-bread-crumb>
      </v-card-title>
      <v-card-text>
      <v-card>
        <v-card-text>
          <v-row align="center" no-gutters>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedModule"
                :items="modules"
                label="Módulo"
                item-text="description"
                item-value="id"
                :loading="loading"
                prepend-inner-icon="mdi-format-list-checks"
                class="mx-3"
                dense
                flat
                outlined
                shaped
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedRole"
                :items="roles"
                label="Rol"
                item-text="display_name"
                item-value="id"
                :loading="loading"
                prepend-inner-icon="mdi-security"
                class="mx-3"
                :disabled="!selectedModule"
                dense
                flat
                outlined
                shaped
                solo
              ></v-select>
              modulo{{selectedModule}} rol{{selectedRole}}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card v-if="selectedRole">
          <v-card-title>
            <v-toolbar dense color="grey lighten-3">
              <v-toolbar-title>
                <span>Permisos para el rol </span>
                <span class="font-weight-black">{{ roles.find(o => o.id == selectedRole).display_name }}</span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-divider
                class="mx-2"
                inset
                vertical
              ></v-divider>
              <v-flex xs3>
                Buscador
              </v-flex>
            </v-toolbar>
          </v-card-title>
          <v-card-text>
            <v-row>
              <template v-for="(permission, index) in permissions">
                <v-col :key="index" sm="4" md="3" class="pa-1">
                  <div>
                    <v-hover v-slot:default="{ hover }">
                      <v-chip
                        :class="hover ? 'elevation-4' : 'elevation-0'"
                        :color="permission.active ? 'info' : 'secondary'"
                        dark
                        style="width: 280px;"
                        :outlined="!permission.active"
                        @click="switchPermission(permission.id)"
                      >
                        <v-avatar left v-if="permission.active">
                          <v-icon>mdi-checkbox-marked-circle</v-icon>
                        </v-avatar>
                        {{ permission.display_name }}
                      </v-chip>
                    </v-hover>
                  </div>
                </v-col>
              </template>
            </v-row>
              {{options.page}}
            <v-row>
              <v-pagination
                v-model="options.page"
                :length="options.lastPage"
                color="secondary"
              ></v-pagination>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import SectionBreadCrumb from "@/components/common/SectionBreadCrumb.vue";
import Loading from '@/components/common/Loading'
export default {
  name: "MainRoless",
  components: { 
    SectionBreadCrumb,
    Loading },

  data: () => ({
    loading: true,
    options: {
      page: 1,
      itemsPerPage: 32,
    },
    permissions: [],
    modules: [],
    roles: [],
    selectedModule: null,
    selectedRole: null
  }),
  created() {
    this.getModules();
  },
  watch:{
    selectedModule(newVal, oldVal) {
      if (newVal != oldVal) {
        this.selectedRole = null
        this.getModuleRoles()
      }
    },
    selectedRole(newVal, oldVal) {
      if (newVal != oldVal) {
        this.permissions = null
        this.getPermissions()
      }
    },
    options: function (newVal, oldVal) {
      if (newVal.page != oldVal.page || newVal.itemsPerPage != oldVal.itemsPerPage){
        console.log('hola')
        this.getPermissions()
      }
    }
  },
  methods: {
    async getModules() {
      try {
        this.loading = true;
        let res = await this.$axios.get("api/admin/module");
        this.modules = res.payload.modules;
        this.loading = false
        console.log(this.modules);
      } catch (e) {
        console.log(e);
      }
    },
    async getModuleRoles() {
      try {
        this.loading = true
        let res = await this.$axios.get(`api/admin/module/${this.selectedModule}/role`)
        this.roles = res.payload.roles
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    async getPermissions() {
      try {
        this.loading = true
        let res = await this.$axios.get(`api/admin/role/${this.selectedRole}/role_permissions`, {
          params: {
              page: this.options.page,
              per_page: 32
          }
        })
        this.permissions = res.payload.data
        //this.options = res.payload
        //delete res.payload['data']
        this.options.page= res.payload.current_page
        this.options.lastPage= res.payload.last_page
        this.options.total= res.payload.total
        this.options.itemsPerPage= 32
        console.log(this.options)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    async switchPermission(permission_id) {
      try {
        let res = await this.$axios.patch(`api/admin/role/${this.selectedRole}/permission`, {
          permission_id: permission_id
        })
        this.selectedRoles = res.payload.modules
        this.getPermissions()
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
