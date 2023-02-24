<template>
  <div class="el-aside"
  :style="{
    width
  }">
    <slot/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ElAside'
}
</script>
<script setup lang="ts">
import {withDefaults} from "vue";

interface Props {
  width?: string
}

withDefaults(defineProps<Props>(), {
  width: '300px'
});
</script>

<style lang="scss">
@import "../../styles/mixin";
@include b(aside) {
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
