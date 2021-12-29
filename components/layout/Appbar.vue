<template>
  <v-app-bar
    app
    fixed
    dense
    flat
    clipped-left
    dark
    :color="bar.color"
  >
    <template >
      <v-app-bar-nav-icon ></v-app-bar-nav-icon>
    </template>
    <v-toolbar-title>{{ bar.text }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <div width="300px">

      <span class="text-caption font-weight-bold"></span>
        <v-btn
          fab
          dark
          x-small

          color="white"
          outlined
          class="mx-3"
       >
          <v-icon>mdi-keyboard-return</v-icon>
        </v-btn>
        {{$store.state.user.username}}
    </div>

  </v-app-bar>
</template>


<script>


export default {
  name:'appbar',
  components: {

  },
    data () {
    return {

    }
  },
  computed:{
        bar() {
      if (process.env.NODE_ENV != 'production') {
        return {
          color: `primary`,
          text: `PLATAFORMA VIRTUAL DE TRÁMITES (VERSIÓN DE PRUEBA)`
        }
      } else {
        return {
          color: `primary`,
          text: `PLATAFORMA VIRTUAL DE TRÁMITES`
        }
      }
    },
  }
  }

</script>
