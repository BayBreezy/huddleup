// import colors from "vuetify/es5/util/colors";
const { default: colors } = require("vuetify/es5/util/colors");

module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s",
    title: "MeetUp",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Stay In Touch" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "vue-plyr/dist/vue-plyr.css",
    "vue-slick-carousel/dist/vue-slick-carousel.css",
    "vue-slick-carousel/dist/vue-slick-carousel-theme.css",
    "~/assets/main.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/plyr.client.js", mode: "client" },
    { src: "~/plugins/peerjs.js", mode: "client" },
    "~/plugins/socket.client.js",
    "~/plugins/slick.client.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/toast",
    "@nuxtjs/dayjs",
  ],

  toast: {
    position: "top-center",
    duration: 3000,
    action: {
      text: "✖",
      onClick: (e, ts) => {
        ts.goAway(0);
      },
    },
    iconPack: "mdi",
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      name: "HuddleUp",
      author: "Behon Baker",
      description:
        "Video chat application that keeps you in touch with those who matter",
      theme_color: colors.deepPurple.darken2,
    },
    manifest: {
      lang: "en",
      name: "HuddleUp",
      short_name: "HuddleUp",
      author: "Behon Baker",
      theme_color: colors.deepPurple.darken2,
      description:
        "Video chat application that keeps you in touch with those who matter",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.deepPurple.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
