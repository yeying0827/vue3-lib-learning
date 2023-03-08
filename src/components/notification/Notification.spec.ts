import Notification from "./Notification.vue";
import {flushPromises, mount} from "@vue/test-utils";

describe('通知组件', () => {
    it('渲染标题title', () => {
        const title = 'this is a title';
        const wrapper = mount(Notification, {
            props: {
                title
            }
        });
        expect(wrapper.get('.el-notification__title').text()).toContain(title);
    });

    it('渲染信息message', () => {
        const message = 'this is a message';
        const wrapper = mount(Notification, {
            props: {
                message
            }
        });
        expect(wrapper.get('.el-notification__message').text()).toContain(message);
    });

    it('位置渲染', () => {
        const position = 'bottom-right';
        const wrapper = mount(Notification, {
            props: {
                position
            }
        });
        expect(wrapper.find('.el-notification').classes()).toContain('right');
        expect(wrapper.vm.verticalProperty).toBe('bottom'); // 使用script setup会无法访问vm.verticalProperty，需要另外导出，故改为defineComponent定义
        // expect(wrapper.find('.el-notification').element.style.bottom).toBe(`0px`); // 访问不到style属性
    });

    it('位置偏移', () => {
        const verticalOffset = 50;
        const wrapper = mount(Notification, {
            props: {
                verticalOffset
            }
        });
        expect(wrapper.vm.verticalProperty).toBe('top'); // 使用script setup会无法访问vm.verticalProperty，需要另外导出，故改为defineComponent定义
        // expect(wrapper.find('.el-notification').element.style.top).toBe(`${verticalOffset}px`); // 访问不到style属性
    });

    it('set the showClose', () => {
        const showClose = true;
        const wrapper = mount(Notification, {
            props: {
                showClose
            }
        });
        expect(wrapper.find('.el-notification__close-button').exists()).toBe(true);
        expect(wrapper.find('.el-icon-close').exists()).toBe(true)
    });

    it('click close button', async() => {
        const showClose = true;
        const wrapper = mount(Notification, {
            props: {
                showClose
            }
        });
        const btn = wrapper.find('.el-notification__close-button');
        await btn.trigger("click");
        expect(wrapper.get('.el-notification').isVisible()).toBe(false);
    });

    it('auto close', async () => {
        jest.useFakeTimers();
        const wrapper = mount(Notification, {
            props: {
                duration: 1000
            }
        });
        jest.advanceTimersByTime(1000);
        await flushPromises();
        expect(wrapper.get('.el-notification').isVisible()).toBe(false);
    })
});
