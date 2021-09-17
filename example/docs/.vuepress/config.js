module.exports = {

  lang: 'zh-CN',
  title: 'VuePress',
  description: 'Vue 驱动的静态网站生成器',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    navbar: [
      { text: '教程', link: '/guide/' },
    ],
    sidebarDepth: 1,
    sidebar: {
      '/guide/': [
        'start',
        'transfer',
        'types',
        'config',
        'event',
      ]
    }
  },

  plugins: [
    ['vuepress-plugin-right-anchor', {
      customClass: 'customClass',
      showDepth: 2,
      ignore: [
        '/'
      ],
      expand: {
        trigger: 'click',
        clickModeDefaultOpen: true
      }
    }],
  ]
}
