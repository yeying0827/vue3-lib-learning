import {App} from 'vue';
import Tree from './Tree.vue';

export default {
    install(app: App) {
        app.component(Tree.name, Tree);
    }
}
