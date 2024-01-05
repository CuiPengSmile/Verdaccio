<template>
  <div :class="$style.root" @click="onClick">
    <font-awesome :icon="icon"></font-awesome>
  </div>
</template>

<script>
import { FontAwesome } from "@xy/ui-fontawesome-icon";
import genterProxy from "@/utils/genterProxy";
import LeftControlMixins from "./mixin/LeftControlMixins";

export default {
  components: { FontAwesome },
  props: {},
  mixins: [LeftControlMixins.leftControlMixin],
  computed: {
    icon() {
      return this.leftPanelVisible ? "fa-angle-left" : "fa-angle-right";
    },
  },
  mounted() {
    console.warn(this.leftPanelVisible);
  },
  data() {
    return {};
  },
  methods: {
    onClick() {
      console.log("this.leftPanelVisible===>" + this.leftPanelVisible);
      genterProxy.toggleLeftPanel();
    },
  },
};
</script>

<style lang="scss" module>
@import "@/styles/common";

.root {
  @include center;

  font-size: 14px;
  color: white;
  background-color: #4b74b9;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  cursor: pointer;
}
</style>
