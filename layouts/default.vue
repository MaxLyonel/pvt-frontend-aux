<template>
  <v-app>
    <header class="container" v-if="isAuthenticated">
      <Appbar :expanded.sync="expandNavbar" />
    </header>

    <menu class="container" v-if="isAuthenticated && rolePermissionSelected">
      <Navbar :expanded.sync="expandNavbar" />
    </menu>

    <main>
      <Nuxt />
    </main>

    <footer class="container">
      <Footer></Footer>
    </footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Appbar from "@/components/layout/Appbar.vue";
import LoggedUser from "@/components/layout/LoggedUser.vue";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  name: "layout",
  components: {
    Appbar,
    LoggedUser,
    Navbar,
    Footer,
  },
  data() {
    return {
      expandNavbar: false,
    };
  },

  computed: {
     ...mapGetters(['rolePermissionSelected']),
    isAuthenticated() {
      return this.$store.state.isAuthenticated || false;
    },
  },
};
</script>
<style scoped>
.container{
   padding-top: 30px;
}
</style>

