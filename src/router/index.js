import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/home/HomePage.vue"),
    },
    {
      path: "*",
      name: "NotFound",
      component: () => import("@/views/common/NotFound.vue"),
    },
  ],
});
