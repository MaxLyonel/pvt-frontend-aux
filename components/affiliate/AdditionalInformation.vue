<template>
  <v-container fluid>
    <v-form>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-col cols="12">
            <v-toolbar-title>DOMICILIO</v-toolbar-title>
          </v-col>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="affiliate.addresses"
              hide-default-footer
              class="elevation-1"
              >
              <template v-slot:item="props">
                <tr>
                  <td>{{ props.item.description }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-col>
        <v-col cols="12" md="6">
          <v-container class="py-0">
            <v-row>
              <v-col cols="12">
                <v-toolbar-title>TELÉFONOS</v-toolbar-title>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="affiliate.cell_phone_number[0]"
                  dense
                  :readonly="!editable"
                  :outlined="editable"
                  :disabled="!editable"
                  label="Celular1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                 <v-text-field
                    v-model="affiliate.cell_phone_number[1]"
                    dense
                    :disabled="!editable"
                    :outlined="editable"
                    label="Celular2"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                 <v-text-field
                    v-model="cel[0]"
                    dense
                    label="Telefono"
                  ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" md="12">
          <v-container>
            <v-row>
              <v-col cols="12">
               <v-toolbar-title>OFICINA VIRTUAL</v-toolbar-title>
               <v-card color="info_card " shaped class="elevation-1" >
                <v-card-title>Credenciales</v-card-title>
                  <v-card-text>
                    <h2 style="text-align: center">{{listen_h}}</h2>
                    <v-tooltip bottom v-if="state_credential">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          fab
                          color="success"
                          small
                          right
                          absolute
                          @click="dialog_send_credential=true"
                        >
                          <v-icon>mdi-comment-processing-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>EDITAR</span>
                    </v-tooltip>
                    <v-dialog
                    v-model="dialog_send_credential"
                    width="500">
                      <v-card>
                        <v-card-title>
                          <v-toolbar-title>Confirmar</v-toolbar-title>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-card-text>
                          <v-container v-if="state_cellphone">
                            {{options.response_message}}
                          </v-container>
                          <v-container v-else>
                            Por favor actualice el numero de celular
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="error" text @click="dialog_send_credential  = false">
                            CANCELAR
                          </v-btn>
                          <v-btn v-if="state_button_send"
                          color="success"
                          @click="sendCredential()"
                          >
                            ENVIAR
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { state } from '../../store';
export default {
  props: {
    affiliate :{
      type: Object,
      require :true,
    },
    editable:{
      type: Boolean,
      require :true,
    }
  },

  data: () => ({

    headers: [
      { text: "Ciudad", align: "left", value: "city_address_id" },
      { text: "Zona", align: "left", value: "description" },
      { text: "Activo", align: "left", value: "" },
      { text: "Acciones", align: "center" },
        ],
    cel: [null, null],
    status_credential:'hola',
    state_credential:true,
    state_button_send:false,
    options: {
        response_message: 'Esta seguro de enviar los credenciales',
      },
    response_message_credential: null,
    dialog_send_credential :false,
    state_cellphone:false,
  }),
  watch :{
    options: function(newVal, oldVal) {
        console.log("newval "+newVal.response_message+" oldval "+oldVal.response_message)
      },
    status_credential: function (newVal, oldVal){
      console.log("newval "+newVal+" oldval "+oldVal)
    }
    },
    state_button_send: function(newVal, oldVal){
      console.log("newval "+newVal+" oldval "+oldVal)
    },
    computed:{
      listen_h(){
        this.getStateCredential()
        let status_credential=this.status_credential
        return status_credential
      }
    },
  mounted(){
   this.getState_cellphone();
   this.getStateCredential();
  },
  methods: {
    async getState_cellphone(){

      if (this.affiliate.cell_phone_number[0].length>0) {
        this.state_cellphone=true;
        this.state_button_send=true;
      }
      else{
        this.state_cellphone =false;
        this.state_button_send=false;
      }
      console.log( this.state_cellphone)
    },
    async getStateCredential(){
      this.status_credential=this.affiliate.credential_status
      if (this.affiliate.credential_status!='No asignadas')
      {this.state_credential=false}
      console.log(this.state_credential);
    },
    async sendCredential(){
      try {
        let res = await this.$axios.post(`/affiliate/store/${this.affiliate.id}`)
        this.getStateCredential();
       this.options.response_message=res.message+' su usuario es: '+res.payload.user+' su password es '+res.payload.pin;
       this.state_button_send=false
        console.log(this.options.response_message+this.state_cellphone);
      } catch (e) {
        console.log(e)
      }
    },
    async changestate(){
      this.options.response_message='holitas van holitas vienen'
    },
  }
}
</script>
