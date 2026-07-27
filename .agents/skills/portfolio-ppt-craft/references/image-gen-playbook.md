# 生图 Playbook（作品集 PPT · 单张循环）

禁止：一次生成整页 / 整本 PPT 糊图；禁止生成假 UI 冒充作品。  
允许：单材质背景 / 单装饰 / 单辅助插画 / 单隐喻物。

## 循环

```text
定义单页需求 → 对照反 AI 清单 → 写提示词 → 生成一张 → 校验 → 通过则入库
                                      └ 不通过则改提示词重生成（同素材）
→（如需）抠透明 → 放入 Figma/Keynote/Slides → 该页截图验收 → 下一张
```

## 作品集气质课（强制）

### 好素材长什么样

| 维度 | 要 | 不要 |
|------|----|------|
| 角色 | 服务真实截图 / 人像舞台 / 轻氛围 | 替代作品本体 |
| 材质 | 可命名：纸感、柔雾、细金属边、光滑 mesh | 说不出名字的 glow、霓虹、玻璃拟态墙 |
| 色彩 | 中性为主；点缀 ≤ 1 | 蓝紫/粉紫大面积假渐变 |
| 光 | 方向一致、短软、局部高光 | 满屏外发光、彩虹棱镜 |
| 背景 | 干净可投屏；极淡柔雾可选 | 雷达线、同心圆、film grain、砂面噪点 |
| 插画 | 克制单隐喻，少元素 | 塑料人、漂浮礼盒、通用 AI 插画墙 |
| 输出 | 可替换、无烧字、边缘干净 | 整页假 PPT、假手机框 UI |

### 提示词骨架（默认）

```text
[类型] 单材质背景 / 单装饰 / 单辅助插画 / 单隐喻物
[平台气质] Designer portfolio presentation slide, professional, restrained,
screen-readable, print-friendly PDF — NOT marketing promo, NOT sci-fi HUD
[画幅] Safe area for 1920x1080; subject not touching edges
[主物体] …
[光] Soft directional light from …; short soft contact shadow; no full-frame glow
[材质] Nameable: paper / soft mist / thin metal edge / smooth mesh …
[色彩] Neutral field dominant; accent ≤ 1; NO large blue-purple / pink-purple gradients
[风格] Portfolio exhibit craft; calm; reusable; supports real screenshots
[禁止] Glassmorphism walls, generic AI sticker people, floating gift boxes,
meaningless glow, neon outlines, film grain, radar/concentric HUD lines,
fake phone UI mockups, burned-in text, whole-slide generated PPT
[输出] Transparent or solid clean background as needed; crisp edges for swap-in
```

### 封面柔雾底示例（可改写）

```text
Soft neutral mist backdrop for a designer portfolio cover slide (1920x1080 safe).
Very pale warm-gray to off-white field, extremely subtle soft light bloom in one corner,
nameable soft mist material, calm professional exhibit atmosphere.
NO purple gradient, NO film grain, NO radar lines, NO icons, NO fake UI, NO text.
Solid clean background suitable as a replaceable slide layer.
```

### 丑图一票否决

- [ ] 是否像运营大促海报或招商科技皮？是 → 重做  
- [ ] 是否大面积蓝紫假渐变 / 霓虹 / 满屏 glow？是 → 重做  
- [ ] 是否颗粒 / film grain / 雷达装饰底？是 → 重做  
- [ ] 是否塑料人 / 漂浮礼盒 / 通用 AI 插画墙？是 → 重做  
- [ ] 是否假手机框或模糊假 UI？是 → 删除，改用真实作品图  
- [ ] 是否烧字进图？是 → 重做  
- [ ] 与全册中性气质并排是否明显廉价？是 → 重做  

## 提示词必填项

1. **类型**：材质底 / 装饰 / 辅助插画 / 隐喻物  
2. **平台气质**：作品集 PPT；专业克制；可投屏  
3. **画幅与安全区**：适配 1920×1080；主体不贴边  
4. **主物体**：具体、可识别；或明确「无主体仅氛围底」  
5. **光**：方向 + 软硬；禁止硬闪星芒堆叠  
6. **材质**：必须可命名  
7. **色彩**：中性为主；点缀 ≤ 1；禁大面积紫渐变  
8. **禁止项**：见上表 + 反 AI 清单  

## 透明底与嵌入（建议）

辅助主物 / 装饰类：

1. 干净底或绿幕生成  
2. 需要叠图时抠成 RGBA，清边  
3. 放入版式时用统一阴影语言（短软或不用），勿每页不同投影配方  

氛围底类：

- 可直接铺满背景层；强度以不抢截图为准  

校验：叠在白 / 浅灰 / 近黑母版上看，不出现方板感、灰描边、颗粒皮。

## 校验清单（每张图）

- [ ] 通过「丑图一票否决」  
- [ ] 材质可命名；光向与全册一致  
- [ ] 无烧字、无假 UI、无雷达/颗粒皮  
- [ ] 可替换，不过度绑定本次项目文案  
- [ ] 明确服务哪一页的哪一层（背景 / 装饰 / 辅助插画）  

## 入库命名建议

```text
ppt-<deck>-<page>-<role>-v<n>.png
例：ppt-portfolio-cover-mist-v2.png
例：ppt-case01-process-accent-metal-v1.png
```

`bg` 背景材质 · `tx` 纹理 · `il` 辅助插画 · `ac` 装饰强调 · **禁止** `ui-fake` 类入库
