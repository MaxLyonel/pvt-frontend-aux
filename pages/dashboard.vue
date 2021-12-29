<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="12"
        v-for="(modulo, index) in $store.state.modules"
        :key="index"
      >
        <div class="font-weight-medium text-uppercase">{{ modulo.display_name }}</div>
          <v-progress-linear></v-progress-linear>
        <v-row>
          <v-col cols="12" sm="4" md="3" v-for="(rol, index) in modulo.roles" :key="index">
            <v-card
              class="rounded-pill"
              outlined
              @click="clickRole(item)"
              style="cursor: pointer; border: thin solid rgba(0, 0, 0, 0.5)"
              elevation="2"
            >
              <v-card-text>
                <span class="teal--text font-weight-bold text-center">{{
                  rol.display_name
                }}</span
                ><br />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-btn @click="logout()"> Logout </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      //user: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  methods: {
    async logout() {
      console.log("logout");
      // FIXME: hasta corregir el error del backend quitar el try/catch
      try {
        await this.$axios.post("/api/auth/logout");
      } catch (error) {}
      this.$auth.endSession();
    },
  },
};
</script>