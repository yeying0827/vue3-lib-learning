import {defineClientConfig} from '@vuepress/client';

import element3 from 'element3';
import "element3/lib/theme-chalk/index.css";

export default defineClientConfig({
    enhance({app, router, siteData}) {
        app.use(element3);
    },
    setup() {},
    rootComponents: []
})
