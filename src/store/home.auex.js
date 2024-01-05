export default ({ store }) =>
  store.registerModule(["application", "home"], {
    namespaced: true,
    state: {
      count: 1,
    },
    mutation: {
      count: (state, count) => {
        state.count = count;
      },
    },
    actions: {
      count: (context, count) => {
        context.commit("count", count);
        return count;
      },
    },
  });
