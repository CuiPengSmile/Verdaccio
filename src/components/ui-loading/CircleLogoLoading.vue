<template>
  <div :class="$style.root">
    <circle-logo-loading
      :interval="2000"
      :detail="1"
      theme="dark"
      :scale="1"
      :delay="0"
      timeing-function="linear"
      :circle-size="48"
      :logo-size="26"
    />
  </div>
</template>

<script>
import { CircleLogoLoading } from "@xy/ui-loading";

export default {
  components: { CircleLogoLoading },
  props: {},
  data() {
    return { loadingVisiable: false };
  },
  methods: {},
};
</script>

<style lang="scss" module>
.root {
}
</style>
