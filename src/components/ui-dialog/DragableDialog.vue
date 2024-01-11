<template>
  <div :class="$style.root">
    <dragable-dialog
      v-if="dialogVisible"
      :top="8"
      :right="8"
      :width="400"
      :height="500"
      :z-index="1"
      :global-drag="false"
      :drag-padding="8"
      :show-header="true"
      :show-closeIcon="false"
      :disabled="false"
      :document-control="true"
      :title="title"
      @onClose="onCancel"
    >
      <template #icon>
        <div>icon</div>
      </template>
      <template #default>
        <div :class="$style.dialog">dragable dialog</div>
      </template>
    </dragable-dialog>
  </div>
</template>

<script>
import { DragableDialog } from "@xy/ui-dialog";

export default {
  components: { DragableDialog },
  props: {
    title: {
      type: String,
      default: "这是一个标题",
    },
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    onCancel() {
      this.dialogVisible = false;
    },
    onShow() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" module>
.root {
}
</style>
