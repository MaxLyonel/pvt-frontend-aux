<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title>
        <section-bread-crumb></section-bread-crumb>
      </v-card-title>
      <v-card-text>
        <v-card flat>
          <v-card-title>
            <v-switch 
              v-model="active" 
              color="success" 
              inset
              style="margin-top: -90px; margin-left:1110px;position: absolute; top: 35px; right: 85px;"
            ></v-switch>

            <v-btn
              x-small
              color="secondary"
              dark
              @click="$router.push('addUser')"
            >
              Adicionar usuario
            </v-btn>
            <v-tooltip top >
              <template v-slot:activator="{ on }">
                <v-btn
                  fab
                  dark
                  x-small
                  color="success"
                  v-on="on"
                  absolute
                  right
                  @click="$refs.ListComponent.synchronizeUsers()"
                  style="margin-top: -110px; margin-right:40px"
                >
                  <v-icon>mdi-sync</v-icon>
                </v-btn>
              </template>
              <span class="caption">Sincronizar usuarios</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  fab
                  color="info"
                  v-on="on"
                  x-small
                  absolute
                  right
                  @click="$refs.ListComponent.clearAll()"
                  style="margin-top: -110px; margin-right:0px"
                >
                  <v-icon> mdi-broom </v-icon>
                </v-btn>
              </template>
              <span class="caption">Limpiar todos los filtros</span>
            </v-tooltip>

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
