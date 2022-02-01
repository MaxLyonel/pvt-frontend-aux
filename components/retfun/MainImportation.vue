<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title>
        <v-toolbar dense color="tertiary" class="caption">
          <v-row>
            <v-col cols="12" class="pa-0"> Importación </v-col>
            <v-col cols="12" class="pa-0">
              <v-icon>mdi-arrow-right-bold-box</v-icon>
              Importación
            </v-col>
          </v-row>
          <div class="flex-grow-1"></div>
          <v-btn-toggle color="teal" group mandatory>
            <v-btn value="COMANDO"> Comando </v-btn>
            <v-btn value="SENASIR"> Senasir </v-btn>
          </v-btn-toggle>
          {{ year_selected }}
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
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = close()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>IMPORTACION SENASIR</v-toolbar-title>
        </v-toolbar>
        <v-row justify="center"
          ><v-col cols="8">
            <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1" editable>
                  Subir archivo
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2" editable>
                  Validar Datos
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3"> Realizar importación </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card class="mb-12" color="grey lighten-1">
                    <v-card-text>
                      <v-card color="white" class="pa-2">
                        <v-row>
                          <v-col cols="6" md="6">
                            <v-select
                              dense
                              :items="list_months_not_import"
                              item-text="period_month_name"
                              item-value="period_month"
                              :label="'Periódos para importar ' + year_selected"
                              v-model="month_selected"
                            ></v-select>
                            {{ this.import_export.file }}
                          </v-col>

                          <v-col cols="6" md="6">
                            <v-file-input
                              counter
                              show-size
                              truncate-length="30"
                              outlined
                              small-chips
                              dense
                              label="Cargar Archivo"
                              v-model="import_export.file"
                            ></v-file-input>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-card-text>
                  </v-card>
                  <v-btn color="secondary" @click="e1 = 2"> Continue </v-btn>
                  <v-btn color="primary" @click="uploadFile()">
                    subir archivo
                  </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="200px"
                  ></v-card>

                  <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

                  <v-btn text> Cancel </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="200px"
                  ></v-card>

                  <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>

                  <v-btn text> Cancel </v-btn>
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
    years: [],
    loading: false,
    year_selected: "",
    period_type: "SENASIR",
    list_senasir_months: [],
    list_months_not_import: [],
    dialog: false,
    e1: 1,
    import_export: {},
    month_selected: "",
  }),
  created() {
    this.getYears();
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
        let res = await this.$axios.get("api/contribution/list_senasir_years");
        this.years = res.payload.list_senasir_years;
        this.year_selected = this.years[this.years.length - 1];

        this.getMonths();
        this.loading = false;
      } catch (e) {
        comsole.log(e);
      }
    },
    async getMonths() {
      try {
        this.list_months_not_import = [];
        let res = await this.$axios.post(
          "api/contribution/list_senasir_months",
          {
            period_year: this.year_selected,
          }
        );
        this.list_senasir_months = res.payload.list_senasir_months;
        for (let i = 0; i < res.payload.list_senasir_months.length; i++) {
          if (res.payload.list_senasir_months[i].state_importation == false) {
            this.list_months_not_import.push(
              res.payload.list_senasir_months[i]
            );
            console.log(this.list_months_not_import);
          }
        }
        console.log(this.year_selected);
      } catch (e) {
        comsole.log(e);
      }
    },
    openDialog(year_selected) {
      this.dialog = true;
      console.log(year_selected);
    },
    close() {
      this.dialog = false;
    },
    //PASO1 METODOS
    //Metodo para subir el archivo
    async uploadFile() {
      let date = this.year_selected+ '-'+ this.month_selected +'-'+'01';
      console.log(date)
      let formData = new FormData();
      formData.append("file", this.import_export.file);
      formData.append("date_payroll", date);
      try {
        let res = await this.$axios.post("api/contribution/upload_copy_payroll_senasir", formData);
        if(res.payload.successfully){
          this.$toast.success('Se ha realizado el copiado de '+ res.payload.copied_record)
        }else{
          this.$toast.error(res.payload.error)
        }
      } catch (e) {
        console.log(e);
      }
    },
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