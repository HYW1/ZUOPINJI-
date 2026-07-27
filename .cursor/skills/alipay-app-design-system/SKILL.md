---
name: alipay-app-design-system
description: MANDATORY DEFAULT for every UI, UX, product-design, interaction-design, visual-design, mobile, mini-program, H5, frontend, or Figma task in this repository. Combines (1) 支付宝 APP 基础精简 design-system tokens/components and (2) reusable experience patterns distilled from the historical design archive Figma file `ZXibIc4lflyHRoTF7OQV0L` (门户、状态卡、个性化卡、申请链路、材料、结论解读等). Use for any new product requirement — not limited to one business flow. Skip only when the user explicitly names a different design system.
---

# Alipay APP Design System + Experience Patterns

本 skill 合并两份真源，供**后续任意产品需求**复用：

| 真源 | 用途 |
|---|---|
| 支付宝 APP 基础精简组件库 | 色板、字号、间距、圆角、导航/按钮/列表/反馈等组件 |
| Figma 历史稿 `skill` 文件 | 阵地页、状态分流、个性化卡片、申请模块、结论卡等可迁移模式 |

**不要**把本 skill 理解成「仅就医报销流程专用」。历史稿里的理赔样例是**模式样本**；新需求应抽取结构与交互原则，替换业务文案与字段。

## Source files

### 1) Design system library

- File: `4Q2KGg9fstrN2BWCwYChzi`
- Page: `23:1873` — `Components通用基础组件`
- URL: https://www.figma.com/design/4Q2KGg9fstrN2BWCwYChzi/支付宝APP基础精简--Copy-?node-id=23-1873

### 2) Pattern archive (历史稿)

- File: `ZXibIc4lflyHRoTF7OQV0L`
- Page: `0:1` — `历史稿`
- URL: https://www.figma.com/design/ZXibIc4lflyHRoTF7OQV0L/skill?node-id=0-1
- Name on canvas: `skill`

改稿前先在历史稿中检索同类模块，再套用基础组件实现。

## Mandatory default

对本仓库任何设计相关请求自动启用，包括：

- 新建 / 修改 Figma 页面、组件、状态、原型
- UX 评审、信息架构、交互说明
- 「帮我出稿」「按规范做」「参考历史稿」「做一个 XX 流程」

用户无需提及「支付宝」或 skill 名。仅当用户**点名其他设计体系**或明确说不用本规范时跳过。

## Priority

1. 用户当次明确要求  
2. 用户粘贴的 demo / 截图内容  
3. 业务与合规约束  
4. 本 skill：基础 token/组件 + 历史稿模式  
5. 通用 UI 灵感  

## Required workflow

1. **Confirm platform** — 小程序 / H5 / APP；默认画布 `750 × 1624`（2×）。代码若用 375 逻辑宽，数值 ÷2。  
2. **Load Figma skills** — `figma-use`；整页再用 `figma-generate-design`。  
3. **Match a pattern first** — 在历史稿按 [pattern-archive.md](references/pattern-archive.md) 找近邻模块（门户 / 卡片 / 状态 / 表单步骤 / 结果）。  
4. **Implement with library components** — 用 [components.md](references/components.md) 的 key 导入实例，禁止手绘顶栏/主按钮/开关。  
5. **Bind semantic tokens** — 用 [tokens.md](references/tokens.md) 的 APP 语义色与字号；不要另造第二套蓝。  
6. **Cover states** — 历史稿强调状态矩阵；至少覆盖默认、空、异常、完成，以及业务分流（有/无记录、有/无权益等）。  
7. **Validate** — 截图检查层级、长中文、底栏遮挡、组件尺寸。  

## Core visual rules (规范摘要)

### Color

- Brand / Button / Link: `#1677FF`
- Text: 80% / 60% / 40% / 20% / 10% black
- Divider: black 6%
- Page BG: `#F0F3F7` · Card: `#FFFFFF` · Inner: `#F9FAFC`
- Success `#00B865` · Notice `#FF5E1A` · Alert `#FF1A3C`

状态色用于图标、标签、短结论条；不要整页大面积装饰性成功绿/警示橙。

### Typography

- 中文：PingFang SC  
- 金额数字：Alibaba Sans 102 Ver2  
- Display 48/72 · Status 40/60 · Title L/M/S 36/32/28 · Body 30/28/24 · Tag 20  

### Spacing / radius

- Scale: `4, 8, 12, 16, 24, 32, 40, 48, 64…`
- Page pad 16 · Card gap 16 · Card pad 24  
- Page card 32 · Card 24 · Inner 16 · Element 8 · Dialog 48 · Button 100  

### Layout

- 内容宽 718；一页一个主动作  
- 卡片只包业务对象，不为每段话套卡  
- 固定底栏 + Home Indicator；内容预留底部安全区  

详见 [layout-and-content.md](references/layout-and-content.md)、[design-principles.md](references/design-principles.md)。

## Experience patterns from 历史稿 (可迁移)

完整地图见 [pattern-archive.md](references/pattern-archive.md)。做新需求时按类型复用：

| 模式族 | 何时用 | 详情 |
|---|---|---|
| 阵地 / 门户 | 服务首页、多入口聚合 | [portal-and-cards.md](references/portal-and-cards.md) |
| 个性化卡片 | 进度、引导、权益、兜底运营位 | 同上 |
| 状态 / 结论卡 | 审核结果、拒赔解读、多进度 | [status-and-result-cards.md](references/status-and-result-cards.md) |
| 申请链路模块 | 说明→选择→上传→确认→签名→完成 | [application-flow-modules.md](references/application-flow-modules.md) |
| 材料准备页 | 清单 + 范围说明 + 协议申请 | application-flow-modules |
| 对话式向导壳 | 服务/对话双 Tab、AI 声明、语音输入 | pattern-archive |

**迁移方法**：保留信息顺序与组件结构，替换标题、字段、状态枚举与主按钮文案；不要整页复制历史业务文案到无关需求。

## Product writing

- 结论先于解释  
- 动作按结果命名（`继续申请`、`查看详情`、`去补齐`）  
- 异常说明「原因 + 下一步」  
- 避免实现词（OCR、接口、reject-reason 对用户露出时要转成白话）  
- 交易流程不用宣传腔和大面积 emoji 图标  

## Anti-patterns

- AI 紫渐变、玻璃拟态、装饰光晕  
- 每个段落一张悬浮卡  
- 双主按钮同权  
- 只画 Happy Path，忽略历史稿里的状态矩阵  
- 脱离组件库手绘 TopBar / Button / Checkbox  
- 把本 skill 当成单一业务流程图，拒绝用于其他需求  

## Reference files

- [tokens.md](references/tokens.md)  
- [components.md](references/components.md)  
- [layout-and-content.md](references/layout-and-content.md)  
- [design-principles.md](references/design-principles.md)  
- [pattern-archive.md](references/pattern-archive.md)  
- [portal-and-cards.md](references/portal-and-cards.md)  
- [status-and-result-cards.md](references/status-and-result-cards.md)  
- [application-flow-modules.md](references/application-flow-modules.md)  
