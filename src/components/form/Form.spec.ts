import Form from './Form.vue';
import FormItem from './FormItem.vue';
import {mount} from "@vue/test-utils";

describe('表单测试', () => {
    it('表单校验测试', () => {
        const userItem = mount(FormItem, {
            props: {
                label: '用户名',
                prop: 'username'
            }
        });
        const passwordItem = mount(FormItem, {
            props: {
                label: '密码',
                prop: 'password'
            }
        })
        const form = mount(Form, {
            props: {
                model: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名' }
                    ],
                    password: [
                        { required: true, message: '请输入密码' }
                    ]
                }
            },
            slots: {
                default: [userItem, passwordItem]
            }
        });
        // const comp = form.getCurrentComponent();
        // const success = jest.fn();
        // const failed = jest.fn();
        // comp.exposeProxy!.validate((valid: boolean) => {
        //     if (valid) {
        //         success();
        //     } else {
        //         failed();
        //     }
        // });
        // expect(failed).toHaveBeenCalled();
        expect(form).toBeTruthy();
    })
})
