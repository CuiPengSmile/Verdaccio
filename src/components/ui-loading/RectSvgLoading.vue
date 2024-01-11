<template>
  <div :class="$style.root">
    <rect-svg-loading :class="$style.rect"></rect-svg-loading>
  </div>
</template>

<script>
import { RectSvgLoading } from "@xy/ui-loading";

export default {
  components: { RectSvgLoading },
  props: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" module>
.rect {
  --ui-rect-svg-loading-stroke-color: #388cff;
}
</style>
