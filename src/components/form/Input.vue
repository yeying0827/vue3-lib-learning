<template>
  <div class="el-input">
    <input type="text" :value="modelValue" @input="handleInput" class="el-input--inner">
  </div>
</template>

<script lang="ts">
export default {
  name: 'ElInput'
}
</script>
<script setup lang="ts">
// import {emitter} from "../../emitter";
import {inject} from "vue";
import {formItemKey} from './type';

defineProps<{
  modelValue?: string
}>();

let emits = defineEmits<{
  (e: "update:modelValue", value: string): void
}>();

const validate = inject(formItemKey)?.validate;

function handleInput(e: Event) {
  const input = e.target as HTMLInputElement
  emits('update:modelValue', input.value); // v-model
  // emitter.emit('validate'); // 有问题，会触发所有form-item的校验
  validate && validate();
}
</script>

<style lang="scss">
@import "../../styles/mixin";

@include b(input) {
  @include m(inner) {
    -webkit-appearance: none;
    background-color: #fff;
    border-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
  }
}
</style>
