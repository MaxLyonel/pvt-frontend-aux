<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title>
        <v-toolbar dense color="tertiary" class="caption">
          <GlobalBreadCrumb />
        </v-toolbar>
      </v-card-title>
      <v-card-text> 
        <v-data-table
          :key="refreshKardexTable"
          dense
          :headers="headers"
          :items="affiliates"
          :options.sync="options"
          :server-items-length="totalaffiliates"
          :footer-props="{ itemsPerPageOptions: [8, 15, 50,100] }"
          :loading = loading_table
        >
          <!--Estilos de busqueda para los campos -->
          <template v-slot:[`header.city_loan`]="{ header }">
            <span :class="searching.identity_card_affiliate? 'primary--text' : ''">{{ header.text }}</span>
          </template>

          <template v-slot:[`header.name_role_loan`]="{ header }">
            <span :class="searching.registration_affiliate? 'primary--text' : ''">{{ header.text }}</span>
          </template>

          <template v-slot:[`header.user_loan`]="{ header }">
            <span :class="searching.full_name_affiliate? 'primary--text' : ''">{{ header.text }}</span>
          </template>

          <template v-slot:[`header.code_loan`]="{ header }">
            <span :class="searching.name_degree? 'primary--text' : ''">{{ header.text }}</span>
          </template>

          <template v-slot:[`header.identity_card_borrower`]="{ header }">
            <span :class="searching.name_affiliate_state? 'primary--text' : ''">{{ header.text }}</span>
          </template>

          <!--Fin de estilos de busqueda-->


          <!-- Vista de los filtros -->
          <template slot="body.prepend">
            <tr v-if="show_filter">
                <td><v-text-field placeholder="C.I." spellcheck="false" class="filter-text" v-model="searching.identity_card_affiliate" @keydown.enter="list_affiliates"></v-text-field></td>
                <td><v-text-field placeholder="Matricula" spellcheck="false" class="filter-text" v-model="searching.registration_affiliate" @keydown.enter="list_affiliates"></v-text-field></td>
                <td><v-text-field placeholder="Nombre Completo" spellcheck="false" class="filter-text" v-model="searching.full_name_affiliate" @keydown.enter="list_affiliates"></v-text-field></td>
                <td><v-text-field placeholder="Grado" spellcheck="false" class="filter-text" v-model="searching.name_degree" @keydown.enter="list_affiliates"></v-text-field></td>
                <td><v-text-field placeholder="Estado" spellcheck="false" class="filter-text" v-model="searching.name_affiliate_state" @keydown.enter="list_affiliates"></v-text-field></td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import GlobalBreadCrumb from "@/components/common/GlobalBreadCrumb.vue";
import GlobalLoading from "@/components/common/GlobalLoading.vue";
export default {
  name: "MainListAffiliate",
  components: {
    GlobalBreadCrumb,
    GlobalLoading,
  },
  data: () => ({
    // Cabeceras de la tabla
    headers: [
      { text: 'CI Afiliado', value:'identity_card_affiliate', class: ['normal', 'white--text','text-md-center'],width: '10%', sortable: false },
      { text: 'Matrícula', value:'registration_affiliate', class: ['normal', 'white--text','text-md-center'],width: '10%', sortable: false },
      { text: 'Nombre Completo Afiliado', value:'full_name_affiliate', class: ['normal', 'white--text','text-md-center'],width: '10%', sortable: false },
      { text: 'Grado', value:'name_degree', class: ['normal', 'white--text','text-md-center'],width: '10%', sortable: false },
      { text: 'Estado', value:'name_affiliate_state', class: ['normal', 'white--text','text-md-center'],width: '10%', sortable: false },
    ],
    searching: {
      id_affiliate:"", // id affiliado
      identity_card_affiliate:"", // ci affiliado
      registration_affiliate:"", // matricula
      full_name_affiliate:"", // nombre completo
      name_degree: "", // grado
      name_affiliate_state: "", //Estado
    },
    affiliates: [],
    options: {
      page: 1,
      itemsPerPage: 8,
      sortBy: ["code_loan"],
      sortDesc: [false],
    },
    totalaffiliates: 0,
    loading_table: false,
    trashed_loan: false,
    show_filter:true,
    refreshKardexTable: 0,

  }),
  mounted() {
    this.list_affiliates()
  },
  watch: {
    options: function (newVal, oldVal) {
      if (
        newVal.page != oldVal.page ||
        newVal.itemsPerPage != oldVal.itemsPerPage ||
        newVal.sortBy != oldVal.sortBy ||
        newVal.sortDesc != oldVal.sortDesc
      ) {
        this.list_affiliates()
      }
    },
    trashed_loan: function(newVal, oldVal){
      if(newVal!= oldVal){
        this.list_affiliates()
      }
    },
    searching: {
      deep: true,
      handler(val) {
        this.options.page=1
      }
    },
    refreshKardexTable: function(newVal, oldVal){
      if(newVal!= oldVal){
        this.list_affiliates()
      }
    },

  },
  methods: {
    async list_affiliates() {
      this.loading_table = true
      try {
        let res = await this.$axios.get("/affiliate/affiliate", {
          params: {
            id_affiliate: this.searching.id_affiliate,
            identity_card_affiliate: this.searching.identity_card_affiliate,
            registration_affiliate: this.searching.registration_affiliate,
            full_name_affiliate: this.searching.full_name_affiliate,
            name_degee: this.searching.name_degree,
            name_affialte_state: this.searching.name_affiliate_state,
            page: this.options.page,
            per_page: this.options.itemsPerPage,
            sortBy: this.options.sortBy,
            sortDesc: this.options.sortDesc,
            trashed_loan: this.trashed_loan
          },
        });
        this.affiliates = res.payload.affiliates.data
        this.totalaffiliates = res.payload.affiliates.total
        /*delete res.data["data"]*/
        this.options.page = res.payload.affiliates.current_page
        console.log(this.options.page)
        this.options.itemsPerPage = parseInt(res.payload.affiliates.per_page)
        this.loading_table = false
      } catch (e) {
        console.log(e)
        this.loading_table = false
      }
    },
    _show_filter(){
       this.show_filter=!this.show_filter
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
.v-text-field {
  background-color: white;
  width: 200px;
  padding: 5px;
  margin: 0px;
  font-size: 0.8em;
  border-color: teal;
}
.filter-text{
  font-size: 12px;
  height: 2px;
  margin: 0 0 40px 0;
  padding: 0;
  width: 100%

}
</style>

