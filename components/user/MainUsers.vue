<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title>
        <section-bread-crumb></section-bread-crumb>
      </v-card-title>
      <v-card-text>
        <v-card flat>
          <v-card-title class="pa-0 ma-0">
            <template>
            <v-btn
              x-small
              :color="!active ? 'error' : 'success'" 
              dark
              @click="active = !active"
              style="margin-top: -80px; position: absolute; top: 35px; right: 315px;"
            >
              {{!active ? 'Usuarios Inactivos' : 'Usuarios Activos'}}
            </v-btn>
            <v-btn
              x-small
              color="secondary"
              dark
              @click="$router.push('addUser')"
               style="margin-top: -80px; position: absolute; top: 35px; right: 165px;"
            >
              Adicionar usuario
            </v-btn>
            <v-btn
              x-small
              color="info"
              dark
               @click="$refs.ListComponent.clearAll()"
              style="margin-top: -80px; position: absolute; top: 35px; right: 15px;"
            >
              Limpiar filtros
            </v-btn>
            </template>
          </v-card-title>
          <v-card-text>
            <List ref="ListComponent"/>
          </v-card-text>
          <RemoveItem />
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import SectionBreadCrumb from "@/components/common/SectionBreadCrumb.vue";
import RemoveItem from "@/components/common/RemoveItem.vue";
import List from "@/components/user/List";
export default {
  name: "user-MainUsers",
  components: {
    SectionBreadCrumb,
    List,
    RemoveItem,
  },
  props: {},
  data: () => ({
    search: "",
    active: true,
  }),

    mounted(){
    console.log(this.$route.params.id)
  },
  watch: {
    search() {
      this.$nuxt.$emit("search", this.search);
    },
    active: function () {
      this.$nuxt.$emit("active", this.active);
    },
  },
};
</script>
