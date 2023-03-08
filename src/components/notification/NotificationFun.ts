import {ComponentInternalInstance, ComponentOptions, h, isVNode, render} from "vue";
import NotificationComponent from "./Notification.vue";

const MOUNT_COMPONENT_REF = 'el_component'
const COMPONENT_CONTAINER_SYMBOL = Symbol('el_component_container')

let zIndex = 2000;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function createComponent(Component, props, children) {
    // 调用h函数创建vnode
    const vnode = h(Component, {...props, ref: MOUNT_COMPONENT_REF}, children);
    const container = document.createElement('div');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vnode[COMPONENT_CONTAINER_SYMBOL] = container;
    render(vnode, container);
    return vnode.component;
}

/**
 * 合并配置项
 * */
function mergeProps(options: ComponentOptions  | string) {
    if (typeof options === 'string' || isVNode(options)) {
        const defaultOptions: ComponentOptions = {};
        defaultOptions.message = options;
        return defaultOptions;
    }
    const position = options.position || 'top-right';
    const verticalOffset = options.verticalOffset || 0;
    const defaultOptions: ComponentOptions = {
        position,
        verticalOffset
    };
    const userOnClose = options?.onClose;
    delete options?.onClose;
    defaultOptions.onClose = (instance: ComponentInternalInstance) => {
        closeNotification(instance);
        if (userOnClose) userOnClose(instance.proxy);
    }
    const userOnClick = options?.onClick;
    delete options?.onClick;
    defaultOptions.onClick = (instance: ComponentInternalInstance) => {
        if (userOnClick) userOnClick(instance.proxy);
    }

    return Object.assign({}, defaultOptions, options);
}

function closeNotification(instance: ComponentInternalInstance) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // instance.proxy.close(); // Notification组件会调用close
    removeInstance(instance);
}

/*
* 合并配置项，并传递给createNotification方法用于创建组件
* 返回类型为 组件对应的公开实例
* */
export function NotificationFun(options: ComponentOptions | string) {
    return createNotification(mergeProps(options));
}

/*
* @return ComponentPublicInstance || null
* */
function createNotification(options: ComponentOptions) {
    const instance = createNotificationByOpts(options);
    setZIndex(instance!);
    addToBody(instance!);
    addInstance(instance!);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return instance!.proxy;
}

/*
* @return ComponentInternalInstance || null
* */
function createNotificationByOpts(opts: ComponentOptions) {
    if (isVNode(opts.message)) {
        return createComponent(NotificationComponent, opts, () => opts.message)
    }

    return createComponent(NotificationComponent, opts, null);
}

function setZIndex(instance: ComponentInternalInstance) {
    instance.vnode.el!.style.zIndex = zIndex;
    zIndex ++;
}

function addToBody(instance: ComponentInternalInstance) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.body.append(instance.vnode.el);
}

// 数组元素为组件内部实例
const instanceList: ComponentInternalInstance[] = [];

function addInstance(instance: ComponentInternalInstance) {
    instanceList.push(instance);
}

function removeInstance(instance: ComponentInternalInstance) {
    instanceList.splice(getIndexByInstance(instance), 1)
}

function getIndexByInstance(instance: ComponentInternalInstance) {
    return instanceList.findIndex((i) => i.uid == instance.uid)
}

;['success', 'warning', 'info', 'error'].forEach(type => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    NotificationFun[type] = (options) => {
        if (typeof options === 'string' || isVNode(options)) {
            options = {
                message: options
            }
        }
        options.type = type
        return NotificationFun(options);
    }
});

NotificationFun.closeAll = () => {
    instanceList.forEach(instance => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        instance.proxy.close();
        removeInstance(instance);
    })
}
