<template>
      <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      :style="{background: $vuetify.theme.themes['light'].primary}"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
        color="success"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
        color="success"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
        color="success"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title class="text-red" v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
        color="success"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Administración',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Aportes',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'PVT'
    }
  }
}
</script>

<style>

</style>