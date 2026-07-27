# 生图 Playbook（单张循环）

禁止：一次生成整页 UI 糊图。  
允许：单模块主视觉 / 单材质 / 单插画 / 必要时单组图标。

## 循环

```text
定义模块需求 → 对照用户好样本 → 写提示词 → 生成一张 → 校验 → 通过则入库
                                      └ 不通过则改提示词重生成（同模块）
→ 抠透明 → 放入 Figma → 截图验收 → 下一模块
```

## 图标质感课（强制 · 来自用户改稿）

用户标准样本：`169:869` / `169:1035`（医疗十字玻璃盾）

### 好图标长什么样

| 维度 | 要 | 不要（我过去的丑法） |
|------|----|----------------------|
| 材质 | **冰透 / 磨砂树脂玻璃**，能透光 | 厚铬边、珠宝切面、游戏装备盾 |
| 颜色 | 主体 **极浅冰蓝～青白**；符号才用 `#1677FF` | 整盾深蓝饱和、塑料感 |
| 符号 | 场景语义对（医疗用 **十字**） | 到处滥用粗白勾选 |
| 光 | 顶侧柔光 + **内透光**；边缘细高光 | 一堆星芒、彩虹棱镜、硬闪 |
| 底座 | 极浅环或柔光落点，融进主体 | 奖杯式双层厚底座、金币纸张 |
| 体量 | 圆润、厚度克制、略 3/4 角 | 夸张厚度、玩具感、贴纸感 |

### 医疗结果态 Hero 提示词骨架

```text
Single premium mobile-app hero icon for Alipay C-end.
Frosted translucent ice-glass medical shield, pale icy cyan-white body,
soft internal glow, thin bright rim highlight only.
Centered soft rounded medical PLUS/CROSS in Alipay blue #1677FF, embedded in glass.
Optional ultra-soft pale luminous ring under the shield (very subtle).
Soft studio top-left light, refined, lightweight, ethereal — NOT toy, NOT game loot.
NO checkmark, NO gold coins, NO paper, NO chrome jewelry rim, NO heavy pedestal, NO text.
Pure solid chroma green #00FF00 background.
```

### 丑图一票否决

- [ ] 是否像「游戏橙蓝装备图标」或「通用 AI 3D icon pack」？是 → 重做  
- [ ] 主体是否过深、过饱和？是 → 改浅冰透  
- [ ] 边框是否又厚又铬？是 → 改细边磨砂玻璃  
- [ ] 是否堆了金币/纸张/锁头凑丰富？是 → 删光  
- [ ] 与用户样本并排，气质是否明显廉价？是 → 重做  

## 提示词必填项

1. **类型**：主视觉 / 材质纹理 / 场景插画 / 产品物  
2. **平台气质**：支付宝系 C 端；干净、可信、轻盈  
3. **画幅与安全区**：适配 750 宽模块；主体不贴边  
4. **主物体**：具体、可识别；**先写语义符号**（十字 / 心 / 盾…）  
5. **光**：柔光 + 是否内透；禁止硬闪星芒堆叠  
6. **材质**：优先「冰透磨砂玻璃 / 软树脂」；慎用厚金属铬  
7. **色彩**：主体浅；点缀才接近 `#1677FF`；禁大面积紫渐变  
8. **禁止项**：廉价游戏盾、通用勾选贴纸、塑料人、金币纸张堆砌、烧字、整页假 UI  

## 透明底与抠图（强制）

主视觉 / 图标类素材 **禁止** 带着烘焙背景（白底、氛围底、棋盘格）直接贴进页面。

推荐流程：

1. **绿幕生成**：纯色绿幕 `#00FF00`  
2. **抠图**：`rembg` 或色键 → 清边 → trim → RGBA  
3. **Figma**：`IMAGE` + `FIT`；浅底座可另用模糊椭圆叠在图层下（见 T-015）

校验：四角 alpha=0；叠在浅灰/顶雾上无方板。

## 校验清单（每张图）

- [ ] 通过「图标质感课」丑图一票否决  
- [ ] 与用户好样本气质接近（冰透、轻、语义对）  
- [ ] 已抠透明 RGBA  
- [ ] 无金币 / 纸张 / 厚奖杯座 / 烧字  
- [ ] 可复用，不过度绑定业务文案  

## 入库命名建议

```text
mv-<page>-<module>-<role>-v<n>.png
例：mv-result-hero-medical-cross-v3.png
```

`mv` 主视觉 · `tx` 纹理材质 · `il` 插画 · `ic` 图标
