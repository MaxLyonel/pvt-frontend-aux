<template>
  <v-container>
    <v-row align="center" justify="center" class="pa-0 ma-0">
      <v-col cols="8">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-img
              src="https://www.la-razon.com/wp-content/uploads/2020/06/909f2199-cb9f-4ffe-ad46-7fc05968816f.jpg"
              aspect-ratio="4.6"
              max-height
            ></v-img>
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
            <v-form>
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
                @keyup.enter="focusPassword()"
                v-model="form.username"
                prepend-icon="mdi-account"
                label="Usuario"
                autocomplete="on"
                autofocus
              ></v-text-field>

              <v-text-field
                class="pl-5 pr-5 mb-3"
                @keyup.enter="focusPassword()"
                v-model="form.password"
                prepend-icon="mdi-key"
                label="Contraseña"
                type="password"
                autocomplete="on"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-btn @click="authenticate()" primary large block color="primary"
            >Ingresar</v-btn
          >
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
  computed: {},
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
  },
};
</script>
