import {TreeNode} from "./TreeNode";
import {createAction} from "./Action";
import {/*nodeEach,*/ nodeMap, transitionObjectKey} from "../util";

export class Tree {
    constructor(data, defaultNodeKey, defaultNodeValue) {
        this.isUpdateRaw = true
        this.raw = data;
        this.injectAction = createAction(this);
        this.root = new TreeNode(
            Date.now(),
            'root',
            [],
            defaultNodeValue,
            this.injectAction
        );
        this.defaultNodeKey = Object.assign(
            {
                id: 'id',
                label: 'label',
                childNodes: 'childNodes',
                isChecked: 'isChecked',
                isVisible: 'isVisible',
                isExpanded: 'isExpanded'
            },
            defaultNodeKey
        );
        this.defaultNodeValue = Object.assign({}, defaultNodeValue);
        this.initRoot();
    }

    // getParentRawNode(rawNode) {
    //     let parentNode = null
    //     const { childNodes } = this.defaultNodeKey
    //     nodeEach(
    //         { [childNodes]: this.raw },
    //         (current, parent) => {
    //             if (current === rawNode || current.id === rawNode.id) {
    //                 parentNode = parent
    //                 return true
    //             }
    //         },
    //         { childKey: childNodes }
    //     )
    //     return parentNode
    // }

    /*
    * 获取所有展开的节点
    * @return 节点id数组
    * */
    get expanded() {
        const t = {}
        this.root.depthEach((node) => {
            node.isExpanded && (t[node.id] = true)
        })
        return Object.keys(t)
    }

    set expanded(v) {
        this.setExpandedByIdList(v, true)
    }

    /*
    * @param target 树节点
    * @param rawNode target新增的子节点
    * */
    appendRawNode(target, rawNode) {
        const { childNodes } = this.defaultNodeKey; // 子节点对应的属性名
        if (!this.isUpdateRaw) {
            return
        }
        let rawChild = target.data.raw ? target.data.raw[childNodes] : this.raw; // 当前节点是否有对应的原始数据，有则获取原始数据的子节点，否则直接获取树的原始数据作为子节点（？）
        if (!rawChild) { // 如果原始数据不存在子节点，就将子节点初始化为空数组
            target.data.raw[childNodes] = [];
            rawChild = target.data.raw[childNodes];
        }
        rawChild.push(rawNode); // 将新的原始节点数据插入到子节点数据
    }

    /*
    * @param target 树节点
    * @param index 新增子节点插入的位置下标
    * @param rawNode target新增的子节点
    * */
    insertRawNode(target, index, rawNode) {
        const { childNodes } = this.defaultNodeKey;
        if (!this.isUpdateRaw) {
            return
        }
        let rawChild = target.data.raw ? target.data.raw[childNodes] : this.raw;
        if (!rawChild) {
            target.data.raw[childNodes] = [];
            rawChild = target.data.raw[childNodes];
        }
        rawChild.splice(index, 0, rawNode); // 将新的原始节点数据插入到子节点数组的指定下标位置
    }

    /*
    * @param target 树节点
    * @param index 待删除子节点的数组下标
    * */
    removeChildRawNode(target, index) {
        const { childNodes } = this.defaultNodeKey;
        if (!this.isUpdateRaw) {
            return
        }
        let rawChild = target.data.raw ? target.data.raw[childNodes] : this.raw;
        if (!rawChild) {
            target.data.raw[childNodes] = [];
            rawChild = target.data.raw[childNodes];
        }
        rawChild.splice(index, 1); // 将某个节点的子节点数组中指定下标的元素删除
    }

    /*
    * 将原始节点转换为TreeNode类型节点
    * */
    rawNodeToTreeNode(rawNode) {
        const { childNodes } = this.defaultNodeKey;
        return nodeMap(
            rawNode, // 原始节点
            (_node, node) => {
                // 对象某些键转换
                const handledNode = transitionObjectKey(_node, this.defaultNodeKey)
                // debugger
                const treeNode = TreeNode.create(
                    Object.assign(
                        {},
                        this.defaultNodeValue,
                        { data: { raw: node }, interceptHandler: this.injectAction },
                        handledNode,
                        { childNodes: [] }
                    )
                )
                return treeNode
            },
            { childKey: childNodes, mapChildKey: 'childNodes' }
        )
    }

    /*
    * 根据idList，设置指定id的节点的展开状态
    * */
    setExpandedByIdList(idList, value) {
        this.root.depthEach((node) => {
            if (idList && idList.indexOf(node.id) !== -1) {
                node.expand(value)
            }
        })
    }

    /*
    * 初始化根节点
    * */
    initRoot() {
        this.isUpdateRaw = false
        this.root.childNodes = [];
        this.root.append(...this.raw);
        this.isUpdateRaw = true
    }

    /*
    * 展开全部节点
    * */
    expandAll() {
        this.root.depthEach((node) => {
            if (node.isLeaf) {
                node.expand(true)
            }
        })
    }
}
