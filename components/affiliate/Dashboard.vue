<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3" class="ma-0 pa-2 pt-0" align="center">
        <v-card color="info_card elevation-1" max-width="350" :loading="loading_affiliate">
          <div class="pa-3" >
            <div>
              <v-avatar class="mx-auto d-block " tile size="125">
                <v-icon size="125" color="tertiary" v-if="affiliate.gender==='M'">mdi-face-man</v-icon>
                <v-icon size="125" color="tertiary" v-else>mdi-face-woman</v-icon>
              </v-avatar>
            </div>
          </div>
          <v-divider class="mx-4"></v-divider>
          <v-card-text class="black--text my-0 py-0">
            <v-row>
              <v-col cols="12" md="12" align="start" class="subtitle-1">
                <h4 align="center">
                  Datos del Afiliado
                </h4>
                <b>C.I.:  </b> {{affiliate.identity_card}}
                 <br>
                <b>Categoría:</b> <span v-if="affiliate.category != null">{{affiliate.category.name}}</span>
                <br />
                <b>Grado:</b> {{affiliate.degree.name}}
                <br/>
                <b>Unidad:</b> {{affiliate.unit.name}}
                <br />
                <b>Estado Civil:</b>
                <span v-if ="affiliate.gender==='M'">
                  {{affiliate.civil_status=='C'? 'CASADO':affiliate.civil_status=='S'? 'SOLTERO':affiliate.civil_status=='D'?'DIVORCIADO':'VIUDO'}}
                </span>
                <span v-else>
                  {{affiliate.civil_status=='C'? 'CASADA':affiliate.civil_status=='S'? 'SOLTERA':affiliate.civil_status=='D'?'DIVORCIADA':'VIUDA'}}
                </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
  props: {
    affiliate: {
      type: Object,
      required: true
    },
    loading_affiliate:{
      required: true
    },
  }
}
</script>
