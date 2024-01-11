<template>
  <div :class="$style.root">
    <div :class="$style.leftPanel">
      <enter-leave-panel :class="$style.leftFade" :visible="leftPanelVisible">
        <div :class="$style.leftContent">
          <!-- 操作按钮 -->
          <div :class="$style.modal" @click="globalDialog">GlobalDialog</div>
          <div :class="$style.queue" @click="queueNotify">QueueNotify</div>
          <div :class="$style.dragable" @click="dragableDialog">
            DragableDialog
          </div>
          <div :class="$style.message" @click="globalMessage">
            GlobalMessage
          </div>
          <div :class="$style.loading" @click="circleLogoLoading">
            CircleLogoLoading
          </div>
          <div :class="$style.loading" @click="onEnterLoading">
            ReentrantChaseLoading
          </div>
          <div :class="$style.loading" @click="rectSvgLoading">
            RectSvgLoading
          </div>
          <div :class="$style.tree">
            <SyncNodeTree ref="tree" />
          </div>
        </div>
        <!-- 组件显示 -->
        <div :class="$style.leftControl">
          <left-control />
        </div>
        <div :class="$style.loading">
          <reentrant-chase-loading ref="reentrant"></reentrant-chase-loading>
        </div>
      </enter-leave-panel>
    </div>
    <GlobalDialog ref="modal" />
    <QueueNotify ref="notify" />
    <DragableDialog ref="dragable" />
    <GlobalMessage ref="message" />
    <CircleLogoLoading v-if="circleLoading" />
    <ReentrantChaseLoading ref="reentrant" />
    <RectSvgLoading v-if="rectLoading" />
  </div>
</template>

<script>
import { EnterLeavePanel } from "@xy/ui-panel";
import { ReentrantChaseLoading, RectSvgLoading } from "@xy/ui-loading";
import GlobalDialog from "@/components/ui-dialog/GlobalModal.vue";
import GlobalMessage from "@/components/ui-dialog/GlobalMessage.vue";
import DragableDialog from "@/components/ui-dialog/DragableDialog.vue";
import CircleLogoLoading from "@/components/ui-loading/CircleLogoLoading.vue";
import QueueNotify from "@/components/ui-dialog/QueueNotify.vue";
import LeftControl from "@/components/left-menu/LeftControlIcon.vue";
import SyncNodeTree from "@/components/ui-tree/SyncNodeTree.vue";
import leftControlMinxins from "../../components/left-menu/mixin/LeftControlMixins";

export default {
  components: {
    LeftControl,
    EnterLeavePanel,
    GlobalDialog,
    GlobalMessage,
    QueueNotify,
    DragableDialog,
    CircleLogoLoading,
    RectSvgLoading,
    ReentrantChaseLoading,
    SyncNodeTree,
  },
  mixins: [leftControlMinxins.leftControlMixin],
  data() {
    return {
      list: [],
      circleLoading: false,
      rectLoading: false,
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    // Global-Dialog
    globalDialog() {
      this.$refs.modal.onShow();
    },

    // Queue-Notify
    queueNotify() {
      this.$refs.notify.onPushNotify();
    },

    // Dragable-Dialog
    dragableDialog() {
      this.$refs.dragable.onShow();
    },

    // Global-Message
    globalMessage() {
      this.$refs.message.onShowMessage("消息提示", "info");
    },

    // Circle-Logo-Loading
    circleLogoLoading() {
      this.circleLoading = !this.circleLoading;
    },

    // Reentrant-Chase-Loading
    onEnterLoading() {
      this.$refs.reentrant.enterLoading();
    },
    onLeaveLoading() {
      this.$refs.reentrant.leaveLoading();
    },

    // Rect-Svg-Loading
    rectSvgLoading() {
      this.rectLoading = !this.rectLoading;
    },

    // 获取数据列表
    getDataList() {
      this.$http
        .get("/mock/dataList")
        .then((res) => {
          let list = res.data.data || [];
          this.list = list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" module>
.root {
  width: 100%;
  height: 100%;
  .leftPanel {
    height: calc(100% - 16px);
    position: absolute;
    top: 8px;
    left: 0px;
    z-index: 10;
    height: 100%;
    .leftFade {
      width: 392px;
      height: calc(100% - 16px);
      --ui-enter-leave-panel-size: 384px;
      --ui-enter-leave-panel-space-size: 8px;
      .leftContent {
        width: 100%;
        height: 100%;
        background: url(~@/assets/images/bgs/aside.png) no-repeat;
        background-size: 100% 100%;
        color: #fff;
        font-size: 18px;
        line-height: 28px;
        cursor: pointer;
      }
      .leftControl {
        width: 19px;
        height: 60px;
        position: absolute;
        right: calc(0px - 19px);
        top: calc(50% - 10px);
      }
    }
  }
  .loading {
    position: relative;

    --sk-size: 32px;
    --sk-color: #388cff;
    --ui-loading-background-color: rgba(0, 0, 0, 0.15);
  }
}
</style>
