import { executor } from "@/utils/require";

export default (payload) => {
  payload.store.registerModule("application", {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {},
    getters: {},
  });
  // 加载src/page-vuex录下所有.auex.js文件, 各.auex.js文件作为application的子模块入口, 注册自身
  executor(require.context("@/components", true, /\.auex\.js$/), payload);
};
