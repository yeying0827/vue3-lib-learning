import Form from './Form.vue';
import FormItem from './FormItem.vue';
import Input from './Input.vue';
import {mount} from "@vue/test-utils";

describe('表单测试', () => {
    it('表单校验测试', () => {
        const data = {
            username: '',
            password: ''
        };
        const rules = {
            username: [
                { required: true, message: '请输入用户名' }
            ],
            password: [
                { required: true, message: '请输入密码' }
            ]
        };
        const userInput = mount(Input, {
            props: {
                modelValue: '',
                'onUpdate:modelValue': (e:string) => userInput.setProps({ modelValue: e })
            },
        });
        const userItem = mount(FormItem, {
            props: {
                label: '用户名',
                prop: 'username'
            },
            slots: {
                default: userInput
            }
        });
        const passwordInput = mount(Input, {
            props: {
                modelValue: '',
                'onUpdate:modelValue': (e:string) => passwordInput.setProps({ modelValue: e })
            },
        });
        const passwordItem = mount(FormItem, {
            props: {
                label: '密码',
                prop: 'password'
            },
            slots: {
                default: passwordInput
            }
        })
        const form = mount(Form, {
            props: {
                model: data,
                rules
            },
            slots: {
                default: [userItem, passwordItem]
            }
        });
        const comp = form.getCurrentComponent();
        const success = jest.fn();
        const failed = jest.fn();
        comp.exposed!.validate((valid: boolean) => {
            if (valid) {
                success();
            } else {
                failed();
            }
            expect(success).toHaveBeenCalled();
        });
        // expect(form).toBeTruthy();
    })
})
