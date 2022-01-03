<template>
  <v-app>
    <header class="container" v-if="isAuthenticated">
      <Appbar></Appbar>
    </header>

    <menu class="container" v-if="isAuthenticated">
      <Navbar></Navbar>
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
import Appbar from "@/components/layout/Appbar.vue";
import LoggedUser from "@/components/layout/LoggedUser.vue";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  components: {
    Appbar,
    LoggedUser,
    Navbar,
    Footer,
  },
  data() {
    return {
    };
  },

  computed: {
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

