<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        autenticado: 
        {{$auth.loggedIn}}
        usuario
       <pre> {{ $auth.user}}</pre>
        <!--vuex
        {{isAuthenticated}}
        usuario
        <pre>{{ loggedInUser }}</pre>-->


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
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
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
    /*async logout () {
      console.log('logout')
      await this.$axios.$delete('/api/auth/logout')
      this.$router.push('/')
    },*/
    async logout () {
      console.log('logout')
      await this.$auth.logout()
      this.$router.push('/')
    },
 
    
    
    /*async login() {
      try {


          await axios.get('sanctum/csrf-cookie')
          await this.$store.dispatch('login', this.form)
  
          this.$router.push({
            name: 'dashboard'
          })
        
      } catch(error) {
        console.log(error)
      }
    },*/
  }
}
</script>