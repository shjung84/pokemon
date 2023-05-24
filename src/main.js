import "@/assets/css/normalize.css";
import "@/assets/css/style.scss";
import "@/assets/css/layout.scss";
import "@/assets/css/vue2-scrollbar.scss";
import "@/assets/css/tailwindcss.css";
import "element-ui/lib/theme-chalk/index.css";

import "@/assets/js/fontAwesomeIcon.js";

import Vue from "vue";
import axios from "axios";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueLodash from "vue-lodash";
import lodash from "lodash";

import VueScrollbar from "vue2-scrollbar";

import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import VCalendar from "v-calendar";

import mdiVue from "mdi-vue/v2";
import * as mdijs from "@mdi/js";

Vue.config.productionTip = false;

// Vue.use(axios);
Vue.prototype.$axios = axios;

Vue.use(VueLodash, { name: "ld", lodash: lodash });

Vue.use(VueScrollbar);
Vue.use(ElementUI, {
  locale,
  size: "small",
  zIndex: 3000,
});
Vue.use(VCalendar, {
  // componentPrefix: "vc",
});

Vue.use(mdiVue, {
  icons: mdijs,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
