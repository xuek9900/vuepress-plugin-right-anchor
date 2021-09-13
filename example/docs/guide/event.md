---
rightAnchor:
  expand:
    trigger: hover
---

# 场景事件

实例初始时定义场景可交互事件函数。
```js
const ssp = new SoonSpace({
  el: '#view',
  options: {},
  events: {
    // 鼠标点击模型
    modelClick(modelEvent) {
      console.log(modelEvent, modelEvent.target)
    },
    // 鼠标双击模型
    modelDblClick(modelEvent) {
      console.log(modelEvent, modelEvent.target)
    },
    // 鼠标右键点击模型
    modelRightClick(modelEvent) {
      console.log(modelEvent, modelEvent.target)
    },
    // 鼠标悬浮模型
    modelHover(modelEvent) {
      console.log(modelEvent, modelEvent.target)
    },
    // 鼠标悬浮模型后离开
    modelUnHover(model) {
      console.log(model)
    },
    // 鼠标点击 poi
    poiClick(poi) {
      console.log(poi)
    },
    // 鼠标双击 poi
    poiDblClick(poi) {
      console.log(poi)
    },
    // 鼠标右键点击 poi
    poiRightClick(poi) {
      console.log(poi)
    },
    // 鼠标悬浮 poi
    poiHover(poi) {
      console.log(poi)
    },
    // 鼠标点击场景且未相交到任何对象
    sceneClick(sceneClickEvent) {
      console.log(sceneClickEvent, sceneClickEvent.type)
    },
    // 鼠标点击拾取空间坐标
    selectPosition(position) {
      console.log(position)
    }
  }
})
```

<!-- modelClick -->
## modelClick
鼠标单击模型事件。
### 回调参数
#### modelEvent
  - **target**
    - **类型：** Sbm ｜ Model
    - **描述：** 事件选中的第一个模型。
  - **currentTarget**
    - **类型：** Mesh
    - **描述：** 触发该事件的模型子节点。
  - **intersects**
    - **类型：** intersect[]
      - intersect
        - model：Sbm ｜ Model
        - sourceData：object
    - **描述：** 事件选中的所有数据。

## modelDblClick
鼠标双击模型事件。
### 回调参数
#### modelEvent
[同 modelClick](#modelevent)

## modelRightClick
鼠标右键点击模型事件。
### 回调参数
#### modelEvent
[同 modelClick](#modelevent)

## modelHover
鼠标悬浮在模型上事件。
### 回调参数
#### modelEvent
[同 modelClick](#modelevent)
## modelUnHover
鼠标悬浮模型后离开事件。
### 回调参数
#### model
  - **类型** Sbm | Model
  - **描述** 上次鼠标悬浮后又离开的模型对象

## poiClick
鼠标单击 `poi` 事件。
### 回调参数
#### poi
  - **类型：** Poi
  - **描述：** 单击选中的 `Poi` 对象

## poiDblClick
双击 `poi` 事件。
### 回调参数
#### poi
[同 poiClick](#poi)

## poiRightClick
单击 `poi` 事件。
### 回调参数
#### poi
[同 poiClick](#poi)
## poiHover
鼠标悬浮在 `poi` 上事件。
### 回调参数
#### poi
[同 poiClick](#poi)

## sceneClick
  场景点击（单击、双击、右键点击）并且未相交到任何对象时触发。
### 回调参数
#### sceneClickEvent
  - **type** 
    - 类型: [SceneEventType](./types.html#sceneeventtype)
    - 描述: 触发的点击事件类型
  - **event**
    - 类型: [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent) ｜ [TouchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent)
    - 描述: 触发时传递的原生事件
  
## selectPosition
  通过点击在空间内获取坐标点。
### 回调参数
#### position
  - **类型：** [Position](./types.html#position)
  - **描述：** 射线与空间对象相交坐标点。
