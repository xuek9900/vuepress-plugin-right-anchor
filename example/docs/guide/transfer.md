---
rightAnchor: 
  showDepth: 1
  expand:
    trigger: click
    clickModeDefaultOpen: false
  customClass: transfer-customClass
---

# 从 1.x 迁移

本文档将帮助你从 `soonspacejs 1.x` 版本升级到 `soonspacejs 2.x` 版本。

## 升级准备
准备工作只需要在原本项目中安装最新版本即可
```bash
yarn add soonspacejs@2.x.x -S
# or
npm i soonspacejs@2.x.x -S
```

## 有哪些不兼容

### 配置项
1. 配置项的名称发生了变化。(这是一个遗留已久的命名问题)
```js {4,11}
// 1.x
new SoonSpace({
  el: '#view',
  option: {},
  events: {}
})

// 2.x
new SoonSpace({
  el: '#view',
  options: {},
  events: {}
})
```
2. 不再兼容 `1.x` 早期版本的 `backgroundColor`、`backgroundAlpha` 字段，使用 [background.color、 background.alpha](./config.html#background) 替代。

### Api
1. `Poi、PoiNode` 所有的 `create` 类方法，参数 `info.scale` 由 `{ width: 1, height: 1 }` 改为 `{ x: 1, y: i, z: 1 }`。
```js {4,10}
// 1.x
ssp.createPoi({
  ...
  scale: { width: 1, height: 1 }
})

// 2.x
ssp.createPoi({
  ...
  scale: { x: 1, y: i, z: 1 }
})
```
2. 插件安装 `ssp.install` 改为插件注册 [ssp.registerPlugin](../api/pligin.html#registerplugin)。

完善中...

### 框架插件

1. [**vue-soonspace**](../plugin/vue-soonspace.html)

```bash
npm i vue-soonspace@2.x.x -S
# or
yarn add vue-soonspace@2.x.x -S
```

1. [**react-soonspace**](../plugin/react-soonspace.html)

```bash
npm i react-soonspace@2.x.x -S
# or
yarn add react-soonspace@2.x.x -S
```

### 功能插件

1. [**热力图插件（heat-map）**](../plugin/heat-map.html)

```bash
npm un @soonspacejs/heatmap -S
npm i @soonspacejs/plugin-heat-map -S

# or
yarn remove @soonspacejs/heatmap -S
yarn add @soonspacejs/plugin-heat-map -S
```

2. [**巡检控制器（patrol-controls）**](../plugin/patrol-controls.html)

```bash
npm un @soonspacejs/patrol-controls -S
npm i @soonspacejs/plugin-patrol-controls -S

# or
yarn remove @soonspacejs/patrol-controls -S
yarn add @soonspacejs/plugin-patrol-controls -S
```

3. [**对象操作控制器（transform-controls）**](../plugin/transform-controls.html)

```bash
npm un @soonspacejs/transform-controls -S
npm i @soonspacejs/plugin-transform-controls -S

# or
yarn remove @soonspacejs/transform-controls -S
yarn add @soonspacejs/plugin-transform-controls -S
```

### 平台协同插件

1. [**soonmanager-sync**](../plugin/soonmanager-sync.html)

```bash
npm un @soonspacejs/soonmanager-sync -S
npm i @soonspacejs/plugin-soonmanager-sync -S

# or
yarn remove @soonspacejs/soonmanager-sync -S
yarn add @soonspacejs/plugin-soonmanager-sync -S
```
