<template>
  <div :class="$style.root">
    <queue-notify
      ref="notify"
      :right="8"
      :bottom="8"
      :zIndex="1"
      :notifyVisibleMaxCount="5"
      :notifyQueueMaxCount="10"
      :reverse="false"
    >
      <template #notify="{ item }">
        <button @click="onNotifyConfirm(item)">{{ item.id }}</button>
      </template>
    </queue-notify>
  </div>
</template>

<script>
import { QueueNotify } from "@xy/ui-dialog";

export default {
  components: {
    QueueNotify,
  },
  data() {
    return {};
  },
  methods: {
    onPushNotify() {
      console.log("push notify", this.$refs.notify.push({ id: Date.now() }));
    },
    onNotifyConfirm(item) {
      console.log("confirm notify", this.$refs.notify.confirm(item));
    },
  },
};
</script>

<style lang="scss" module>
.root {
}
</style>
