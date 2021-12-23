<template>
  <v-app>
    <v-main>
      <v-container fluid>
 
        <Nuxt />
        <Footer />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from '@/layouts/Appbar.vue'
import LoggedUser from '@/layouts/LoggedUser.vue'
import Navbar from '@/layouts/Navbar.vue'
import Footer from '@/layouts/Footer.vue'

export default {
  components: {
    Appbar,
    LoggedUser,
    Navbar,
    Footer
    
  },
  data () {
    return {
      title: 'PVT'
    }
  }
}
</script>

