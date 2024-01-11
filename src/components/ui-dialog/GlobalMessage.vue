<template>
  <div :class="$style.root">
    <global-message
      ref="message"
      :showDetail="true"
      :delay="3000"
    ></global-message>
  </div>
</template>

<script>
import { GlobalMessage } from "@xy/ui-dialog";

export default {
  components: {
    GlobalMessage,
  },
  props: {},
  data() {
    return {};
  },
  methods: {
    onShowMessage(msg, type) {
      this.$refs.message.show(msg, type);
    },
  },
};
</script>

<style lang="scss" module>
.root {
}
</style>
