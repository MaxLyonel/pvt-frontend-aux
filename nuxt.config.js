import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: process.env.APP_TITLE || '',
    title: process.env.APP_TITLE || '',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  router: {
    middleware: ['rutas']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js', mode: 'client' },
    { src: '~/plugins/auth.js' },
    { src: '~/plugins/utils.js' },
  ],
  //para vee-validate
  build: {
    transpile: ['vee-validate']
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules 
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/moment'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // This is where to hit the server
    baseUrl: process.env.BASE_URL,
    //credentials: true
  },


  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/css/variables.scss'],
    //defaultAssets: false,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#0AADB3',
          secondary: '#455A64',
          tertiary: '#CFD8DC',
          accent: '#8D6E63',
          error: '#DD2C00',
          warning: '#FFAB00',
          info: '#0288D1',
          success: '#43A047',
          danger: '#ff6d00',
          normal: '#757575',
          teal: '#29617B',
          background: '#EDF2F4'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
