<template>
    <v-container fluid>
        <v-card flat>
            <v-card-title>
                <v-toolbar dense color="tertiary" class="caption">
                    <GlobalBreadCrumb />
                </v-toolbar>
            </v-card-title>
      <v-card-text>
        <v-container md-15 not-gutters align-center justify-center style="background-color: #F0FAFC;">
            <v-skeleton-loader type="list-item-avatar-three-line, image, article">
                <v-container grid-list-xl fluid  md-12 px-15 not-gutters align-center justify-center>
                    <v-row class="mb-5 pt-0 mt-0">
                        <v-col cols="7">
                            <v-card class="pa-7 ma-1" elevation="5">
                            <p class="font-weight-bold">Redacción de la notificación</p>
                                <v-row class="ma-0 pa-0">
                                    <v-combobox
                                    label="Accion">
                                    </v-combobox>
                                </v-row>
                                <v-row class="ma-0 pa-0">
                                    <v-combobox
                                    label="Metodo de Pago">
                                    </v-combobox>
                                </v-row>
                                <v-row class="ma-0 pa-0">
                                    <v-combobox
                                    label="Semestre"
                                    dense
                                    :items=res
                                    item-text="name"
                                    item-value="id">
                                    </v-combobox>
                                </v-row>
                                <v-row class="ma-0 pa-0">
                                    <v-combobox
                                    label="Modalidad">
                                    </v-combobox>
                                </v-row>
                                <v-row class="ma-0 pa-0">
                                    <v-combobox
                                    label="Nivel Jerarquico">
                                    </v-combobox>
                                </v-row>
                                <v-row class="ma-0 pa-0"    >
                                    <v-file-input
                                    accept="image/*"
                                    label="Cargar archivo"></v-file-input>
                                </v-row>                                                        
                                <v-row class="ma-2 pa-0">
                                    <v-col v-for="(param, i) in params" :key="i">
                                        <draggable group="my-group" :list="params">
                                            <v-chip value="robot" outlined color="success" label draggable>
                                                {{ param }} 
                                            </v-chip>
                                        </draggable>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-tab-item v-for="item in items" v-bind:key="item.text">
                                        <v-chip 
                                            draggable
                                            >asd
                                        </v-chip>
                                    </v-tab-item>
                                </v-row>                                
                                    <v-row class="ma-0 pa-0">
                                            <!-- <div> -->
                                        <v-container fluid>
                                            <draggable group="my-group">
                                                <v-textarea 
                                                    clearable
                                                    counter
                                                    :rules="rules"
                                                    clear-icon="mdi-close-circle"
                                                    label="Cuerpo del Mensaje"
                                                    v-model="text"
                                                    placeholder="Escriba el mensaje de la notificación"                                        
                                                    background-color=""
                                                    color="cyan">
                                                </v-textarea>
                                            </draggable> 
                                        </v-container>
                                            <!-- </div> -->
                                    </v-row>                                                               
                            </v-card>
                        </v-col>
                            <v-col cols="5">
                                <v-card   
                                    ma-3                                  
                                    max-width="340"
                                    elevation="5"
                                >                            
                                    <v-card class="text-center" height="25" color ="#516E84">
                                        <v-card-subtitle class="mt-0 pt-1">
                                            <h3 class="font-weight-bold white--text">VISTA PREVIA</h3>
                                        </v-card-subtitle>
                                    </v-card>    
                                    <v-img src="https://www.opinion.com.bo/asset/thumbnail,992,558,center,center//media/opinion/images/2022/05/24/2022052415283420630.jpg">
                                    </v-img>
                                    <v-card
                                        class="overflow-y-auto"
                                        v-scroll.self="onScroll" 
                                        max-height="330"  
                                    >
                                        <!-- color = "#F0FAFC" -->
                                        <v-card-text >
                                            <h2 class="text-h6 primary--text">
                                                Comunicado
                                            </h2>
                                            <h3 class="secundary--text">Complemento Económico</h3>
                                            <v-divider dark=true inset=true></v-divider>
                                            <p style="white-space: pre-line;">{{ text }}</p>
                                        </v-card-text>
                                    </v-card>
                                                                            
                                    <v-card  >
                                        <!-- color = "#F0FAFC" -->
                                        <v-card-actions>                                        
                                            <v-btn 
                                                class="mr-4 white--text font-weight-bold"  block elevation="5"                                                
                                                color="primary"                                                
                                            >                                        
                                            ENVIAR
                                            </v-btn>                                        
                                    </v-card-actions>
                                    </v-card>                                                                        
                                </v-card>
                                                            
                            </v-col>
                        </v-row>
                    <v-card elevation="5">
                        <v-data-table
                        :items-per-page="5"
                        class="elevation-1"></v-data-table>
                    </v-card>

                </v-container>
            </v-skeleton-loader>
        </v-container>
      <!-- <v-subheader>Dark status bar</v-subheader> -->
    <!-- </div> -->
    </v-card-text>
    </v-card>
    </v-container>
</template>
<script>

import GlobalBreadCrumb from "@/components/common/GlobalBreadCrumb.vue";
import draggable from "vuedraggable";
    export default{
        name: 'MainNotification',
        components: {
            GlobalBreadCrumb,
            draggable
        },
        data: () => ({
            text:"",
            rules: [v => v.length <= 999 || 'Max 1000 caracteres'],
            scrollInvoked:0,
            params:["nombre", "grado", "carnet", "semestre", "fecha"],
            semesters:[],
            items: [
                {
                text: 'Nombre',
                icon: 'mdi-account'
                },
                {
                text: 'Grado',
                icon: 'mdi-seal'
                },
                {
                text: 'Carnet',
                icon: 'mdi-credit-card'
                },
                {
                text: 'Semestre',
                icon: 'mdi-calendar-check'
                },
                {
                text: 'Tipo',
                icon: 'mdi-human-greeting'
                },
            ],
            res: []
        }),
        computed: {

        },
        beforeMount(){
            this.getSemesters()
        },
        mounted(){
           
        },
        methods: {
            async getSemesters() {
                try{
                    let res = await this.$axios.get('notification/get_semesters')
                    this.semesters = res.semesters
                    this.formatSemesters()


                }catch(e){
                    console.log(e)
                }

            },
            formatSemesters(){
                let new_semester= {}
                for(let i=0; i< this.semesters.length;i++){
                new_semester[i] = this.semesters[i].year +'-'+this.semesters[i].semester
                this.res.push({
                                id: this.semesters[i].id,
                                name: new_semester[i]
                            })
                }
            },
            onScroll() {
                this.scrollInvoked++
            },
            cloneAction(item) {
                console.log("Hola como estas");
            }    
        },

    }
</script>