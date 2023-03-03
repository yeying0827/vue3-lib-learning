<template>
  <div class="el-form">
    <slot/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ElForm'
}
</script>
<script setup lang="ts">
import {PropType, provide, ref} from "vue";
import {emitter} from '../../emitter';
import {key, FormItem, FormType} from './type'
import {Rules} from 'async-validator';

const items = ref<FormItem[]>([]);
emitter.on("addFormItem", (item) => {
  items.value.push(item as FormItem);
});

const props = defineProps({
  model: {
    type: Object,
    required: true
  },
  rules: {
    type: Object as PropType<Rules>
  }
})

provide(key, {
  model: props.model,
  rules: props.rules
})

const o: FormType = {
  validate
}

defineExpose(o);

function validate(cb: (isValid: boolean) => void) {
  const tasks = items.value.map(item => item.validate());
  Promise.all(tasks)
  .then(() => cb(true))
  .catch(() => cb(false));
}
</script>

<style lang="scss">
@import "../../styles/mixin";

@include b(form) {
  margin-top: 20px;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 300px;
}
</style>
