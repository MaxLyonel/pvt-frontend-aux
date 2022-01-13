<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title>
        <section-bread-crumb></section-bread-crumb>
      </v-card-title>
      <v-card-text>
        <v-card flat>
          <v-card-title>
            <v-switch v-model="active" color="success" inset></v-switch>
            <v-btn color="info" fab dark x-small class="mr-2">
              <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-btn color="warning" fab dark x-small class="mr-2">
              <v-icon>mdi-sync</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <List />
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
  name: "MainUsers",
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
