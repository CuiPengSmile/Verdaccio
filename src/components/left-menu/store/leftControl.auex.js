export default ({ store }) =>
  store.registerModule(["application", "leftControl"], {
    namespaced: true,
    state: {
      leftPanelVisible: true,
    },
    mutations: {
      setLeftPanelVisible: (state, visible) => {
        state.leftPanelVisible = visible;
      },
    },
  });
