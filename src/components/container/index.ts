import {App} from 'vue';

import Container from "./Container.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Aside from "./Aside.vue";
import Main from "./Main.vue";

export default {
    install(app: App) {
        app.component(Container.name, Container);
        app.component(Header.name, Header);
        app.component(Footer.name, Footer);
        app.component(Aside.name, Aside);
        app.component(Main.name, Main);
    }
}
