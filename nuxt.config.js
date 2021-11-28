import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - PVT-FRONT',
    title: 'PVT-FRONT',
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
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    /**
      When issuing a request to baseURL that needs to pass authentication headers to
      the backend, 'credentials' should be set to 'true'
    */
    credentials: true, // default value of withCredentials is fale

    // This is where to hit the server
    baseUrl: 'http://localhost:8989'
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    strategies: {
      laravelSanctum: {
            provider: 'laravel/sanctum',
            url: 'http://localhost:8989',
            endpoints: {
              login: { url: '/api/auth/login', method: 'post' }
            },
            tokenRequired: false,
            tokenType: false
          }
      },
      localStorage: false,
      router: {
        middleware: ['auth']
      },
    },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
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
          primary: '#263238',
          secondary: '#455A64',
          tertiary: '#CFD8DC',
          accent: '#8D6E63',
          error: '#DD2C00',
          warning: '#FFAB00',
          info: '#0288D1',
          success: '#43A047',
          danger: '#ff6d00',
          normal: '#757575',
          teal:'#29617b',
          background: '#EDF2F4'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
