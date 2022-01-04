<template>

    <v-container fluid>
    <v-card flat>
      <v-card-title>
        <v-toolbar dense color="tertiary" class="caption">
          <v-row>
            <v-col cols="12" class="pa-0">
              Accesos / Usuarios
            </v-col>
            <v-col cols="12" class="pa-0">
              <v-icon>mdi-arrow-right-bold-box</v-icon>
              Usuarios
            </v-col>
          </v-row>
        </v-toolbar>
      </v-card-title>
      <v-card-text>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "statistics",
  components: {},
  props: {},
  data() {
    return {
      rolesPermissionsItems: [],
    };
  },
  async created() {
    this.rolePermissionSelected;
  },
  computed: {
    ...mapGetters(["rolePermissionSelected"]),
  },
};
</script>
