<template>
  <div class="el-tree">
    <el-tree-node
        v-for="child in tree.root.childNodes"
        :node="child"
        :key="child.id"
    ></el-tree-node>
  </div>
</template>

<script>
import {defineComponent, getCurrentInstance, reactive, provide, onMounted, watchEffect} from "vue";
import ElTreeNode from "./TreeNode.vue";
import { Tree } from './entity/Tree.js';
import { extractMethods } from './util.js'

export default defineComponent({
  name: 'ElTree',
  props: {
    data: {type: Array, default: () => []},
    defaultNodeKey: {
      type: Object,
      default: () => ({
        id: 'id',
        label: 'label',
        childNodes: 'childNodes',
        isAsync: 'isAsync',
        isChecked: 'isChecked',
        isExpanded: 'isExpanded',
        isLeaf: 'isLeaf'
      })
    },
    asyncLoadFn: Function,
    async: {type: Boolean, default: false},
    defaultExpandAll: Boolean,
    expanded: Array /* model */,
    accordion: Boolean,
    checkStrictly: Boolean,
    expandOnClickNode: { type: Boolean, default: true },
    checkOnClickNode: Boolean,
  },
  components: {
    ElTreeNode
  },
  emits: [
    'node-click',
    'node-contextmenu',
    'check-change',
    'check',
    'current-change',
    'node-expand',
    'node-collapse',
    'update:checked',
    'update:expanded'
  ],
  setup(props) {
    const instance = getCurrentInstance();
    const tree = new Tree(props.data, props.defaultNodeKey, {
      asyncLoadFn: props.asyncLoadFn,
      isAsync: props.async
    });
    const state = reactive({
      tree
    });
    provide('elTree', instance);
    useExpand(props, state); // 初始化展开状态，并监听展开事件

    return {
      ...extractMethods(state.tree, [
        'initRoot',
        // 'getParentRawNode',
        'expandAll'
      ]),
      tree: state.tree,
      root: state.tree.root
    }
  }
})

function useExpand(props, state) {
  const instance = getCurrentInstance()
  const { emit } = instance

  if (props.defaultExpandAll) {
    state.tree.expandAll();
  }

  watchEffect(() => {
    emit('update:expanded', state.tree.expanded); // 向组件外部通知 update:expanded 事件
  });

  watchEffect(() => {
    state.tree.setExpandedByIdList(props.expanded, true);
  });

  onMounted(() => {
    state.tree.root.expand(true);
  });
}
</script>
