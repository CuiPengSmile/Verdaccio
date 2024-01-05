import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import axios from "axios";
import VueVirtualScroller from "vue-virtual-scroller";
import "@/mock/mock";
import "@xy/ui-icon";
import "element-ui/lib/theme-chalk/index.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { init } from "./setup";
import Global from "./utils/global";

Vue.use(router);
Vue.use(ElementUI);
Vue.use(VueVirtualScroller);
Vue.config.productionTip = false;

const config = init();
Global.setGlobal(config); // 在Vue实例创建前设置Global

// 原型上绑定axios
Vue.prototype.$http = axios;

new Vue({
  router,
  ...config,
  render: (h) => h(App),
}).$mount("#app");
