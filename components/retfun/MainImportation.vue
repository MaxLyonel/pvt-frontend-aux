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
            label="Gestion"
            v-model="year_selected"
            dense
            outlined
            class="select-year"
          ></v-select>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                fab
                dark
                x-small
                :color="'success'"
                bottom
                right
                v-on="on"
                class="mx-2"
                @click.stop="openDialog(year_selected)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <div>
              <span>Añadir Periodo</span>
            </div>
          </v-tooltip>
        </v-toolbar>
      </v-card-title>
      <v-card-text> </v-card-text>
    </v-card>
    <!--contenido-->
    <div v-if="loading_circular">
      <GlobalLoading />
    </div>
    <v-row justify="center" class="py-0 mt-2" v-if="!loading_circular">
       <v-card
        class="headline font-weight-bold ma-2"
        max-width="250px"
        v-for="(item, i) in list_senasir_months"
        :key="i"
      >
        <template v-if="item.state_importation">
          <v-card-title class="teal">
            <v-row justify="center">
              <h3 class="white--text">{{ item.period_month_name }}</h3></v-row
            >
          </v-card-title>
          <v-divider inset></v-divider>
          <v-card-text class="blue-grey lighten-5">
            <v-row v-if="period_type === 'SENASIR'">
              <v-col cols="12" md="12" class="py-0">
                <b>Senasir <v-icon small>mdi-home-analytics</v-icon></b>
              </v-col>
              <v-divider inset></v-divider>
              <v-col cols="12" md="12" class="py-0">
                <!--<v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn class="ma-2 teal white--text btn-period" v-on="on">
                      <v-icon dark left small>mdi-arrow-down</v-icon>Descargar
                    </v-btn>
                  </template>
                  <div>
                    <span>Descargar información</span>
                  </div>
                </v-tooltip>-->
                <span class="info--text">N° reg. copiados: </span><strong>{{$filters.thousands(item.data_count.num_total_data_copy)}}</strong><br>
                <span class="info--text">N° reg. considerados: </span><strong>{{$filters.thousands(item.data_count.num_data_considered)}}</strong><br>
                <span class="error--text">N° reg. no considerados: </span><strong>{{$filters.thousands(item.data_count.num_data_not_considered)}}</strong><br>
                <span class="info--text">N° reg. validados: </span><strong>{{$filters.thousands(item.data_count.num_data_validated)}}</strong><br>
                <!--<span class="info--text">N° reg. importados: </span><strong>{{$filters.thousands(item.data_count.num_total_data_contribution_passives}}</strong><br>
                <span class="info--text">Total aportes Bs.: </span><strong>{{$filters.thousands(item.data_count.sum_amount_total_contribution_passives}}</strong><br>-->
              </v-col>
            </v-row>
          </v-card-text>
        </template>
      </v-card>
    </v-row>
    <!--fin contenido-->
    <!--steps-->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>IMPORTACION SENASIR</v-toolbar-title>
        </v-toolbar>
        <v-row justify="center" class="mt-5"
          ><v-col cols="8">
            <v-toolbar-title class="pb-5">
              <center><b>GESTIÓN {{year_selected}}</b></center>gits
              <div class="text-right">
                <Information />
              </div>
              </v-toolbar-title>

              <v-select
                dense
                :items="list_months_not_import"
                item-text="period_month_name"
                item-value="period_month"
                :label="'Periódo para importar '"
                v-model="month_selected"
                outlined
                @change ="importProgressBar()"
                :disabled="progress.query_step_1"
              ></v-select>

            <v-stepper v-model="e1" v-if="month_selected != null" editable>
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1" >
                  Subir archivo
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">
                  Validar Datos
                </v-stepper-step>
                <!--<v-divider></v-divider>
                <v-stepper-step step="3" editable>
                  Realizar importación 
                </v-stepper-step>-->
              </v-stepper-header>

              <v-stepper-items>
                <v-progress-linear
                  color="info"
                  height="20"
                  :value="progress.percentage"
                  striped
                >
                  <strong>Porcentaje de Importación: {{progress.percentage}}%</strong>
                </v-progress-linear>
                <v-stepper-content step="1">
                  <v-card class="mb-12" color="grey lighten-1">
                    <v-card-text>
                      <v-card color="white" class="pa-2">
                        <v-form ref="forStep1">
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-file-input
                              counter
                              show-size
                              truncate-length="30"
                              outlined
                              small-chips
                              dense
                              label="Cargar Archivo"
                              v-model="import_export.file"
                              :disabled="progress.query_step_1"
                              :rules="[$rules.obligatoria('Archivo')]"
                            ></v-file-input>
                          </v-col>
                          <v-col cols="12" md="6" v-if="progress.query_step_1">
                            <strong>Nombre del archivo:</strong> {{ progress.file_exists ? progress.file_name :  import_export.file.name}}<br>
                            <strong>Total de registros copiados:</strong> {{$filters.thousands(data_count.num_total_data_copy)}}<br>
                          </v-col>
                        </v-row>
                        </v-form>
                      </v-card>
                    </v-card-text>
                  </v-card>
                  <v-btn 
                    color="primary"
                    @click="validateForm1()"
                    :loading ="btn_update_file"
                  >
                    Subir archivo
                  </v-btn>
                  <v-btn color="secondary"
                    :disabled="!progress.query_step_1"
                    @click="nextStep(1)"> Siguiente </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card class="mb-12" color="grey lighten-1">
                    <v-card-text>
                      <v-card color="white" class="pa-2" v-if="progress.query_step_1">
                        <v-row>
                          <v-col cols="12" md="6">
                            <strong>Nombre del archivo:</strong> {{ progress.file_exists ? progress.file_name :  import_export.file.name}}<br>
                            <strong class="success--text">Total de registros considerados:</strong> {{$filters.thousands(data_count.num_data_considered)}}<br>
                            <strong class="red--text">Total de registros no considerados:</strong> {{$filters.thousands(data_count.num_data_not_considered)}}<br>
                          </v-col>
                          <v-col cols="12" md="6">
                            <strong>Total de registros copiados:</strong> {{data_count.num_total_data_copy}}<br>
                            <strong class="success--text">Total de registros validados:</strong> {{$filters.thousands(data_count.num_data_validated)}}<br>
                            <strong class="error--text">Total de registros no validados:</strong> {{$filters.thousands(data_count.num_data_not_validated)}}<br>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-card-text>
                  </v-card>
                  <v-btn color="primary" @click="dialog_confirm_import=true">
                    Validar archivo
                  </v-btn>
                  <v-btn color="error" @click="dialog_confirm=true">
                    Rehacer
                  </v-btn>
                  <!--<v-btn color="secondary"
                    :disabled="!progress.query_step_2"
                    @click="nextStep(2)"> Siguiente </v-btn>-->
                </v-stepper-content>

                <!--<v-stepper-content step="3">
                  <v-card class="mb-12" color="grey lighten-1">
                    <v-card-text>
                      <v-card color="white" class="pa-2" v-if="progress.query_step_1">
                        <v-row>
                          <v-col cols="12" md="6">
                            <strong>Nombre del archivo:</strong> {{ progress.file_exists ? progress.file_name :  import_export.file.name}}<br>
                            <strong class="success--text">Total de registros considerados:</strong> {{data_count.num_data_considered}}<br>
                            <strong class="red--text">Total de registros no considerados:</strong> {{data_count.num_data_not_considered}}<br>
                          </v-col>
                          <v-col cols="12" md="6">
                            <strong>Total de registros copiados:</strong> {{data_count.num_total_data_copy}}<br>
                            <strong class="success--text">Total de registros validados:</strong> {{data_count.num_data_validated}}<br>
                            <strong class="error--text">Total de registros no validados:</strong> {{data_count.num_data_not_validated}}<br>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-card-text>
                  </v-card>
                  <v-btn color="primary" @click="dialog_confirm_import=true">
                    Importar archivo
                  </v-btn>
                  <v-btn color="error" 
                    :disabled="progress.query_step_3" 
                    @click="rollbackContribution()">
                    Rehacer
                  </v-btn>
                </v-stepper-content>-->

              </v-stepper-items>
            </v-stepper>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!--fin steps-->
    <v-dialog
      v-model="dialog_confirm"
      max-width="600"
    >
      <v-card>
        <v-card-title>
          <center>¿Esta seguro que quiere rehacer el proceso de importación?</center>
          <br>
          <br> <small class='caption'>Al rehacer se borraran todos los datos ingresados</small>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog_confirm=false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="success"
            text
            @click="rollbackContribution()"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog_confirm_import"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          Esta seguro de realizar la importación?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog_confirm_import=false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="sucess"
            text
            @click="validateData()"
            :loading= "btn_validate_data"
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
import GlobalLoading from "@/components/common/GlobalLoading.vue";
import Information from "@/components/retfun/Information.vue";
export default {
  name: "MainImportation",
  components: {
    GlobalBreadCrumb,
    GlobalLoading,
    Information
  },
  data: () => ({
    active: 'SENASIR',
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
      reg_validation: 0
    },
    data_count:{
      num_data_considered: 0,
      num_data_not_considered: 0,
      num_data_not_validated: 0,
      num_data_validated: 0,
      //num_total_data_contribution_passives: 0,
      num_total_data_copy: 0
    },
    btn_update_file: false,
    btn_validate_data: false,
    btn_import_contributions: false,
    btn_rollback: false,
    dialog_confirm : false,
    dialog_confirm_import:false,
    loading_circular:false
  }),
  created() {
    this.getYears();
  },
  computed: {
    dateFormat() {
      if(this.month_selected < 10)
      return this.year_selected + "-" + "0"+this.month_selected + "-" + "01";
      else
      return this.year_selected + "-" + this.month_selected + "-" + "01";
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
    nextStep (n) {
      if (n == this.steps) {
        this.e1 = 1
      }
      else {
        if(n==1){
          this.progress.percentage= this.progress.percentage + 50
        }if(n==2){
          this.progress.percentage= this.progress.percentage + 100
        }
        this.e1 = n + 1
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
      this.loading_circular = true
      try {
        this.list_months_not_import = [];
        let res = await this.$axios.post("api/contribution/list_months_validate_senasir",{
            period_year: this.year_selected,
          }
        );
        this.list_senasir_months = res.payload.list_senasir_months;
        for (let i = 0; i < res.payload.list_senasir_months.length; i++) {
          if (res.payload.list_senasir_months[i].state_importation == false) {
            this.list_months_not_import.push(res.payload.list_senasir_months[i]);
          }
        }
        console.log(this.year_selected);
        this.loading_circular = false
      } catch (e) {
        console.log(e);
        this.loading_circular = false
      }
    },
    openDialog(year_selected) {
      this.dialog = true;
      this.month_selected= null,
      console.log(year_selected);
    },
    close() {
      this.dialog = false;
      this.clearData()
    },
    //PASO1
    //Metodo para subir el archivo
    async uploadFile() {
      this.btn_update_file = true;
      let formData = new FormData();
      formData.append("file", this.import_export.file);
      formData.append("date_payroll", this.dateFormat);
      try {
        let res = await this.$axios.post("api/contribution/upload_copy_payroll_senasir",
          formData
        );
        if (res.payload.successfully) {
          this.data_count.num_total_data_copy = res.payload.data_count.num_total_data_copy
          this.data_count.num_data_considered = res.payload.data_count.num_data_considered
          this.data_count.num_data_not_considered = res.payload.data_count.num_data_not_considered
          this.data_count.num_data_not_validated = res.payload.data_count.num_data_not_validated
          this.data_count.num_data_validated = res.payload.data_count.num_data_validated
          this.$toast.success("Se ha realizado el copiado de " + res.payload.data_count.num_total_data_copy+ ' registros');
          this.progress.query_step_1 = true
          console.log(this.import_export.file.name)
        } else {
          this.$toast.error(res.payload.error);
        }
        this.btn_update_file = false;
      } catch (e) {
        console.log(e);
        this.btn_update_file = false;
        this.$toast.error(e.message);
      }
    },
    //PASO2
    async validateData() {
      this.btn_validate_data = true;
      try {
        let res = await this.$axios.post("api/contribution/validation_payroll_senasir",{
            date_payroll: this.dateFormat,
          }
        );
        if (res.payload.successfully) {
          //this.progress.query_step_2 = true
          this.data_count.num_data_not_validated = res.payload.data_count.num_data_not_validated
          this.data_count.num_data_validated = res.payload.data_count.num_data_validated

          if(res.message == 'Excel'){
            this.$toast.info('No se encontraron algunas matrículas, por favor revise el archivo Excel');
            this.downloadFailValidate();
            //this.e1 = 1
            //this.progress.query_step_1 = false
            //this.progress.percentage = 0
          }
          this.progress.percentage = 100
          this.dialog_confirm_import = false
          this.dialog = false
          this.clearData()
          this.getMonths();
          this.$toast.success("Se ha realizado la validación de "+ res.payload.data_count.num_data_validated+" registros");

        } else {
            this.e1 = 1
            this.progress.query_step_1 = false
            this.progress.percentage = 0
            this.$toast.error(res.message);
        }
        this.btn_validate_data = false;
      } catch (e) {
        console.log(e);
        this.btn_validate_data = false;
      }
    },
    async downloadFailValidate() {
      try {
        // ESTA ES OTRA FORMA QUE UTILIZA FETCH EN LUGAR DE AXIOS
        /*let response = await fetch(
          'http://localhost:8989/api/contribution/download_fail_validated_senasir', {
            method: 'POST',
            body: JSON.stringify({date_payroll: this.dateFormat}),
            headers: new Headers({'Authorization': `Bearer 64|S34WMifFxR4XVdyQtC8WTdk4cVOFMocqZcQFCN9a`, 'responseType': 'blob', 'Content-Type': 'application/json'}),
          }
        );
        let res = (await response.blob())*/

        // Se debe enviar el responseType como configuracion, NO como header
        let res = await this.$axios.post("api/contribution/download_fail_not_found_payroll_senasir",{
            date_payroll: this.dateFormat,
          },
          {'Accept': 'application/vnd.ms-excel' },
          {'responseType': 'blob'}
        );
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ReporteMatriculasNoValidas.xls");
        document.body.appendChild(link);
        link.click();
      } catch (e) {
        console.log(e);
      }
    },
    //PASO3
    async ImportContributions() {
      this.btn_import_contributions = true;
      try {
        let res = await this.$axios.post("api/contribution/import_create_or_update_contribution_payroll_period_senasir",{
            period_contribution_senasir: this.dateFormat,
          }
        );
        if (res.payload.successfully) {
          this.$toast.success("Total de registros: "+ res.payload.num_total + "\n Registros creados: "+ res.payload.num_created + "\n Registros actualizados: "+ res.payload.num_updated)
          this.progress.percentage = 100
          this.dialog_confirm_import= false
          this.dialog = false
          this.clearData()
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
    async rollbackContribution() {
      this.btn_rollback = true
      try {
        let res = await this.$axios.post("api/contribution/rollback_payroll_copy_senasir",{
            date_payroll: this.dateFormat,
          }
        );
        if (res.payload.valid_rollbackk) {
          this.$toast.info(res.message + ". Se ha realizado el borrado de datos");
          this.clearData()
          this.dialog_confirm=false
        } else {
          this.$toast.error(res.message);
        }
        this.btn_rollback = false
      } catch (e) {
        console.log(e);
      }
    },
    async importProgressBar() {
      try {
        let res = await this.$axios.post("api/contribution/import_payroll_senasir_progress_bar",{
            date_payroll: this.dateFormat,
          }
        );
        this.progress = res.payload.import_progress_bar
        this.data_count = res.payload.data_count
        if(this.progress.query_step_1){
          this.e1 = 2
          this.progress.percentage = this.progress.percentage
          /*if(this.progress.query_step_2){
            this.e1 = 3
            this.progress.percentage = this.progress.percentage
          }else{
            this.e1 = 2
            this.progress.percentage = this.progress.percentage
          }*/
        }else {
          this.e1 = 1
          this.progress.percentage = 0
      }
         console.log(this.e1)
      } catch (e) {
        console.log(e);
      }
    },
    validateForm1() {
      if (this.$refs.forStep1) {
        if (this.$refs.forStep1.validate()) {
          this.uploadFile();
        } else {
          this.$toast.error('Ingrese los datos necesarios');
        }
      }
    },
    clearData(){
      this.e1 = 1,
      this.import_export = {},
      this.progress.file_exists= false,
      this.progress.file_name= null,
      this.progress.percentage= 0,
      this.progress.query_step_1= false,
      this.progress.query_step_2= false
      //this.progress.query_step_3= false
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