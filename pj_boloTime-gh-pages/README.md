
## 波洛时报

![QRcode for boloTime](https://raw.githubusercontent.com/medifle/pj_boloTime/gh-pages/QRcode.png)

一个采用响应式设计的新闻站DEMO

DEMO地址: http://medifle.github.io/pj_boloTime

如何查看:

打开DEMO后, 请把浏览器窗口宽度调整至最小, 然后缓慢扩大窗口, 直至占满屏幕, 观察它是如何"响应"您的.

视频演示(高分辨率)

http://v.youku.com/v_show/id_XMTM1OTM4NjMzNg==.html

GIF演示(低分辨率)

![gif动态图演示, 想查看高分辨率请点击上面的视频](https://raw.githubusercontent.com/medifle/pj_boloTime/gh-pages/c16d45t03.gif)

### Features
------
* HTML语义化---W3C Validator测试通过
* 移动端, 桌面端全设备分辨率适配
* 基于现代浏览器设计的响应式. (Chrome移动端/桌面端, Safari移动端/桌面端, Firefox桌面端, 小米浏览器手机端测试通过; 兼容UC浏览器手机端, QQ浏览器手机端)
* 采用Flex弹性布局, 易维护, 灵活性强, 未来响应式设计的主流
* 充分挖掘的完全响应式: 各板块布局, 表格, 操作控件, 字体, 段落行数, 图片, 都纳入响应式设计的考虑范畴

### 所用到的响应式技术
------
* 弹性盒子布局 (Flexible Box Layout)
* 媒体查询
* 响应式表格: 根据视口宽度隐藏次要栏目 (hidden columns)
* 响应式字体: 根据视口宽度调整字体大小, 使用 `em`, `rem` 单位
* 响应式段落: 根据视口宽度, 元素布局调整段落ellipsis的行数
* 响应式控件: 根据视口宽度合理显示搜索控件和菜单控件
* 响应式图片: 详情请见下方

#### 响应式图片

采用了两种响应式图片方法:

##### 1. 媒体查询
根据视口宽度, 加载大小及分辨率适合的图片.

应用于CSS中 `.hero` class的 `background-image`

##### 2. picture, source元素; srcset, sizes属性 (attribute)
根据设备的DPR, 图片宽度, 视口宽度让浏览器自行选择最佳图片加载

旧浏览器不支持时可以fallback到img元素的src属性上, 兼容性没问题

当设备视口宽度改变的时候, 浏览器会从一系列图片中选择并重新加载最佳图片, 可通过两个方法查看:

1. Chrome Dev Tool的Network
2. Chrome Dev Tool的Element, 选中img元素, 呼出Console, 输入`$0.currentSrc`

应用于HTML中 `.snippet__thumbnail` 的图片
