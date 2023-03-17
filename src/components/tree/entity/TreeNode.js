const typeFlag = Symbol('TREE_NODE')

export class TreeNode {
    constructor(
        id,
        label,
        childNodes = [],
        {
            parent= null,
            isChecked = false,
            isIndeterminate = false,
            isExpanded = false,
            isLeaf = false,
            data = {},
            asyncLoadFn = () => null
        } = {},
        {
            insertChild = null,
            appendChild = null,
            removeChild = null
        } = {}
    ) {
        this.id = id || label
        this.label = label
        this.parent = parent
        this.childNodes = childNodes
        this.isChecked = isChecked
        this.isIndeterminate = isIndeterminate
        this.isExpanded = isExpanded

        this.data = data // Additional data carried by the node
        this.isLeaf = isLeaf

        this.asyncLoadFn = asyncLoadFn // (currentNode, resolveFn) async load child node

        this.interceptHandler = {
            insertChild,
            appendChild,
            removeChild
        }

        this.updateChildParent()
        this.updateChildChecked()
        this.updateExpandedState()
    }

    get root() {
        // readonly
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let root = this
        this.upwardEach((node) => {
            root = node
        })
        return root
    }

    // get isRoot() {
    //     // readonly
    //     return this.root === this
    // }

    /*
    * 是否是叶子节点
    * */
    get isLeaf() {
        return this.childNodes.length === 0;
        // return this.isAsync
        //     ? this.asyncState === 'loaded' && this.childNodes.length === 0
        //     : this.childNodes.length === 0
    }

    set isLeaf(v) {
        // if (v) this.asyncState = 'loaded'
    }

    get type() {
        return typeFlag;
    }

    /*
    * 设置子节点的parent属性
    * */
    updateChildParent() {
        this.childNodes.forEach((node) => {
            node.parent = this
        })
    }

    /*
    * 同步更新子节点的选中状态
    * */
    updateChildChecked() {
        if (this.isChecked) {
            this.setChildChecked(true)
        }
    }

    setChildChecked(value) {
        this.childNodes.forEach((node) => (node.isChecked = value))
    }

    /*
    * 更新展开状态：
    * 如果子节点中存在isExpanded属性为true的节点，更新当前节点的isExpanded属性为true
    * */
    updateExpandedState() {
        const childNodes = this.childNodes
        for (let i = 0; i < childNodes.length; i++) {
            const node = childNodes[i]
            if (node.isExpanded) {
                this.isExpanded = true
                return
            }
        }
    }

    /*
    * 将nodes数组中的节点展开子节点
    * */
    append(...nodes) {
        nodes.forEach(node => {
            this.appendChild(node);
        });
        return true;
    }

    /*
    * 展开node的子节点：
    * 将原始节点转化为TreeNode类型的节点，并推入当前节点的childNodes数组中
    * */
    appendChild(node) {
        if (this.interceptHandler.appendChild) { // 将原始节点转化为TreeNode类型节点
            const [_node] = this.interceptHandler.appendChild.apply(this, arguments);
            if (typeof _node !== 'undefined') node = _node;
        }
        if (!TreeNode.isType(node)) {
            return false;
        }
        node.parent = this;
        if (this.isChecked) {
            node.setChecked(true);
        }
        this.childNodes.push(node);
        return true;
    }

    /*
    * 设置树节点选中状态
    * */
    setChecked(value, strictly=false) {
        this.isIndeterminate = false; // 半选状态为false
        let _value = !this.isChecked; // 默认新选中状态为相反的状态
        if (typeof value !== 'undefined') {
            _value = value; // 如果传参不是undefined，新选中状态为传参的值
        }

        this.isChecked = _value;
        if (strictly) {
            // ...
        }

        return this.isChecked;
    }

    /*
    * Traverse upward
    * Params:
    * callback: Function – ( node:TreeNode ) if returns true then stop each, else not stop
    * { isSkipSelf = true }: {isSkipSelf?: any}
    * */
    upwardEach(callback, { isSkipSelf = true } = {}) {
        let current = isSkipSelf ? this.parent : this
        while (current) {
            if (callback(current)) {
                return
            }
            current = current.parent
        }
    }

    /*
    * 深度遍历子节点（递归）
    * */
    depthEach(upToDownCallBack = () => false, downToUpCallBack = () => false) {
        const dfs = (node, deep) => {
            if (!TreeNode.isType(node)) {
                return
            }
            for (let i = 0; i < node.childNodes.length; i++) {
                const _node = node.childNodes[i]
                if (upToDownCallBack(_node, node, deep)) return
                dfs(_node, deep + 1)
                if (downToUpCallBack(_node, node, deep)) return
            }
        }
        upToDownCallBack(this, this.parent, 0)
        dfs(this, 1) //
        downToUpCallBack(this, this.parent, 0)
    }

    /*
    * 展开树节点
    * */
    expand(value, ...extraNodes) {
        let _value = this.isExpanded;
        _value = typeof value === 'undefined' ? !_value : value; // 如果没有设定选中状态，就设置为相反状态
        this.isExpanded = _value;
        // this.upwardEach((node) => {
        //     node.expand(true)
        // })

        this.append(...extraNodes);
    }

    /*
    * 收起
    * */
    collapse() {
        const parent = this.parent
        if (!parent) {
            return
        }

        parent.childNodes.forEach((node) => {
            if (node === this) {
                node.expand()
            } else {
                node.expand(false)
            }
        })
    }

    /*
    * 判断传入的node是否为TreeNode类型
    * 判断条件为node存在type属性且值为typeFlag。
    * */
    static isType(node) {
        if (typeof node !== 'object') {
            return false;
        }

        return node.type === typeFlag
    }

    /*
    * 创建新的TreeNode实例并返回
    * */
    static create({ id, label, childNodes, interceptHandler, ...otherParams }) {
        return new TreeNode(id, label, childNodes, otherParams, interceptHandler)
    }
}
