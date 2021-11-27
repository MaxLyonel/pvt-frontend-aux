<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        {{ user.username }}
        <span v-if="user"> {{ user.username }}</span>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-btn @click="logout">
          Logout
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      user: ''
    }
  },
  created () {
    this.getAuthenticatedUser()
  },

  methods: {
    async getAuthenticatedUser () {
      console.log('loggedIn : ' + this.$auth.loggedIn)
      try {
        let response = await this.$axios.$get('/api/user')
        this.user = response
        console.log(response.name)
      } catch (err) {
        console.log(err)
      }
    },
    async logout () {
      console.log('logout')
      await this.$axios.$post('/api/auth/logout')
      this.$router.push('/inicio')
    }
  }
}
</script>