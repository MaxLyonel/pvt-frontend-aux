<template>
    <v-container fluid>
    <v-card flat>
      <v-card-title>
        <section-bread-crumb></section-bread-crumb>
      </v-card-title>
      <v-card-text>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script>
import SectionBreadCrumb from '@/components/common/SectionBreadCrumb.vue';
export default {
  name: "MainUsers",
  components: { SectionBreadCrumb },
  props: {},
  data() {
    return {
    };
  },
};
</script>
