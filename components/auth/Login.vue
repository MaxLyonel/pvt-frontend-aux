<template>
  <v-container>
    <v-row align="center" class="pa-0 ma-0">
      <v-col cols="8">
        <v-row>
          <v-col cols="12">
            <!--<v-img
              src="_nuxt/assets/images/muserpol.jpg"
              aspect-ratio="4.6"
              max-height
            ></v-img>-->
            <img src="~/assets/images/muserpol.jpg" width="700" height="300"/>
          </v-col>
          <v-col cols="12">
            <v-card-title primary-title class="justify-center text-no-wrap">
              <div class="text-md-center text-uppercase">
                <p>BIENVENIDO A LA PLATAFORMA VIRTUAL DE TRÁMITES</p>
              </div>
            </v-card-title>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" style="background: #fff">
        <v-container fluid>
          <v-card-text>
            <v-form ref="forLogin">
              <div
                class="
                  display-1
                  font-weight-thin
                  text-md-center text-uppercase
                  pb-10
                "
              >
                <p>LOGIN</p>
              </div>
              <v-text-field
                class="pl-5 pr-5"
                @keyup.enter="validateForm()"
                v-model="form.username"
                prepend-icon="mdi-account"
                label="Usuario"
                autocomplete="on"
                autofocus
                :rules="[$rules.obligatoria('Usuario'), $rules.soloLetras()]"
              ></v-text-field>

              <v-text-field
                class="pl-5 pr-5 mb-3"
                @keyup.enter="validateForm()"
                v-model="form.password"
                prepend-icon="mdi-key"
                label="Contraseña"
                type="password"
                autocomplete="on"
                :rules="[$rules.obligatoria('Contraseña')]"
              ></v-text-field>

              <v-btn @click="validateForm()" primary large block color="primary"
                >Ingresar</v-btn
              >
            </v-form>
          </v-card-text>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "auth-Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async authenticate() {
      try {
        let response = await this.$axios.post("/api/auth/login", this.form);
        this.$auth.startSession(
          response.payload.user,
          response.payload.access_token
        );
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    },

    async getUser() {
      try {
        let res = await this.$axios.get("/api/auth/auth_user");
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },

    validateForm() {
      if (this.$refs.forLogin) {
        if (this.$refs.forLogin.validate()) {
          this.authenticate();
        } else {
          console.log("no valido");
        }
      }
    },
  },
};
</script>
