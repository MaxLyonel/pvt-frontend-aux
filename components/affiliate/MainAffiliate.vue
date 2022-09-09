<template>
  <v-card flat>
    <v-card-title style="text-align:center ;">
      <v-col>
        <v-toolbar dense color="tertiary" style="z-index: 1;">
          <v-col cols="8">
            <v-toolbar-title color="background">
              {{affiliate.full_name}}
            </v-toolbar-title>
          </v-col>
          <v-col cols="4">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="saveAffiliate()"
                  :color="editable ? 'success' : 'secondary'"
                >
                  <v-toolbar-title v-if="!editable"> EDITAR</v-toolbar-title>
                  <v-toolbar-title v-else> Confirmar</v-toolbar-title>
                </v-btn>
              </template>
              <span>EDITAR</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="error"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  v-show="editable"
                  @click.stop="editable=false"
                >
                  <v-toolbar-title> cancelar</v-toolbar-title>
                </v-btn>
            </template>
            <span>EDITAR</span>
            </v-tooltip>
          </v-col>
        </v-toolbar>
      </v-col>
    </v-card-title>
    <v-card-text class="black--text my-0 py-0">
      <v-tabs
        background-color="secondary"
        class="elevation-2"
        dark
        :vertical="true"
      >
        <v-card color="background" >
          <div class="pa-3" >
            <div style="text-align: center;">
              <v-avatar
                color="tertiary"
                size="128"
              >
                <v-icon size="125" color="secondary">mdi-face-man</v-icon>
              </v-avatar>
            </div>
          </div>
          <v-divider class="mx-4"></v-divider>
          <v-card-text class="black--text my-0 py-0">
            <v-row>
              <v-col cols="12" md="12" align="start" class="subtitle-1">
                <h4 align="center">Datos del Afiliado</h4>
                  <b>C.I.:  </b> {{affiliate.identity_card}}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          :href="`#tab-1`"
        >
        DASHBOARD
        </v-tab>
        <v-tab
          :href="`#tab-2`"
        >
        DATOS PERSONALES DEL AFILIADO
        </v-tab>
        <v-tab
          :href="`#tab-3`"
        >
        INFORMACION ADICIONAL
        </v-tab>
        <v-tab
          :href="`#tab-4`"
        >
        INFORMACION CONYUGE
        </v-tab>
        <v-tab-item
        :value="'tab-1'"
        >
          <v-card flat tile >
            <v-card-text>
              <Dashboard :affiliate.sync="affiliate" :loading_affiliate="loading_affiliate" />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item
          :value="'tab-2'"
         >
          <v-card flat tile >
            <v-card-text>
              <Profile
                :affiliate.sync="affiliate"
                :editable.sync="editable"
              />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item
           :value="'tab-3'"
        >
          <v-card flat tile >
            <v-card-text>
              <Additioninalnformation
                :affiliate.sync="affiliate"
                :editable.sync="editable"
              />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item
           :value="'tab-4'"
        >
          <v-card flat tile >
            <v-card-text>
              <Spouse
                :affiliate.sync="affiliate"
                :editable.sync="editable"
               />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>


<script>
import Additioninalnformation from '@/components/affiliate/AdditionInalnformation';
import Dashboard from '@/components/affiliate/Dashboard';
import Profile from '@/components/affiliate/Profile';
import Spouse from './Spouse.vue';
export default {
  components: {
    Additioninalnformation,
    Dashboard,
    Profile,
    Spouse
},
  props: {
    affiliate_id :{
      type: String,
      require :true,
      default: 0,
    }
  },
  data: () => ({
    view: 'v-a',
    affiliate:{
      id: null,
      user_id: null,
      ffiliate_state_id: null,
      city_identity_card_id: null,
      city_birth_id: null,
      degree_id: null,
      unit_id: null,
      category_id: null,
      pension_entity_id: null,
      identity_card: null,
      registration: null,
      type: null,
      last_name: null,
      mothers_last_name: null,
      first_name: null,
      second_name: null,
      surname_husband: null,
      gender: null,
      civil_status: null,
      birth_date: null,
      date_entry: null,
      date_death: null,
      reason_death: null,
      date_derelict: null,
      reason_derelict: null,
      phone_number: null,
      cell_phone_number: null,
      nua: null,
      created_at: null,
      updated_at: null,
      deleted_at: null,
      service_years: null,
      service_months: null,
      death_certificate_number: null,
      due_date: null,
      is_duedate_undefined: null,
      account_number: null,
      financial_entity_id: null,
      sigep_status: null,
      unit_police_description: null,
      id_person_senasir: null,
      full_name: null,
      civil_status_gender: null,
      identity_card_ext: null,
      category: {
        id: null,
        from: null,
        to: null,
        name: null,
        percentage: null
      },
      degree: {
        id: null,
        hierarchy_id: null,
        code: null,
        name: null,
        shortened: null,
        correlative: null
      },
      unit: {
        id: null,
        breakdown_id: null,
        district: null,
        code: null,
        name: null,
        shortened: null,
        created_at: null,
        updated_at: null,
        deleted_at: null
      },
      addresses: [],
    },
    editable:false,
    vertical:false,
    icons: true,
    loading_affiliate:false
  }),
  mounted(){
    this.getAffiliate(this.affiliate_id)
  },
  methods: {
    async getAffiliate(id) {
      try {
        this.loading_affiliate=true
        let res = await this.$axios.get(`/affiliate/affiliate/${id}`)
        console.log(res)
        this.affiliate= res
      } catch (e) {
        console.log(e)
      }finally {
        this.loading_affiliate=false
      }
    },
    async saveAffiliate(){
      console.log(this.editable)
      try {
        if (!this.editable) {
          this.editable=true
        }
        else{
          await this.$axios.patch(`affiliate/affiliate/${this.affiliate.id}`,{
            cell_phone_number: this.affiliate.cell_phone_number
          })

        }
      } catch (error) {
      }
    },
  }
}
</script>
