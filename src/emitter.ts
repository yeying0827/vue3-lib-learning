// const emitter = {
//     on: function (name: string, fn: (a?: unknown, ...rest: unknown[]) => void) {
//         console.log(name);
//     },
//     emit: function (name: string, data?: unknown) {
//         console.log(name);
//     }
// }
//
// export {
//     emitter
// }
import mitt from "mitt";
import {FormItem} from "./components/form/type";

export type Events = {
    validate: undefined,
    addFormItem: FormItem
}
export const emitter = mitt<Events>();
