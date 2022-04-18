<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title>
        <v-toolbar dense color="tertiary" class="caption">
          <GlobalBreadCrumb />
          <div class="flex-grow-1"></div>
          <v-btn-toggle
            v-model="active"
            active-class="secondary white--text"
            mandatory
          >
            <v-btn value="COMANDO"> Comando </v-btn>
            <v-btn value="SENASIR"> Senasir </v-btn>
          </v-btn-toggle>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-select
            :items="years"
            :loading="loading"
            label="Gestión"
            v-model="year_selected"
            dense
            outlined
            class="select-year"
          ></v-select>
        </v-toolbar>
      </v-card-title>

    </v-card>
    <!--contenido-->

      <div v-if="loading_circular">
        <GlobalLoading />
      </div>

    <v-row justify="center" class="py-0 mt-2" v-if="!loading_circular">
      <v-card
        :class="item.state_importation ? 'headline font-weight-bold ma-2 blue-grey lighten-5' : 'headline font-weight-bold ma-2'"
        max-width="250px"
        v-for="(item, i) in list_senasir_months"
        :key="i"
      >
        <template v-if="item.state_validated_payroll">
          <v-card-title :class="item.state_importation ? 'teal' : 'normal'">
            <v-row justify="center">
              <h3 class="white--text">{{ item.period_month_name }}</h3>
            </v-row>
          </v-card-title>
          <v-divider inset></v-divider>
          <v-card-text>
            <v-row v-if="period_type === 'SENASIR'">

              <v-col cols="12" md="12" class="py-0">
                <span class="info--text">N° reg. validados: </span
                ><strong>{{$filters.thousands(item.data_count.num_data_validated) }}</strong
                >

                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn 
                        class="ma-2 teal white--text btn-period" 
                        v-on="on"
                        @click="confirmImportContribution(item.period_month, true)"
                        :disabled="item.state_importation"
                      >
                        <v-icon dark left small>mdi-arrow-down</v-icon>Act. Aportes
                      </v-btn>
                    </template>
                    <div>
                      <span>Actualizar Aportes</span>
                    </div>
                </v-tooltip>
  
                <div v-show="item.state_importation">
                  <span class="info--text">N° reg. importados: </span><strong>{{$filters.thousands(item.data_count.num_total_data_contribution_passives)}}</strong><br>
                  <span class="info--text">Total aportes Bs.: </span><strong>{{$filters.money(item.data_count.sum_amount_total_contribution_passives)}}</strong><br>
                  <div class="text-right pb-1">
                    <v-tooltip top class="my-0">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          small
                          :color="'primary'"
                          fab
                          v-on="on"
                          :loading="loading_rep_state && i == loading_pos_index"
                          @click.stop="loading_pos_index = i; reportImportContributionSenasir(item.period_month)"
                        >
                          <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                      </template>
                      <div>
                        <span>Detalle de Aportes</span>
                      </div>
                    </v-tooltip>
                  </div>
                </div>

              </v-col>
            </v-row>
          </v-card-text>
        </template>
      </v-card>
    </v-row>
    <!--fin contenido-->

    <v-dialog v-model="dialog_confirm_import_contribution" max-width="500">
      <v-card>
        <v-card-title> Esta seguro de actualizar los aportes? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            color="error" 
            text 
            @click="dialog_confirm_import_contribution = false"
            :disabled="btn_import_contributions"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="sucess"
            text
            @click="ImportContributions()"
            :loading="btn_import_contributions"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import GlobalBreadCrumb from "@/components/common/GlobalBreadCrumb.vue"
import GlobalLoading from "@/components/common/GlobalLoading.vue"
export default {
  name: "MainContributionUpdate",
  components: {
    GlobalBreadCrumb,
    GlobalLoading
  },
  data: () => ({
    active: "SENASIR",
    years: [],
    loading: false,
    year_selected: null,
    period_type: "SENASIR",
    list_senasir_months: [],
    dialog: false,
    month_selected: null,
    data_count: {
      num_data_considered: 0,
      num_data_not_considered: 0,
      num_data_not_validated: 0,
      num_data_validated: 0,
      num_total_data_copy: 0,
    },
    btn_import_contributions: false,
    dialog_confirm_import_contribution: false,
    loading_circular: false,
    loading_pos_index: -1,
    loading_rep_state: false,
  }),
  created() {
    this.getYears();
  },
  computed: {
    dateFormat() {
      if (this.month_selected < 10)
        return (
          this.year_selected + "-" + "0" + this.month_selected + "-" + "01"
        );
      else return this.year_selected + "-" + this.month_selected + "-" + "01";
    },
  },
  watch: {
    year_selected(newVal, oldVal) {
      if (newVal != oldVal) {
        this.getMonths();
      }
    },
  },
  methods: {
    async getYears() {
      try {
        this.loading = true;
        let res = await this.$axios.get(`/contribution/list_senasir_years`)
        this.years = res.payload.list_years;
        this.year_selected = this.years[0];
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    async getMonths() {
      this.loading_circular = true
      try {
        let res = await this.$axios.post("/contribution/list_months_import_contribution_senasir",{
            period_year: this.year_selected,
          }
        );
        this.list_senasir_months = res.payload.list_senasir_months;
        this.loading_circular = false
        console.log(this.year_selected);
      } catch (e) {
        console.log(e);
        this.loading_circular = false
      }
    },
    close() {
      this.dialog = false;
      this.clearData();
    },
    //PASO3
    async ImportContributions() {
      this.btn_import_contributions = true;
      try {
        let res = await this.$axios.post("/contribution/import_create_or_update_contribution_period_senasir",{
            period_contribution_senasir: this.dateFormat
          }
        );
        if (res.payload.successfully) {
          this.$toast.success("Total de registros importados: "+ res.payload.num_created)
          this.dialog_confirm_import_contribution = false
          this.getMonths();
        } else {
          this.$toast.error(res.message);
        }
        this.btn_import_contributions = false
      } catch (e) {
        console.log(e);
        this.btn_import_contributions = false
      }
    },
    confirmImportContribution(month_selected, valor){
      this.month_selected = month_selected
      this.dialog_confirm_import_contribution= valor
      console.log( month_selected)
    },

    async reportImportContributionSenasir(month_selected){
      this.month_selected = month_selected
      this.loading_rep_state=true;
      try {
        let res = await this.$axios.post("/contribution/report_import_contribution_senasir",{
            date_contribution: this.dateFormat
          },
          {'Accept': 'application/vnd.ms-excel' },
          {'responseType': 'blob'}
        );
        const url = window.URL.createObjectURL(new Blob([res]))
        const link = document.createElement("a")
        link.href = url;
        link.setAttribute("download", "ReporteDetalleAportesImportes.xls")
        document.body.appendChild(link)
        link.click()
      } catch (e) {
        console.log(e);
      } finally {
        this.loading_rep_state=false;
        this.loading_pos_index=-1;
      }
    }
  },
};
</script>
<style scoped>
.select-year {
  max-width: 100px;
  margin-bottom: -30px;
}
.btn-period.v-btn:not(.v-btn--round).v-size--default {
  min-width: 160px;
  height: 25px;
}
</style>