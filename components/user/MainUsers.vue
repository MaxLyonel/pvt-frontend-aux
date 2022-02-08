<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title>
        <v-toolbar dense color="tertiary" class="caption">
          <GlobalBreadCrumb />
          <v-spacer></v-spacer>
          <v-btn-toggle
            v-model="active"
            active-class="secondary white--text"
            mandatory
          >
            <v-btn text :value="true"> ACTIVOS </v-btn>
            <v-btn text :value="false"> INACTIVOS </v-btn>
          </v-btn-toggle>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-flex xs1> </v-flex>
          <v-btn color="success mx-1" dark @click="$router.push('addUser')">
            Adicionar usuario
          </v-btn>
          <v-btn color="info mx-1" dark @click="$refs.ListComponent.clearAll()">
            Limpiar filtros
          </v-btn>
        </v-toolbar>
      </v-card-title>
      <v-card-text class="ma-0 pa-0">
        <v-card flat>
          <v-card-text class="py-0">
            <List ref="ListComponent" />
          </v-card-text>
          <GlobalRemoveItem />
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import GlobalBreadCrumb from "@/components/common/GlobalBreadCrumb.vue";
import GlobalRemoveItem from "@/components/common/GlobalRemoveItem.vue";
import List from "@/components/user/List";
export default {
  name: "user-MainUsers",
  components: {
    GlobalBreadCrumb,
    List,
    GlobalRemoveItem,
  },
  props: {},
  data: () => ({
    search: "",
    active: true,
  }),

  mounted() {
    console.log(this.$route.params.id);
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
