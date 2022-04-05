<template>
  <div id="background-page">
    <v-container md="2" not-gutters align-center justify-center >


            <v-row  class=" primary mt-1 bo "  wrap  justify="center"  mt="10px" >
                          
            

   
                    <v-col class="primary" lg="8" md="8 " sm="8" >
                        
                        <v-row class="primary" style="height: 848px;" >
<!--                           
                                <img id ="image"
                                   
                                    height="848px"
                                    width="800px"
                                    src="../assets/images/muserpol.jpg"
                                    
                                    
                                  /> -->

                                  <v-img  
                                   v-bind="props"
                                    gradient="to top right , rgba(25,32,72,.7), #0AADB3"
                                    height="848px"
                                  
                                    src="_nuxt/assets/images/muserpol.jpg"
                         
                                  >
                                  
                         
                                  <v-row justify="center" align="center" style="height: 848px;" >
                                        <v-col class=" text-center"  lg="6" md="12" sm="12" >
                                                            
                                  
                                                    <div class="font-weight-medium white--text  ">
                                                      <!-- BIENVENIDOS A LA PLATAFORMA VIRTUAL DE TRAMITES -->
                                                        <h1 class="white--text " id="letra">BIENVENIDOS A LA PLATAFORMA VIRTUAL DE TRAMITES</h1>
                                                    </div>
                                                            
                                        </v-col>
                                  </v-row>








                                  </v-img>

                                  
                                  <!-- <v-img id ="image"
                                   
                                    height="848px"
                                  
                                    src="_nuxt/assets/images/muserpol-filtro.png"
                                    
                                    
                                  ></v-img> -->
                                   

                                  <!-- <img src="_nuxt/assets/images/muserpol.jpg"/> -->
                         
                        </v-row>
                        
               
                        
                    </v-col>
                    
                    <v-col class="background"  lg="4" md="4" sm="4">
                          <v-row  justify="center" style="height: 848px;">

                                      <v-col  class=" mt-5" align-self="center" lg="11" md="11" sm="11" style="min">
                                            <!-- <v-img 
                                              height="max"
                                              width="max"
                                              src="https://i.pinimg.com/564x/4e/dd/54/4edd54bbebe9767be6ebb148572e9f11.jpg"
                                          
                                          > </v-img> -->
                                            
                                            <v-img 
                                              height="max"
                                              width="max"
                                              src="_nuxt/assets/images/muser.png"
                                          
                                          > </v-img>

                                            <!-- <img 
                                   
                                              height="max"
                                              width="max"
                                              src="../assets/images/muser.png"
                                              

                                              /> -->

                                      </v-col>
                              
                             <v-col class="backgraund" lg="11" md="11" sm="11"> 
                               <Login />
                             </v-col> 

                          </v-row>    
                    </v-col>
           

            </v-row>

        
        
       
    </v-container>
  </div>  
</template>
<script>
import Login from '@/components/auth/Login.vue'
export default {
  name: "PageLogin",
  //auth: false,
  components: {
    Login
  }
}
</script>
<style>
#background-page {
  /* background: #0AADB3; */
  /* background: #EDF2F4; */
  width: 100%;
	height: 100%;
  position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	width: auto;
	height: auto;
	background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,#385F73), color-stop(100%,#0AADB3)); /* Chrome,Safari4+ */
	/* z-index: 1;
	opacity: 0.7; */
 
  
}
#image {
  z-index: 1;
	opacity: 0.7;
  -webkit-filter: blur(2px);
     

}

#letra {
  text-shadow: 2px 2px 2px #385F73;
 
}

#border{
  border-radius: 40%;

}

</style>