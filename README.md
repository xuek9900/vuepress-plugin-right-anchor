# vuepress-plugin-right-anchor

See [documentation](https://github.com/xuekai-china/vuepress-plugin-right-anchor).

> Right-anchor plugin for VuePress
> 在用 VuePress 编写的文档页面右侧添加 **锚点导航栏**

## 特性
  - 简化左侧边栏结构的同时不丢失页面内标题导航的功能。
  - 点击锚点标签页面滚动过度。
  - 页面滚动时对应锚点标签跟随高亮。

## 安装
```bash
yarn add vuepress-plugin-right-anchor -D
# or
npm i vuepress-plugin-right-anchor -D
```

## 使用
在 `.vuepress/config.js` 添加如下配置。 
```js
module.exports = {
  // ...
  plugins: [
    // ...
    [
      // plugin name
      'vuepress-plugin-right-anchor',
      // option
      {
        /*
          将当前页面的哪一层标题用在 right-anchor 展示
          值的指向含义与 themeConfig.sidebarDepth 一致
          https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F
        */
        showLevel: 1,
        // 在以下 path 的页面中不出现 right-anchor
        ignore: [
          '/',
          '/api/'
          // 更多...
        ]
      }
    ]
  ]
}
```
