<template>
  <div class="el-form-item">
    <label
      v-if="label">{{label}}</label>
    <slot/>
    <p v-if="error" class="error">
      {{error}}
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ElFormItem'
}
</script>
<script setup lang="ts">
import Schema from 'async-validator';
import {inject, onMounted, provide, ref} from "vue";
import {FormItem, key, formItemKey} from './type';
import {emitter} from '../../emitter';

const formData = inject(key); // 获取表单数据和配置

interface Props {
  label?: string
  prop?: string
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  prop: ''
});

const error = ref(""); // 错误

const o: FormItem = {
  validate,
};

defineExpose(o);

provide(formItemKey, {
  validate
});

onMounted(() => {
  if (props.prop) {
    // emitter.on("validate", () => { // 有问题，会触发所有form-item的校验
    //   validate();
    // });
    emitter.emit("addFormItem", o);
  }
});

function validate() {
  if (props.prop) {
    if (formData?.rules === undefined) {
      return Promise.resolve({result: true});
    } else {
      const rules = formData.rules[props.prop];
      const value = formData.model[props.prop];
      const schema = new Schema({[props.prop]: rules});
      return schema.validate({[props.prop]: value}, errors => {
        if (errors) {
          error.value = errors[0].message || "校验错误"
        } else {
          error.value = "";
        }
      });
    }
  }
  return Promise.resolve({result: true});
}
</script>

<style lang="scss">
@import "../../styles/mixin";
@include b(form-item) {
  margin-bottom: 22px;
  label {
    line-height: 1.2;
    margin-bottom: 5px;
    display: inline-block;
  }
  & .el-form-item {
    margin-bottom: 0;
  }
}
.error {
  color: red;
}
</style>
