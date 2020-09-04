<h1 align="center">vuepress-plugin-right-anchor</h1>
<div align="center">

![Version](https://img.shields.io/github/package-json/v/xuekai-china/vuepress-plugin-right-anchor?style=flat-square)
![NPM](https://img.shields.io/npm/l/vuepress-plugin-right-anchor?style=flat-square)

</div>

English ｜[中文](./zh-README.md)

> Add **anchor navigation bar** to the right of the document page written in vuepress

## Features
  - Simplify the structure of the left sidebar without losing the function of Title navigation within the page。
  - Click anchor label page over scrolling。
  - When the page scrolls, the corresponding anchor label follows the highlight。

## Sample
  [soonspacejs document](http://www.xwbuilders.com:9018/soonspacejs/Docs/api/sbm.html)

## Install
```bash
yarn add vuepress-plugin-right-anchor -D
# or
npm i vuepress-plugin-right-anchor -D
```

## Use
Add in `.vuepress/config.js`
```js
module.exports = {
  // ...
  plugins: [
    // ...
    ['vuepress-plugin-right-anchor']
  ]
}
```

## Style
Add in `.vuepress/styles/palette.js`

```stylus
$rightAnchorBgColor = #fff
```

## Config
Add in `.vuepress/config.js`
```js
module.exports = {
  // ...
  plugins: [
    // ...
    [
      'vuepress-plugin-right-anchor',
      {
        showLevel: 1,
        ignore: [
          '/',
          '/api/'
          // more...
        ]
      }
    ]
  ]
}
```

## Param description

### showLevel

  Which level of title will be used in the right anchor display.
  The pointing meaning of the value is the same as [themeconfig.sidebardepth](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F).

  - Type: null | number
  - Default: null

### ignore

  Don't show right-anchor's page.

  - Type: array
  - Default: []