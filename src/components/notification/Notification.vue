<template>
  <div>
    <div class="el-notification"
         :class="[horizontalClass]"
         :style="positionStyle"
         @click="onClickHandler"
         v-show="visible"
    >
      <div class="el-notification__title">{{title}}</div>

      <div class="el-notification__message">{{message}}</div>

      <button
          v-if="showClose"
          class="el-notification__close-button el-icon-close"
          @click="onCloseHandler"
      >×</button>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, getCurrentInstance, ref, defineComponent} from "vue";

interface Props {
  title?: string
  message?: string
  verticalOffset?: number
  type?: '' | 'success' | 'warning' | 'info' | 'error'
  position?: string
  showClose?: boolean
  duration?: number
}

export default defineComponent({
  name: 'ElNotification',
  props: {
    title: {type: String, default: ''},
    message: {type: String, default: ''},
    verticalOffset: {type: Number, default: 0},
    type: {type: String, validator: (val: string) => ['', 'success', 'warning', 'info', 'error'].indexOf(val) > -1, default: ''},
    position: {type: String, default: 'top-right'},
    showClose: {type: Boolean, default: true},
    duration: {type: Number, default: 4500}
  },
  emits: ['close', 'click'],
  setup(props, {emit}) {

    const instance = getCurrentInstance();
    const visible = ref(true);
    const verticalOffsetVal = ref(props.verticalOffset); // top或bottom的值

    const horizontalClass = computed(() => props.position!.endsWith('right')? 'right': 'left');
    const verticalProperty = computed(() => props.position!.startsWith('top')? 'top': 'bottom');

    const positionStyle = computed(() => ({[verticalProperty.value]: `${verticalOffsetVal.value}px`}));

    let timer: NodeJS.Timeout | null = null;
    function delayClose() {
      if (props.duration! > 0) {
        timer = setTimeout(() => {
          _close()
        }, props.duration)
      }
    }

    function onCloseHandler() {
      _close()
    }

    function onClickHandler() {
      emit("click", instance);
    }

    function _close() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clearTimeout(timer)
      emit('close', instance)
      visible.value = false
    }

    function close() {
      _close()
    }

    delayClose();

    return {
      visible,
      horizontalClass,
      verticalProperty,
      positionStyle,
      onClickHandler,
      onCloseHandler,
      close
    }
  }
})
</script>

<style lang="scss">
@import "../../styles/mixin";

@include b(notification) {
  position: fixed;
  right: 10px;
  top: 50px;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  overflow: hidden;
  text-align: left;

  &__close-button {
    position: absolute;
    top: -4px;
    right: 10px;
    font-size: 16px;
    line-height: 1.8;
    background-color: #fff;
    &:hover, &:focus {
      border-color: transparent;
      outline: none;
    }
  }
}
</style>
