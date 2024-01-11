import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers(
  "application/syncNodeTree"
);

export default class {
  static get syncNodeTreeMinxins() {
    return {
      computed: {
        ...mapState(["selNodeCode"]),
      },
      methods: {
        ...mapMutations(["setSelNodeCode"]),
      },
    };
  }
}
