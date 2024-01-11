<template>
  <div :class="$style.loading">
    <reentrant-chase-loading
      ref="reentrant"
      @onEnterLoading="onEnterLoading"
      @onLeaveLoading="onLeaveLoading"
    ></reentrant-chase-loading>
  </div>
</template>

<script>
import { ReentrantChaseLoading } from "@xy/ui-loading";

export default {
  components: { ReentrantChaseLoading },
  props: {},
  data() {
    return {};
  },
  methods: {
    onEnterLoading() {
      this.$refs.reentrant.enterLoading();
    },
    onLeaveLoading() {
      this.$refs.reentrant.leaveLoading();
    },
  },
};
</script>

<style lang="scss" module>
.loading {
  height: 200px;
  width: 200px;
  margin: 8px;
  position: relative;

  --sk-size: 32px;
  --sk-color: #388cff;
  --ui-loading-background-color: rgba(0, 0, 0, 0.15);
}
</style>
