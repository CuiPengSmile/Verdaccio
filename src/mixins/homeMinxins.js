import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers("application/home");

export default class {
  static get homeMinxin() {
    return {
      computed: {
        ...mapState["count"],
      },
      methods: {
        ...mapActions["setCount"],
      },
    };
  }
}
