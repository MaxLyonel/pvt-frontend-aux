<template>
    <v-container fluid>
        <v-card flat>

            <v-card-title mb-4>
                <v-toolbar dense color="tertiary" class="caption">
                    <GlobalBreadCrumb/>
                </v-toolbar>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-text> <!-- desde aca empieza -->
                <v-container fluid class="grey lighten-5">
                    <v-row>

                        <v-col cols="9">

                            <!-- tab menú -->
                            <v-tabs v-model="tab" left background-color="grey lighten-4">
                                <v-tab v-for="item in items" :key="item"> 
                                    {{ item }}
                                </v-tab>
                            </v-tabs>

                            <v-tabs-items v-model="tab" class="grey lighten-4">
                                <v-tab-item v-for="item in items" :key="item" >
                                    <!-- <v-container pa-10> -->
                                        <v-row>
                                            <!-- filtros -->
                                            <!-- <v-container fluid pa-5> -->
                                            <v-card max-width="300">
                                                <v-col>
                                                    <!-- <div class="pr-20 pl-20"> -->
                                                        <v-select 
                                                            :items="actions" 
                                                            item-text="shortened"
                                                            item-value="id"
                                                            label="Acción" 
                                                            dense solo></v-select>
                                                        <v-select 
                                                            v-model="select"
                                                            :items="modalities_payment" 
                                                            item-text="name" 
                                                            label="Método de pago" 
                                                            item-value="id" 
                                                            :hint="`${select.name}`"
                                                            dense solo >
                                                        </v-select>
                                                        <v-select 
                                                            :items="semesters" 
                                                            item-text="period"
                                                            item-value="id"
                                                            label="Semestre" 
                                                            dense solo></v-select>
                                                        <!-- <v-select 
                                                            :items="modality" 
                                                            item-text=""
                                                            item-value=""
                                                            label="Modalidad" 
                                                            dense solo></v-select> -->
                                                        <v-select 
                                                            :items="hierarchies" 
                                                            item-text="name"
                                                            item-value="id"
                                                            label="Nivel jerárquico" 
                                                            dense solo></v-select>
                                                        <v-select 
                                                            :items="observations" 
                                                            item-text="shortened"
                                                            item-value="id"
                                                            label="Tipo Observación" 
                                                            dense solo></v-select>
                                                    <!-- </div> -->
                                                </v-col>
                                            </v-card>
                                            <!-- </v-container> -->

                                            <!-- <v-spacer></v-spacer> -->

                                            <!-- <v-container fluid> -->
                                            <v-card max-width="600" width="500" max-height="60" ml-8>
                                                <v-col>
                                                    <v-row>
                                                        <!-- <v-col v-for="(param, i) in params" :key="i" :cols="param.flex"> -->
                                                            <transition-group name="list" tag="div">
                                                                <drag class="drag" v-for="n in numbers" :key="n" :data="n" @cut="remove(n)">{{n}}</drag>
                                                            </transition-group>
                                                                <!-- <v-chip value="robot" outlined color="success" label draggable>
                                                                    {{ param }} 
                                                                </v-chip> -->
                                                        <!-- </v-col> -->
                                                    </v-row>
                                                </v-col>
                                            <!-- </v-card> -->
                                            <!-- </v-container> -->

                                            <!-- <v-container> -->
                                            <!-- <v-card width="400"> -->
                                                <v-col>
                                                    <v-row>
                                                        <v-col>
                                                            <div class="group">
                                                            <drop @drop="onCopyDrop">
                                                                
                                                                <v-textarea label="Cuerpo del mensaje" v-model="text" background-color="" color="cyan"><span v-for="(n, index) in copied" :key="index">{{n}}</span></v-textarea>
                                                            </drop>
                                                            </div>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-card> 
                                            <!-- </v-container> -->
                                        </v-row>
                                    <!-- </v-container> -->
                                </v-tab-item>
                            </v-tabs-items>

                        </v-col>

                        <v-col cols="3">
                            <v-card ma-3 max-width="340" elevation="2" tile>
                                <v-card class="text-center" height="25" color ="#516E84">
                                        <v-card-subtitle class="mt-0 pt-1">
                                            <h3 class="font-weight-bold white--text">VISTA PREVIA</h3>
                                        </v-card-subtitle>
                                    </v-card>    
                                    <v-img src="https://www.opinion.com.bo/asset/thumbnail,992,558,center,center//media/opinion/images/2022/05/24/2022052415283420630.jpg">
                                    </v-img>
                                    <v-card class="overflow-y-auto" v-scroll.self="onScroll" max-height="330"  >
                                        <v-card-text >
                                            <h2 class="text-h6 primary--text">
                                                Comunicado
                                            </h2>
                                            <h3 class="secundary--text">Complemento Económico</h3>
                                            <v-divider dark inset></v-divider>
                                            <p style="white-space: pre-line;">{{ text }}</p>
                                        </v-card-text>
                                    </v-card>
                                    <v-card>
                                        <v-card-actions>                                        
                                            <v-btn class="mr-4 white--text font-weight-bold"  block elevation="5" color="primary">                                        
                                                ENVIAR
                                            </v-btn>                                        
                                    </v-card-actions>
                                    </v-card> 
                            </v-card>
                        </v-col>

                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<!-- <template>
    <v-card
      class="mx-auto"
      max-width="700"
    >
      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
          >
            <v-card>
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </template> -->
<script> 
// export default {
//     data: () => ({
//       cards: [
//         { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
//         { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
//         { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
//       ],
//     }),
//   }
import GlobalBreadCrumb from "@/components/common/GlobalBreadCrumb.vue";
import {Drag, Drop} from "vue-easy-dnd";

export default {
    name: "MainNotification2",
    components: {
        GlobalBreadCrumb,
        Drag,
        Drop,
    },
    mounted() {
        this.getActions()
        this.getMethodsPayments()
        this.getSemesters()
        this.getHierarchies()
        this.getObservations()
    },
    data: () => ({
        text:"",
        rules: [v => v.length <= 999 || 'Max 1000 caracteres'],
        scrollInoked:0,
        tab: null,
        items: [
            'Notificación Móvil', 'SMS\'s', 'Whastapp'
        ],
        id: 6,
        module_id: 2,
        actions: [],
        select: [{
            id:"",
            name:""
        }],
        modalities_payment: [],
        semesters: [],
        hierarchies: [],
        observations:[],
        text: 'Lorepm ipsum algun texto de relleno muy lejitos voy a tardar mucho con fe mis aliados van a ganar#',
        params: [
            "nombre", "grado", "carnet", "semestre", "fecha"
        ],
        numbers: [1,2,3,4,5],
        copied: [],
    }),
    methods: {
        async getActions() {
            try{
                let response = await this.$axios.get("/notification/get_actions", undefined);
                this.actions = response.Acciones;
            } catch(e) {
                console.log(e)
            }
        },
        async getMethodsPayments() {
            try{
                let response = await this.$axios.get(`/notification/get_modalities_payment/${this.id}`, undefined);
                this.modalities_payment = response.modalities_payment;
                this.select = response.modalities_payment;
            } catch(e) {
                console.log(e)
            }
        },
        async getSemesters(){
            try{
                let response = await this.$axios.get("/notification/get_semesters", undefined);
                this.semesters = response.semesters;
            } catch(e) {
                console.log(e)
            }
        },
        async getHierarchies() {
            try {
                let response = await this.$axios.get("/notification/get_hierarchical_level", undefined)
                this.hierarchies = response.hierarchies    
            } catch(e) {
                console.log(e)
            }
        },
        async getObservations() {
            try {
                let response = await this.$axios.get(`/notification/get_observations/${this.module_id}`, undefined)
                this.observations = response.observations
            } catch(e) {
                console.log(e)
            }
        },
        onScroll() {
            this.scrollInvoked++
        },
        onCopyDrop(e) {
            this.copied.push(e.data)
        }
    },
}

</script>
<style scoped>
.drag {
    width: 60px;
    height: 60px;
    background-color: rgb(220, 220, 255);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 10px 10px 0 10px;
    font-size: 20px;
    transition: all 0.5s;
  }
.group {
    display: flex;
}
</style>