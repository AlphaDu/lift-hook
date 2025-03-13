<p align="right">
  <strong>
    <a href="README.md">English</a> |
    <a href="README-zh-cn.md">中文</a> |
    <a href="README-ru-ru.md">Русский</a> |
    <a href="README-th-th.md">ภาษาไทย</a> |
    <a href="README-vi-vn.md">Tiếng Việt</a>
  </strong>
  <br/>
  <sup><em>(Please contribute translations!)</em></sup>
</p>


## 安装

```sh
pnpm install lift-hook
```
## 鸣谢
受unstated-next启发并改进得来，
- [unstated-next](https://github.com/jamiebuilds/unstated-next)

## 核心概念

## VS Redux, Mobx, Zustand, jotai...

我们并不自诩比其他状态管理库更好，本质上说，这个库只有200行不到并且几乎只是unstated-next的改进版本，我们只是想基于这个库 推崇以下状态管理理念
- 非全局状态，而是基于局部状态(Layer)选择适合局部的状态管理方案并结合
- 组件生命周期逻辑和不应分离，而hooks正是为此而生

## 一图

### Layer

Layer 是 Lift Hook 的核心概念，本质是一个Context，Layer 的 Provider 可以被多个组件共享。为了更贴切的体现其特性，所以命名为layer
![Image](https://github.com/user-attachments/assets/b5113a61-df6a-4742-8dc5-57046e784efd)
