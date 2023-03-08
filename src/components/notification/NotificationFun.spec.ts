import { NotificationFun } from './NotificationFun';

describe('通知函数式组件', () => {
    afterEach(async () => {
        NotificationFun.closeAll()
    });

    it('函数创建组件', () => {
        const instance = NotificationFun('foo');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(instance.close).toBeTruthy();
    });

    it('默认配置', () => {
        const instanceProxy = NotificationFun('foo');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(instanceProxy.$props.position).toBe('top-right');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(instanceProxy.$props.message).toBe('foo');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(instanceProxy.$props.duration).toBe(4500);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(instanceProxy.$props.verticalOffset).toBe(0);
    });

    it('字符串信息', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const instanceProxy = NotificationFun.info('foo');
        expect(instanceProxy.$props.type).toBe('info');
        expect(instanceProxy.$props.message).toBe('foo');
    });

    it('成功信息', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const instanceProxy = NotificationFun.success('foo');
        expect(instanceProxy.$props.type).toBe('success');
        expect(instanceProxy.$props.message).toBe('foo');
    });
})
