<template>
    <v-container fluid>
    <v-card flat>
      <v-card-title>
        <section-bread-crumb></section-bread-crumb>
      </v-card-title>
      <v-card-text>
  <v-card flat>
    <v-card-title>
      <v-toolbar dense color="tertiary">
        <v-toolbar-title>Usuarios</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn-toggle
          v-model="active"
          active-class="primary white--text"
          mandatory
        >
          <v-btn text :value="true">
            ACTIVOS
          </v-btn>
          <v-btn text :value="false">
            INACTIVOS
          </v-btn>
        </v-btn-toggle>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-flex xs3>

        </v-flex>

      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <List/>
    </v-card-text>
  <RemoveItem/>
  </v-card>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script>

import SectionBreadCrumb from '@/components/common/SectionBreadCrumb.vue';
import RemoveItem from '@/components/common/RemoveItem.vue';
import List from '@/components/user/List'
export default {
  name: "MainUsers",
  components: {
    SectionBreadCrumb,
    List,
    RemoveItem
  },
  props: {},
  data: () => ({
    search: '',
    active: true
  }),
  watch: {
    search() {
      this.$nuxt.$emit('search', this.search)
    },
    active: function() {
      this.$nuxt.$emit('active', this.active)
    }
  }
};
</script>
