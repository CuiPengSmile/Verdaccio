export default ({ store }) =>
  store.registerModule(["application", "syncNodeTree"], {
    namespaced: true,
    state: {
      selNodeCode: "", // 选中节点-给前端回显的参数。只放当前选中节点。
    },
    mutations: {
      setSelNodeCode: (state, code) => {
        state.selNodeCode = code;
      },
    },
  });
