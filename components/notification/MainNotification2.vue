<template>
    <v-container fluid>
        <v-card flat>
            <v-card-title mb-4>
                <v-toolbar dense color="tertiary" class="caption">
                    <GlobalBreadCrumb/>
                </v-toolbar>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>
                <v-card color="#f2f2f2" flat tile>
                <v-container>
                    <v-row>
                        <v-col cols="3">
                            <v-card elevation="2" tile>
                                <h2>Filtros</h2>
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-card elevation="2" tile>
                                <h2>Redacción</h2>
                            </v-card>
                        </v-col>
                        <v-col cols="3">
                            <v-card 
                                ma-3
                                max-width="340"
                                elevation="2" tile>
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
                                            <v-divider dark inset></v-divider>
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
                </v-container>
                </v-card>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>

import GlobalBreadCrumb from "@/components/common/GlobalBreadCrumb.vue";

export default {
    name: 'MainNotification2',
    data: () => ({
        text:"",
        rules: [v => v.length <= 999 || 'Max 1000 caracteres'],
        scrollInoked:0,
    }),
    components: {
        GlobalBreadCrumb
    },
    methods: {
        onScroll() {
            this.scrollInvoked++
        },
    },
}

</script>