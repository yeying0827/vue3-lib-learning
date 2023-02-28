import {getCurrentInstance, ComponentInternalInstance} from "vue";

export function useGlobalConfig() {
    const instance: ComponentInternalInstance | null = getCurrentInstance();
    if (!instance) {
        console.log('useGlobalConfig必须在setup里使用');
        return;
    }
    return instance.appContext.config.globalProperties.$AILEMENTE || {};
}
