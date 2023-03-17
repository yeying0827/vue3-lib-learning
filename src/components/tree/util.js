function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray(value) {
    return value instanceof Array
}

// export function nodeEach(
//     target,
//     callback = () => false,
//     { childKey = 'children', root = null } = {}
// ) {
//     const dfs = (node) => {
//         if (!isObject(node) || isArray(node)) {
//             return
//         }
//
//         const child = node[childKey] || []
//
//         for (let i = 0; i < child.length; i++) {
//             const _node = child[i]
//             if (callback(_node /* Current */, node /* Parent */)) return
//             dfs(_node)
//         }
//     }
//     if (callback(target /* Current */, root /* Parent */)) return
//     return dfs(target)
// }

/*
* 对象（树节点）深度遍历
* @param target 原始节点
* @param callback 回调函数
* @param childKey 原始节点的子节点对应属性名
* @param mapChildKey 树节点的子节点对应属性名
* @return 一个TreeNode类型的节点
* */
export function nodeMap(
    target,
    callback = () => null,
    { childKey = 'children', mapChildKey = 'children' } = {
        /* TreeNode */
    }
) {
    const dfs = (node) => {
        // 如果node是对象类型，且node的children属性不是数组类型
        if (isObject(node) && !isArray(node[childKey])) {
            // 根据node节点克隆一个新节点
            // 并调用回调函数
            const _cloneNode = { ...node }
            return callback(_cloneNode, node, true)
        }
        const cloneNode = { ...node }
        const newNode = callback(cloneNode, node, false) // TreeNode类型的node
        if (typeof newNode[childKey] !== 'undefined') delete newNode[childKey]
        newNode[mapChildKey] = []
        for (let i = 0; i < node[childKey].length; i++) { // 递归遍历子节点
            const _node = node[childKey][i]
            const ret = dfs(_node)
            ret.parent = newNode
            newNode[mapChildKey].push(ret)
        }

        return newNode
    }

    return dfs(target)
}

/*
* 对象某些键转换。
* 例子：
* obj = {name: 'lily'}  keyMap={label: 'name'}
* 操作后变为obj = {label: 'lily'}
* */
export function transitionObjectKey(obj, keyMap = {}) {
    const transitionKeyList = Object.keys(keyMap) // 遍历keyMap的所有属性名
    transitionKeyList.forEach((key) => {
        // 如果keyMap某个属性名和属性值不一致
        // obj上key键的值，设置为keyMap[key]键的值
        // 并删除obj的keyMap[key]属性
        if (key !== keyMap[key]) {
            obj[key] = obj[keyMap[key]]
            delete obj[keyMap[key]]
        }
    })
    return obj
}

export const extractMethods = (obj, methods) => {
    const methodList = {}
    methods.forEach((method) => {
        methodList[method] = obj[method].bind(obj)
    })
    return methodList
}
