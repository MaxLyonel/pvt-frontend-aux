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
import GlobalBreadCrumb from '@/components/common/GlobalBreadCrumb.vue';
export default {
  name: "MainIndex",
  components: { GlobalBreadCrumb },
  props: {},
  data() {
    return {
      currentRole: this.$store.getters.currentRole,
    };
  },
};
</script>
