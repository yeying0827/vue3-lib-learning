import { defaultTheme } from 'vuepress';

module.exports = {
    theme: defaultTheme({
        title: 'Element3',
        description: 'vuepress 搭建的Element3文档',
        logo: '/favicon.ico',
        navbar: [
            {
                link: '/',
                text: '首页'
            },
            {
                link: '/install',
                text: '安装'
            }
        ],
        sidebar: [
            {
                link: '/install',
                text: '安装'
            },
            {
                link: '/button',
                text: '按钮'
            }
        ]
    }),
};
