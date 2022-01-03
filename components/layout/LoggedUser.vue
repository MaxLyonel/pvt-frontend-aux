<template>
  <v-menu
    bottom
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn fab icon class="ma-0" v-on="on">
        <v-avatar size="35" :color="`${randomColor} darken-2`">
          <!--<span class="subtitle-1 font-weight-medium">{{username}}</span>-->
          <v-icon>mdi-account-outline</v-icon>
        </v-avatar>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item link @click.stop="logout()">
        <v-list-item-icon class="ml-0 mr-2">
          <v-icon>mdi-account-box</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Perfil</v-list-item-title>
      </v-list-item>
      <v-list-item link @click.stop="logout()">
        <v-list-item-icon class="ml-0 mr-2">
          <v-icon>mdi-lock</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Cerrar sesión</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'app-logger-user',
  computed: {
    randomColor() {
      let colors = ['red', 'pink', 'purple', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green',  'amber', 'orange', 'deep-orange']
      return colors[Math.floor(Math.random() * colors.length)]
    },
    username() {
      let user = this.$store.getters.user.username
      return user.substring(0,2)
      //return user
    }
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
  }
}
</script>