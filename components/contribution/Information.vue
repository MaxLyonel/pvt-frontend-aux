<template>
  <v-menu
    v-model="dialog_menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="indigo" dark v-bind="attrs" v-on="on">
        Información
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle
              >CONSIDERACIONES PARA IMPORTACIÓN</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <div class="py-1 pl-2 ma-1">
        <small
          ><v-icon>mdi-check</v-icon> FORMATO ARCHIVO: <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tipo CSV delimitado
          por "dos puntos" (:)
        </small>
        <br />
        <small
          ><v-icon>mdi-check</v-icon> NOMBRE ARCHIVO: <br />&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tipo-mes-año.csv Ejm.
          senasir-04-2021.csv</small
        >
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog_menu = false"> Salir </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name:"Information",
    data: ()=>({
        dialog_menu: false
    })
};
</script>

<style>
</style>