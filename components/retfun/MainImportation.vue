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
            <v-btn value="TRANSCRIPCION"> Transcripción </v-btn>
            <v-btn value="REGIONALES"> Regionales </v-btn>
            <v-btn value="Sismu"> Sismu </v-btn>
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
  }),
  created() {
    this.getYears();
    this.getMonths();
  },
  methods: {
    async getYears() {
      try {
        this.loading = true;
        let res = await this.$axios.get("api/contribution/list_senasir_years");
        this.years = res.payload.list_senasir_years;
        this.year_selected = this.years[this.years.length - 1];
        this.loading = false;
      } catch (e) {
        comsole.log(e);
      }
    },
    async getMonths() {
      try {
        this.loading = true;
        let res = await this.$axios.post("api/contribution/list_senasir_months",{
            period_year: 2021,
          }
        );
        this.list_senasir_months = res.payload.list_senasir_months;
        console.log(this.year_selected);
        this.loading = false;
      } catch (e) {
        comsole.log(e);
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