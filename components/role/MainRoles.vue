<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title>
        <section-bread-crumb></section-bread-crumb>
      </v-card-title>
      <v-card-text>
        inf roles
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import SectionBreadCrumb from "@/components/common/SectionBreadCrumb.vue";
export default {
  name: "MainRoless",
  components: { SectionBreadCrumb },
  props: {},
  data: () => ({

  }),
  created() {

  },
  methods: {

  },
};
</script>
