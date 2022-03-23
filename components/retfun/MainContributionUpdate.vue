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
    <v-row justify="center" class="py-0 mt-2">
      <v-card
        class="headline font-weight-bold ma-2 blue-grey lighten-5"
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
                <!--<span class="info--text">N° reg. copiados: </span
                ><strong>{{ item.data_count.num_total_data_copy }}</strong
                ><br />
                <span class="info--text">N° reg. considerados: </span
                ><strong>{{ item.data_count.num_data_considered }}</strong
                ><br />
                <span class="error--text">N° reg. no considerados: </span
                ><strong>{{ item.data_count.num_data_not_considered }}</strong
                ><br />-->
                <span class="info--text">N° reg. validados: </span
                ><strong>{{$filters.thousands(item.data_count.num_data_validated) }}</strong
                >


                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn 
                        class="ma-2 teal white--text btn-period" 
                        v-on="on"
                        @click="confirm_import_contribution(item.period_month, true)"
                        :disabled="item.state_importation"
                      >
                        <v-icon dark left small>mdi-arrow-down</v-icon>Act. Aportes
                      </v-btn>
                    </template>
                    <div>
                      <span>Actualizar Aportes</span>
                    </div>
                </v-tooltip>
                <v-progress-linear color="white"></v-progress-linear>
                <div v-show="item.state_importation">
                  <span class="info--text">N° reg. importados: </span><strong>{{$filters.thousands(item.data_count.num_total_data_aid_contributions)}}</strong><br>
                  <span class="info--text">Total aportes Bs.: </span><strong>{{$filters.money(item.data_count.sum_amount_total_aid_contribution)}}</strong><br>

                  <v-tooltip top class="my-0">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        small
                        :color="'primary'"
                        fab
                        v-on="on"
                      >
                        <v-icon>mdi-file-document</v-icon>
                      </v-btn>
                    </template>
                    <div>
                      <span>Detalle de Aportes</span>
                    </div>
                  </v-tooltip>
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
          <v-btn color="error" text @click="dialog_confirm_import_contribution = false">
            Cancelar
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
import GlobalBreadCrumb from "@/components/common/GlobalBreadCrumb.vue";
export default {
  name: "MainImportation",
  components: {
    GlobalBreadCrumb,
  },
  data: () => ({
    active: "SENASIR",
    years: [],
    loading: false,
    year_selected: null,
    period_type: "SENASIR",
    list_senasir_months: [],
    list_months_not_import: [],
    dialog: false,
    e1: 1,
    import_export: {},
    month_selected: null,
    progress: {
      file_exists: false,
      file_name: null,
      percentage: 0,
      query_step_1: false,
      query_step_2: false,
      //query_step_3: false,
      reg_contribution: 0,
      reg_copy: 0,
      reg_validation: 0,
    },
    data_count: {
      num_data_considered: 0,
      num_data_not_considered: 0,
      num_data_not_validated: 0,
      num_data_validated: 0,
      //num_total_data_aid_contributions: 0,
      num_total_data_copy: 0,
    },
    btn_update_file: false,
    btn_validate_data: false,
    btn_import_contributions: false,
    btn_rollback: false,
    dialog_confirm: false,
    dialog_confirm_import_contribution: false,
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
    nextStep(n) {
      if (n == this.steps) {
        this.e1 = 1;
      } else {
        if (n == 1) {
          this.progress.percentage = this.progress.percentage + 50;
        }
        if (n == 2) {
          this.progress.percentage = this.progress.percentage + 100;
        }
        this.e1 = n + 1;
      }
    },
    async getYears() {
      try {
        this.loading = true;
        let res = await this.$axios.get("api/contribution/list_senasir_years");
        this.years = res.payload.list_years;
        this.year_selected = this.years[0];

        //this.getMonths();
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    async getMonths() {
      try {
        //this.list_months_not_import = [];
        let res = await this.$axios.post(
          "api/contribution/list_months_import_contribution_senasir",
          {
            period_year: this.year_selected,
          }
        );
        this.list_senasir_months = res.payload.list_senasir_months;
        /*for (let i = 0; i < res.payload.list_senasir_months.length; i++) {
          if (res.payload.list_senasir_months[i].state_importation == false) {
            this.list_months_not_import.push(
              res.payload.list_senasir_months[i]
            );
          }
        }*/
        console.log(this.year_selected);
      } catch (e) {
        console.log(e);
      }
    },
    openDialog(year_selected) {
      this.dialog = true;
      (this.month_selected = null), console.log(year_selected);
    },
    close() {
      this.dialog = false;
      this.clearData();
    },
    //PASO3
    async ImportContributions() {
      this.btn_import_contributions = true;
      try {
        let res = await this.$axios.post("api/contribution/import_create_or_update_contribution_period_senasir",{
            period_contribution_senasir: this.dateFormat,
          }
        );
        if (res.payload.successfully) {
          this.$toast.success("Total de registros: "+ res.payload.num_total + "\n Registros creados: "+ res.payload.num_created + "\n Registros actualizados: "+ res.payload.num_updated)
          /*this.progress.percentage = 100
          this.dialog = false
          this.clearData()*/
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
    confirm_import_contribution(month_selected, valor){
      this.month_selected = month_selected
      this.dialog_confirm_import_contribution= valor
      console.log( month_selected)
      console.log( valor)

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