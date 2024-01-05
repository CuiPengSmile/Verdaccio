export default ({ store }) =>
  store.registerModule(['application', 'left-control'], {
    namespaced: true,
    state: {
      leftPanelVisible: true
    },
    mutations: {
      setLeftPanelVisible: (state, visible) => {
        state.leftPanelVisible = visible;
      }
    }
  });
