<template>
  <div :class="$style.root">
    <div :class="$style.leftPanel">
      <enter-leave-panel :class="$style.leftFade" :visible="leftPanelVisible">
        <div :class="$style.leftContent">占位内容</div>
        <div :class="$style.leftControl">
          <left-control />
        </div>
      </enter-leave-panel>
    </div>
  </div>
</template>

<script>
import { EnterLeavePanel } from "@xy/ui-panel";
import LeftControl from "../../components/left-menu/LeftControlIcon.vue";
// import leftControlMinxins from "../../components/left-menu/mixin/LeftControlMixins";

export default {
  components: { LeftControl, EnterLeavePanel },
  // mixins: [leftControlMinxins.leftControlMixin],
  data() {
    return {
      list: [],
      leftPanelVisible: true,
    };
  },
  mounted() {
    this.getDataList();
    // console.log(this.rankList);
  },
  methods: {
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
}
</style>
