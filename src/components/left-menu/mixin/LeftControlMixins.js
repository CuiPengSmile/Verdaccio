import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers(
  "application/leftControl"
);

export default class {
  static get leftControlMixin() {
    return {
      computed: mapState({
        leftPanelVisible: (state) => state.leftPanelVisible,
      }),
      methods: mapMutations(["setLeftPanelVisible"]),
    };
  }
}
