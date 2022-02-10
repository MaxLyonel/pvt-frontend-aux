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
    <v-row justify="center" class="py-0 mt-2">
      <v-card
        class="headline font-weight-bold ma-2"
        max-width="200px"
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
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn class="ma-2 teal white--text btn-period" v-on="on">
                      <v-icon dark left small>mdi-arrow-down</v-icon>Descargar
                    </v-btn>
                  </template>
                  <div>
                    <span>Descargar información</span>
                  </div>
                </v-tooltip>
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
              <center><b>GESTIÓN {{year_selected}}</b></center>
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

            <v-stepper v-model="e1" v-if="month_selected != null">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1" editable>
                  Subir archivo
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2" editable>
                  Validar Datos
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3" editable>
                  Realizar importación
                </v-stepper-step>
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
                          <v-col cols="12" md="12">
                            <v-file-input
                              counter
                              show-size
                              truncate-length="30"
                              outlined
                              small-chips
                              dense
                              label="Cargar Archivo"
                              v-model="import_export.file"
                              :rules="[$rules.obligatoria('Archivo')]"
                            ></v-file-input>
                          </v-col>
                        </v-row>
                        </v-form>
                      </v-card>
                    </v-card-text>
                  </v-card>
                  <v-btn color="primary" @click="validateForm1()">
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
                          </v-col>
                          <v-col cols="12" md="6">
                            <strong>Total de registros copiados:</strong> {{progress.reg_copy}}<br>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-card-text>
                  </v-card>
                  <v-btn color="primary" @click="validateData()">
                    Validar archivo
                  </v-btn>
                  <v-btn color="error" @click="rollbackContribution()">
                    Rehacer
                  </v-btn>
                  <v-btn color="secondary"
                    :disabled="!progress.query_step_2"
                    @click="nextStep(2)"> Siguiente </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-card class="mb-12" color="grey lighten-1">
                    <v-card-text>
                      <v-card color="white" class="pa-2" v-if="progress.query_step_1">
                        <v-row>
                          <v-col cols="12" md="6">
                            Nombre del archivo: {{ progress.file_exists ? progress.file_name :  import_export.file.name}}<br>
                          </v-col>
                          <v-col cols="12" md="6">
                            <strong>Total de registros copiados:</strong> {{progress.reg_copy}}<br>
                            <strong>Total de registros validados:</strong> {{progress.reg_validation}}
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-card-text>
                  </v-card>
                  <v-btn color="primary" @click="ImportContributions()">
                    Importar archivo
                  </v-btn>
                  <v-btn color="error" 
                    :disabled="progress.query_step_3" 
                    @click="rollbackContribution()">
                    Rehacer
                  </v-btn>
                </v-stepper-content>

              </v-stepper-items>
            </v-stepper>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!--fin steps-->
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
      query_step_3: false,
      reg_contribution: 0,
      reg_copy: 0,
      reg_validation: 0
    },
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
          this.progress.percentage= this.progress.percentage + 30
        }if(n==2){
          this.progress.percentage= this.progress.percentage + 30
        }
        this.e1 = n + 1
      }
    },
    async getYears() {
      try {
        this.loading = true;
        let res = await this.$axios.get("api/contribution/list_senasir_years");
        this.years = res.payload.list_senasir_years;
        this.year_selected = this.years[this.years.length - 1];

        this.getMonths();
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    async getMonths() {
      try {
        this.list_months_not_import = [];
        let res = await this.$axios.post("api/contribution/list_senasir_months",{
            period_year: this.year_selected,
          }
        );
        this.list_senasir_months = res.payload.list_senasir_months;
        for (let i = 0; i < res.payload.list_senasir_months.length; i++) {
          if (res.payload.list_senasir_months[i].state_importation == false) {
            this.list_months_not_import.push(
              res.payload.list_senasir_months[i]
            );
          }
        }
        console.log(this.year_selected);
      } catch (e) {
        console.log(e);
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
      let formData = new FormData();
      formData.append("file", this.import_export.file);
      formData.append("date_payroll", this.dateFormat);
      try {
        let res = await this.$axios.post("api/contribution/upload_copy_payroll_senasir",
          formData
        );
        this.progress.reg_copy = res.payload.copied_record
        if (res.payload.successfully) {
          this.$toast.success("Se ha realizado el copiado de " + res.payload.copied_record+ ' registros');
          this.progress.query_step_1 = true
          console.log(this.import_export.file.name)
        } else {
          this.$toast.error(res.payload.error);
        }
      } catch (e) {
        console.log(e);
        this.$toast.error(e.message);
      }
    },
    //PASO2
    async validateData() {
      try {
        let res = await this.$axios.post("api/contribution/validation_aid_contribution_affiliate_payroll_senasir",{
            date_payroll: this.dateFormat,
          }
        );
        if (res.payload.successfully) {
          this.progress.query_step_2 = true
          this.progress.reg_validation = res.payload.validated_record
          this.$toast.success("Se ha realizado la validación de los registros");
        } else {
          if(res.message == 'Excel'){
            this.$toast.info('No se encontraron algunas matrículas, por favor revise el archivo Excel');
            this.downloadFailValidate();
            this.e1 = 1
            this.progress.query_step_1 = false
            this.progress.percentage = 0
          }else {
            this.$toast.error(res.message);
          }
        }
      } catch (e) {
        console.log(e);
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
        let res = await this.$axios.post("api/contribution/download_fail_validated_senasir",{
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
      try {
        let res = await this.$axios.post("api/contribution/import_create_or_update_contribution_payroll_period_senasir",{
            period_contribution_senasir: this.dateFormat,
          }
        );
        if (res.payload.successfully) {
          this.$toast.success("Total de registros: "+ res.payload.num_total + "\n Registros creados: "+ res.payload.num_created + "\n Registros actualizados: "+ res.payload.num_updated)
          this.dialog = false
          this.clearData()
          this.getMonths();
        } else {
          this.$toast.error(res.message);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async rollbackContribution() {
      try {
        let res = await this.$axios.post("api/contribution/rollback_copy_validate_senasir",{
            date_payroll: this.dateFormat,
          }
        );
        if (res.payload.validated_rollback) {
          this.$toast.info(res.message + " Se ha realizado el borrado de datos");
          this.clearData()
        } else {
          this.$toast.error(res.message);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async importProgressBar() {
      try {
        let res = await this.$axios.post("api/contribution/import_progress_bar",{
            date_payroll: this.dateFormat,
          }
        );
        this.progress = res.payload.import_progress_bar
        if(this.progress.query_step_1){
          this.e1 = 2
          this.progress.percentage = this.progress.percentage
          if(this.progress.query_step_2){
            this.e1 = 3
            this.progress.percentage = this.progress.percentage
          }else{
            this.e1 = 2
            this.progress.percentage = this.progress.percentage
          }
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
      this.progress.query_step_2= false,
      this.progress.query_step_3= false,
      this.progress.reg_contribution= 0,
      this.progress.reg_copy= 0,
      this.progress.reg_validation= 0
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