<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">

        <span></span>
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
  name: "Welcome",
  data() {
    return {
      user: "",
    };
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