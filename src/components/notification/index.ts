import {App} from 'vue';
import Notification from "./Notification.vue";

export default {
    install(app: App) {
        app.component(Notification.name, Notification);
    }
}
