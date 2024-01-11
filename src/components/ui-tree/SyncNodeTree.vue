<template>
  <div :class="$style.root">
    <div :class="$style.treeBox">
      <sync-node-tree
        ref="nodeTree"
        :class="$style.syncTree"
        :get-nodes-data="getNodesData"
        :item-height="38"
        :indent-width="22"
        :line-visible="true"
      >
        <template #item="{ item }">
          <div
            :class="{
              [$style.nodeItem]: true,
              [$style.selNodeItem]: item.nodeCode === selNodeCode,
            }"
            @click="getSelNode(item)"
          >
            <div :class="$style.nodeName">
              {{ item.nodeName }}
            </div>
            <div :class="$style.deviceNum">[{{ item.deviceCount }}]</div>
          </div>
        </template>
      </sync-node-tree>
    </div>
  </div>
</template>

<script>
import { SyncNodeTree } from "@xy/ui-tree";
import { normalizeNode } from "@/utils/filter";
import syncNodeTree from "./mixin/syncNodeTree";

export default {
  components: { SyncNodeTree },
  mixins: [syncNodeTree.syncNodeTreeMinxins],
  props: {
    filter: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.handleLeftTreeData();
  },
  data() {
    return {
      list: [],
      getNodesData: () => {
        return this.list;
      },
    };
  },
  methods: {
    // 获取结构数据
    handleLeftTreeData() {
      this.$http
        .get("/syncNodeTree.json")
        .then((result) => {
          if (
            result.data.code == 0 &&
            Array.isArray(result.data.data["devicePageResDto"])
          ) {
            result.data.data["devicePageResDto"].forEach((node) => {
              normalizeNode(node);
            });
            this.getNodesData = () => result.data.data["devicePageResDto"];
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 节点选中
    getSelNode(node) {
      // 目录展开收起
      this.expandNode(node);
      // 反选。再次点击，取消页面选中。
      if (node["nodeCode"] === this.selNodeCode) {
        this.setSelNodeCode("");
        return;
      }
      this.setSelNodeCode(node["nodeCode"]);
    },

    // 节点展开收起
    expandNode(node) {
      this.$nextTick(() => {
        this.$refs.nodeTree.toggleNode(node);
      });
    },
  },
};
</script>

<style lang="scss" module>
.root {
  width: 100%;
  height: 100%;
  .treeBox {
    width: 100%;
    height: calc(100% - 64px);
    overflow: auto;
    padding: 16px;
    box-sizing: border-box;
    .syncTree {
      width: 100%;
      height: 100%;
      .nodeItem {
        font-size: 16px;
        font-weight: 400;
        color: #fff;
        line-height: 38px;
        padding-left: 6px;
        box-sizing: border-box;

        display: flex;
        align-items: center;
        .deviceNum {
          color: #388cff;
          padding-left: 5px;
        }
      }
      .selNodeItem {
        background: rgba(56, 140, 255, 0.1);
      }
    }
  }
}
</style>
