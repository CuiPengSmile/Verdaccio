<template>
  <div :class="$style.root">
    <global-modal
      ref="modal"
      :top="8"
      :left="8"
      :width="400"
      :height="500"
      :autoClose="false"
      :zIndexDeviation="1"
      :title="title"
      @onClose="onModalClose"
    >
      <template #icon>
        <div :class="$style.icon">icons</div>
      </template>
      <template #tools>
        <div>tools</div>
      </template>
      <template #default>
        <div :class="$style.content">占位内容</div>
      </template>
    </global-modal>
  </div>
</template>

<script>
import { GlobalModal } from "@xy/ui-dialog";

export default {
  components: { GlobalModal },
  props: {
    title: {
      type: String,
      default: "this is modal",
    },
  },
  computed: {},
  mounted() {},
  data() {
    return {};
  },
  methods: {
    onCancel() {
      this.$refs.modal.close();
    },
    onShow() {
      this.$refs.modal.show();
    },
    onModalClose() {
      console.log("向父组件传值");
    },
  },
};
</script>

<style lang="scss" module>
:global {
  #globalModal {
    --ui-modal-header-background-color: #000000;
    --ui-modal-header-color: #ffffff;
    --ui-modal-header-height: 48px;
    --ui-modal-header-font-size: 16px;
    --ui-modal-header-title-left-margin: 16px;
  }
}
.root {
  width: 100%;
  height: 100%;
}
</style>
