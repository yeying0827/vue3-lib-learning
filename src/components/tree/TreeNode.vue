<template>
  <div class="el-tree-node"
       :id="`TreeNode_${node.id}`"
       :aria-expanded="node.isExpanded"
       @click.stop="onClickNode"
  >
    <div class="el-tree-node__content">
      <span
          @click.stop="
          node.isLeaf ||
            (elTree.props.accordion ? node.collapse() : node.expand())
        ">{{node.isExpanded ? '收起': '展开'}}</span>
      <input
          type="checkbox"
          v-model="node.isChecked"
          @change="onChangeCheckbox"
      >
<!--      <el-node-content :node="node"></el-node-content>-->
      {{node.label}}
    </div>
    <div class="el-tree-node__children" v-show="node.isExpanded">
      <el-tree-node
          v-for="child in node.childNodes"
          :node="child"
          :key="child.id"
      ></el-tree-node>
    </div>
  </div>
</template>

<script>
import {defineComponent, inject} from "vue";
import ElNodeContent from './NodeContent.vue';
import {TreeNode} from './entity/TreeNode.js';

export default defineComponent({
  name: 'ElTreeNode',
  props: {
    node: TreeNode,
  },
  components: {
    ElNodeContent
  },
  setup(props, {emit}) {
    const elTree = inject('elTree');
    const onClickNode = (e) => {
      !elTree.props.expandOnClickNode || // 是否点击节点展开：是->继续走，否->结束
        props.node.isLeaf || // 是否叶子节点：是->结束，否->继续走
        (elTree.props.accordion ? props.node.collapse() : props.node.expand())

      !elTree.props.checkOnClickNode || // 是否点击节点选中：是->接续走，否->结束
        props.node.setChecked(undefined, elTree.props.checkStrictly);

      elTree.emit('node-click', props.node, e); // 触发事件node-click
      elTree.emit('current-change', props.node, e); // 触发事件current-change
      props.node.isExpanded // 节点是否展开：展开->触发事件node-expand，没展开->触发事件node-collapse
          ? elTree.emit('node-expand', props.node, e)
          : elTree.emit('node-collapse', props.node, e);
    }
    const onChangeCheckbox = (e) => {
      props.node.setChecked(undefined, elTree.props.checkStrictly);
      elTree.emit('check-change', props.node, e);
    }
    return {
      elTree,
      onClickNode,
      onChangeCheckbox
    }
  }
});
</script>
