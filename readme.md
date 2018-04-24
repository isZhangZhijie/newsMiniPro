# 新闻微信小程序

## 目录

- [项目描述](#项目描述)
- [项目要点](#项目要点)
- [项目难点](#项目难点)
- [项目预览](#项目预览)

## 项目描述

一个类似今日头条的新闻类微信小程序，利用网易新闻的公开api获取新闻列表数据以及新闻详情数据

## 项目要点

- 使用微信web开发者工具进行开发。
- 使用wx.request进行数据请求。


- 使用swiper组件进行新闻内容切换。

## 项目难点

- 1.在使用swiper左右切换新闻内容时，在 bindchange 的事件回调函数中使用 setData 改变 current 值，有可能导致 setData 被不停地调用，即页面左右闪烁

  解决方案：在改变current 值前检测 source 字段来判断是否是由于用户触摸引起

## 项目预览

![](http://p7hpld38u.bkt.clouddn.com/newsList.png)

![](http://p7hpld38u.bkt.clouddn.com/newsDetail.png)

