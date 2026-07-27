---
name: alipay-app-design-system
description: 支付宝 APP 基础规范 + 历史稿可迁移体验模式。适用于任意产品设计需求（不限单一业务）。在 Figma 中作为设计 skill / 规范文档使用。
version: 1.0
sources:
  - name: 支付宝APP基础精简
    fileKey: 4Q2KGg9fstrN2BWCwYChzi
    url: https://www.figma.com/design/4Q2KGg9fstrN2BWCwYChzi/支付宝APP基础精简--Copy-?node-id=23-1873
  - name: skill历史稿
    fileKey: ZXibIc4lflyHRoTF7OQV0L
    url: https://www.figma.com/design/ZXibIc4lflyHRoTF7OQV0L/skill?node-id=0-1
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


---


# Token Reference

Source collections:

- `Base`: primitive values
- `APP`: semantic aliases for product interfaces

Always consume `APP` tokens in screen design. Extend `Base` only when the source system has no suitable primitive.

## Semantic colors

| Token | Resolved value | Usage |
|---|---:|---|
| `Color/Brand` | `#1677FF` | Brand emphasis and active state |
| `Color/Button` | `#1677FF` | Primary action |
| `Color/Link` | `#1677FF` | Text action |
| `Color/TextPrimary` | `rgba(0,0,0,.80)` | Headings and primary content |
| `Color/TextSecondary` | `rgba(0,0,0,.60)` | Body and supporting content |
| `Color/TextTertiary` | `rgba(0,0,0,.40)` | Metadata and hint text |
| `Color/TextQuaternary` | `rgba(0,0,0,.20)` | Very low-emphasis content |
| `Color/TextDisable` | `rgba(0,0,0,.10)` | Disabled text |
| `Color/Divider` | `rgba(0,0,0,.06)` | Dividers and subtle borders |
| `Color/PageBG` | `#F0F3F7` | Page background |
| `Color/CardBG` | `#FFFFFF` | Primary cards and surfaces |
| `Color/InnerCardBG` | `#F9FAFC` | Nested groups |
| `Color/Alert` | `#FF1A3C` | Alerts and destructive context |
| `Color/Price` | `#FF1A3C` | Price emphasis where required |
| `Color/Discount` | `#FF5E1A` | Discount |
| `Color/Notice` | `#FF5E1A` | Notice and action-required state |
| `Color/StateFail` | `#FF1A3C` | Failure |
| `Color/StateSuccess` | `#00B865` | Success |
| `Color/StateProcess` | `#1677FF` | Processing |
| `Color/StateNotice` | `#FF5E1A` | Warning/notice |
| `Color/FunctionalOverlay` | `rgba(0,0,0,.60)` | Functional dialog overlay |
| `Color/CampaignOverlay` | `rgba(0,0,0,.75)` | Marketing overlay only |

## Semantic spacing

| Token | Figma px |
|---|---:|
| `Space/PagePadding` | 16 |
| `Space/OverlayPadding` | 40 |
| `Space/CardGapVertical` | 16 |
| `Space/CardGapHorizontal` | 16 |
| `Space/InnerCardGap` | 16 |
| `Space/CardPadding` | 24 |
| `Space/InnerCardPadding` | 24 |
| `Space/ElementsS` | 4 |
| `Space/ElementsM` | 8 |
| `Space/ElementsL` | 12 |
| `Space/ElementsXL` | 16 |
| `Space/ElementsXXL` | 24 |

Primitive scale: `4, 8, 12, 16, 24, 32, 40, 48, 64, 72, 80, 88, 96`.

## Radius

| Token | Figma px | Typical use |
|---|---:|---|
| `Radius/DialogRadius` | 48 | Product dialog |
| `Radius/PageCardRadius` | 32 | Page-level card |
| `Radius/CardRadius` | 24 | Standard card |
| `Radius/InnerCardRadius` | 16 | Nested card |
| `Radius/ElementRadius` | 8 | Small controls and tags |
| `Radius/ButtonRadius` | 100 | Button pill |

Do not apply the largest radius to every container. Radius encodes hierarchy.

## Typography

Text family: `PingFang SC`. Number family: `Alibaba Sans 102 Ver2`.

| Style | Size / line height | Weight |
|---|---:|---|
| `APP/Display 48 Medium` | 48 / 72 | Medium |
| `APP/Status Title 40 Medium` | 40 / 60 | Medium |
| `APP/Title L 36 Medium` | 36 / 56 | Medium |
| `APP/Title M 32 Medium` | 32 / 48 | Medium |
| `APP/Title S 28 Medium` | 28 / 42 | Medium |
| `APP/Body L 30 Regular` | 30 / 45 | Regular |
| `APP/Body M 28 Regular` | 28 / 42 | Regular |
| `APP/Body S 24 Regular` | 24 / 36 | Regular |
| `APP/Caption 24 Regular` | 24 / 36 | Regular |
| `APP/Tag 20 Regular` | 20 / 30 | Regular |
| `APP/Number 36 Medium` | 36 / 54 | Medium |

Letter spacing is 0%. Text case is original.

## Scale conversion

The source library uses a 750px Figma canvas. When implementing a 375px logical-width mobile UI:

```text
logical px = Figma px / 2
```

Examples:

- 718px content width → 359 logical px
- 16px Figma page padding → 8 logical px
- 98px L button height → 49 logical px
- 28px body text → 14 logical px

Do not divide values when creating or editing Figma frames in the source scale.


---


# Component Reference

Source file key: `4Q2KGg9fstrN2BWCwYChzi`

Import component sets with `figma.importComponentSetByKeyAsync(key)` and standalone components with `figma.importComponentByKeyAsync(key)`.

## System and actions

| Component | Key | Main variants / dimensions |
|---|---|---|
| 操作/按钮 Button | `ea7ef268464a2c5496b5283d6e4c550fbb5b638b` | Default/disabled; XS/S/M/L/XL; primary/secondary/warning |
| 操作/图标按钮 IconButton | `8ef5e8e0d1ea6f355a077e95e802e197b1cf1109` | Title; title + description |
| 操作/按钮组 ButtonGroup | `460cfd6d0f74dbb659d4d6b951b805ef15de713c` | Vertical two; horizontal two; agreement + primary; checkbox + agreement + primary |
| 状态栏 StatusBar | `7fb45e5f34be9a4c71a6100501eba61483ba2138` | Black/white, `750 × 88` |
| Home Indicator | `36fe186159242fb3d94d178e8b254af7cd2d26c3` | Black/white, `750 × 68` |
| 全局遮罩 Overlay | `787d3442af237b6dc24f8bf2139f79c55de70782` | Functional/marketing, `750 × 1624` |

Button dimensions:

- XS: `144 × 48`
- S: `176 × 60`
- M: `176 × 80`
- L: `718 × 98`
- XL: `718 × 128`

Use L for the standard fixed bottom primary action. Use ButtonGroup instead of manually aligning multiple buttons.

## Navigation

| Component | Key | Use |
|---|---|---|
| 导航/顶部导航 TopBar/浅色 | `2ba1929e5c28218d4c91e0c7ba08562b00a95708` | Standard H5 or mini-program top bar |
| 导航/顶部导航 TopBar/透明 | `8bba3355ce22e3af759ec72f19bc79bab56d6bd7` | Only when content/background genuinely continues behind navigation |
| 导航/二级导航 SubNav | `61cb2058a45deb1ba5de65f675b276be4d4f40af` | 2–4 or scrollable secondary categories |
| 导航/标签项 TabItem | `a6c3ffdca3cefedacea91a28011c73804a263220` | First/second/third-level tab states |
| 导航/分段标签 SegmentedTabs | `edc2928c9b9bd3f79c41ebda05db9196247a5e62` | Compact peer switching |
| 导航/分页 Pagination | `0c64f71733e54e8651dd0a6e6a9d278d08bfd01b` | 2–4 page indicators |

Top bars are `750 × 176`, including the 88px status area. Choose the platform variant; do not redraw browser/mini-program controls.

## Display and selection

| Component | Key | Use |
|---|---|---|
| 展示/卡片 Card | `248c61f8e0178670566617d0a7620d9de21c9942` | 1–3 columns; title inside/outside |
| 展示/列表项 ListItem | `4c88da41f34c8f111e9290b451f45fb5d5ee0723` | Primary structured list pattern |
| 展示/标签 Tag | `62a56b42acd3a32fdee9b40cd36e21a6517341f3` | Brand/red/orange; filled/outlined |
| 展示/模块标题 ModuleTitle | `330251486884cafb9819bdcc2fde046b627cd8ac` | Section heading, link, subtitle, or tab |
| 展示/宫格 GridItem | `1b91a62fb237f83418cd2e90a9c58be7d6820bd0` | 2–5 action items |
| 展示/页脚 PageFooter | `a1d8fc65d6c59f6557464e33e3f8123d5f82fc3f` | Description, guidance, or one/two text actions |
| 选择/勾选框 Checkbox | `b98932e4679fdf6e04c43a1ee24e06060e209bb4` | Selected/unselected/edit-disabled; `44 × 44` |
| 选择/开关 Switch | `a7d9f7f025456301d94ffe90f8e5309c06fbdffc` | On/off/edit-disabled; `102 × 62` |
| 选择/筛选标签 FilterChip | `daf7b85b36ce33cf784e9acd654b1d0999e3e28b` | One/two-line filter |
| 选择/选项组 OptionGroup | `e5a3b6314472d57a1740042a265c8c3b9e22b87d` | 2–4 columns, one/two-line options |

ListItem dimensions:

- One-line item: `718 × 96`
- Two-line item: `718 × 132`

Choose the right-side variant by meaning: arrow for navigation, radio for selection, switch for immediate toggles, text/number for values, and button for a local action.

## Input

| Component | Key | Use |
|---|---|---|
| 输入/单行搜索框 SearchField | `08667f38ca7ed2d2158250071365ecb0448bbfd7` | Search |
| 输入/输入表单 InputListItem | `91d5c9df4903bfd3131ebd0679b54237c44604da` | Single/two-line form rows |
| 输入/段落输入表单 InputTextField | `65e1530bd35324fe0bbdd2a83441da690b7d97a9` | Paragraph input |
| 输入/金额输入卡片 AmountField | `2143838ce8dc3345dbd970e470929dee6f26b002` | Amount input and breakdown |
| 输入/账户密码 AccountAndPassword | `a32f49925f1ed81f15a39df0602286b7ba5a37aa` | Phone/email/password |
| 输入/验证码输入框 VerificationCodeInput | `14f8936ff1e3824dac0a3df2291918b607c8bb0a` | 4/6-digit verification |

Use the input component's hint and entered states. Do not simulate fields with plain rectangles and text.

## Feedback and exceptions

| Component | Key | Use |
|---|---|---|
| 反馈/结果页 Result | `1ab33bbbc4b60f18e6fd41157019769daa798e91` | Success, reminder, waiting, warning, failure |
| 反馈/轻提示 Toast | `fb9c0864946e7aac2dd2966fc31f813b0b8ecfdd` | Success/loading/warning/failure/one-line/multiline |
| 反馈/通告栏 Banner | `ac9db168115172c54e231210ce7043af2135a90c` | Page-level notice, optional link/close |
| 异常状态/异常态页面 BlankPage | `0906d19e7612aa597f8d4d95f13fda4ff25adb30` | Global, popup, local exception |
| 异常状态/插图文案大 PageStateImageLarge | `dbb2a2aa76085476dd335722f202309a5358edd8` | Full-page network/empty/location/account/etc. |
| 异常状态/插图文案小 PageStateImageSmall | `fb713b9239eb15288446c0028553c9c09f8b2128` | Local exception |

Use Result for terminal outcomes. Use Toast for short confirmation. Use Banner for persistent page context. Do not turn all three into interchangeable colored cards.

## Containers

| Component | Key | Use |
|---|---|---|
| 弹窗/产品弹窗 FunctionalPopup | `0c2c9a237455ff9b0bdaabaaf4ff01972e95f5a6` | Single/double/multiple actions, warning, checkbox, input, verification, agreement |
| 弹窗/营销弹窗 CampaignPopup | `3fef84f241b52aae42c4b4afa1661c6d755fe12e` | Marketing only |
| 弹窗/底部面板 BottomSheet | `1bcedb27d648ccc66be73b9f270fd2944dab8eae` | Options, explanation, confirmation, warning, custom content |

Functional dialogs are 600px wide in the 750px canvas and use `Radius/DialogRadius`. Do not use CampaignPopup for product confirmation or errors.


---


# Layout, Content, and QA

## Standard page anatomy

```text
750 × 1624
┌────────────────────────────────────────┐
│ StatusBar + TopBar               176   │
├────────────────────────────────────────┤
│ Page background #F0F3F7                │
│ 16 ┌──────────────────────────────┐ 16 │
│    │ Page/card content       718 │    │
│    └──────────────────────────────┘    │
│                                        │
├────────────────────────────────────────┤
│ Fixed ButtonGroup / primary action      │
│ Home Indicator                    68   │
└────────────────────────────────────────┘
```

- Keep the navigation platform-specific.
- Use `Space/PagePadding` for standard content.
- Separate page-level cards with `Space/CardGapVertical`.
- Keep fixed actions out of scroll content and reserve bottom safe-area space.

## Information hierarchy

Use this order for transactional flows:

1. Current conclusion or task
2. Data the system already knows
3. Information the user must verify or provide
4. Risk/constraint only when relevant
5. One primary action

Examples:

- Prefer `已找到 2 笔可报销费用` before explaining authorization sources.
- Prefer `还差 1 项材料` before listing completed materials.
- Prefer `图片缺少医院盖章，请重新拍摄` over `识别失败`.

## Card and list decisions

Use a Card when:

- Multiple rows form one business object, such as a policy or reimbursement application.
- Content needs a clear boundary from the page background.
- A title and grouped details must move together.

Use ListItem when:

- Rows share the same structure.
- Users compare or select items.
- A row leads to details, toggles a setting, displays a value, or has a local action.

Avoid nested cards unless the inner group has a separate semantic role. Prefer dividers within one card.

## Action hierarchy

- One primary action per screen.
- Use secondary outline buttons for reversible or alternative actions.
- Use warning button variants only for destructive or high-risk actions.
- Use text links for tertiary actions.
- Use ButtonGroup agreement variants for consent instead of manually assembling checkbox, agreement, and button.
- Keep the same verb across control, loading, toast, and result.

## Status and feedback

| Situation | Component |
|---|---|
| Short success/failure after an action | Toast |
| Persistent information at page top | Banner |
| Terminal success/failure/waiting state | Result |
| Whole page cannot continue | BlankPage / PageStateImageLarge |
| Local module has no data or failed | PageStateImageSmall |
| User must confirm before continuing | FunctionalPopup |
| User chooses from contextual options | BottomSheet |

Do not use a large green success banner on every completed step. Green should communicate completion, not decorate the page.

## Platform choices

### Mini-program

- Use the mini-program TopBar variant.
- Preserve native capsule/menu controls.
- Do not add an extra custom close button.

### H5

- Use the H5 TopBar variant.
- Choose title, title + text link, tabs, or search based on the task.
- Use `取消 + 标题 + 确认按钮` for modal-like edit pages.

### Native APP

- Use StatusBar and a suitable top navigation treatment.
- Preserve safe areas and Home Indicator.

## Copy guidelines

- Use user-recognizable nouns: `就医记录`, `费用清单`, `收款账户`.
- Avoid implementation language: `OCR`, `接口`, `命中模型`, `路由`.
- Keep titles short; move qualifications into secondary text.
- Use active voice and explicit recovery steps.
- Put compliance copy close to the action it qualifies, not in unrelated cards.

## Figma implementation checklist

- [ ] Canvas/platform are confirmed.
- [ ] `APP` semantic variables are used or recreated with the same names.
- [ ] Existing component instances were inspected before drawing.
- [ ] Matching library components were imported by key.
- [ ] Auto Layout governs related content.
- [ ] Standard page content is 718px wide with 16px side padding.
- [ ] Text uses PingFang SC; financial numbers use Alibaba Sans 102 Ver2.
- [ ] Primary, secondary, disabled, loading, error, empty, and success states are covered where relevant.
- [ ] Fixed bottom actions do not overlap content.
- [ ] Long Chinese copy and extreme values were tested.
- [ ] Screenshots were reviewed at readable resolution.

## Visual quality checklist

- [ ] No generic AI gradient or glow was added.
- [ ] No unnecessary illustration competes with task content.
- [ ] Card count reflects information groups, not paragraph count.
- [ ] Status colors are semantic and restrained.
- [ ] Only one action dominates each screen.
- [ ] Font weights create hierarchy without making every line bold.
- [ ] Radius values follow component hierarchy.
- [ ] Custom UI is not duplicating an available source component.


---


# 跨需求设计原则

从支付宝基础规范与历史稿共同抽出的原则。适用于任意新产品流程。

## 1. 结论优先

用户先看到「现在怎样 / 能否继续」，再看细节。

- 门户：先保单/服务状态，再运营位  
- 进度卡：先「还差一步 / 审核未通过」，再申请信息  
- 材料页：先「必备材料」，再范围说明  
- 结果页：先结论，再原因解读与 CTA  

## 2. 状态驱动，而不是单页幻想

历史稿按条件拆画板。新需求同样先列状态轴，再出界面：

- 有无历史数据（金额=0 / >0；有无记录）  
- 有无权益（有/无安心赔；已/未订阅）  
- 流程阶段（未提交 / 申请中 / 待补材 / 结案）  
- 结果类型（通过待打款/已打款/零结；拒赔分因；关闭/取消；原因缺失）  
- 时间窗（如 T+0～T+25 vs T+26～T+30）  

每个状态对应清晰结论文案与一个主行动。

## 3. 一页一主动作

- 主按钮唯一且与结论同故事  
- 次要操作用次按钮、文字链或「咨询更多」  
- 协议类动作合并进主按钮文案（如「同意协议并申请」）或使用 ButtonGroup 协议变体  

## 4. 卡片有语义边界

| 用卡片 | 不用卡片 |
|---|---|
| 一份保单、一条申请、一张进度、一组材料要求 | 单句说明、步骤条、分割线两侧的散文字 |
| 需要与页背景分离的业务对象 | 仅为了「好看」包一层圆角阴影 |

个性化运营位可以是卡片，但同一屏避免多张同权厚卡抢主任务。

## 5. 解释层可开关

历史稿区分「有解读版 / 普通版 / 通用版本」。新需求若有智能解读：

- 解读是结论下的增强层，不能替代结论  
- 无解读时降级为普通说明，布局仍稳定  
- 对用户隐藏工程字段名，转成可读原因  

## 6. 入口可多，路径要收敛

阵地可有多个查查/申请入口；一旦进入任务流，步骤应收敛到主任务，中途分叉用明确模块（模式选择、医院选择），不要并行堆五个同级主 CTA。

## 7. 组件与规范优先于临摹像素

历史稿含位图与旧稿。落地时：

1. 认准模式（结构 + 状态）  
2. 用基础库组件重搭  
3. 文案按新需求替换  
4. Token 对齐 APP 语义色  

不要把历史像素瑕疵、过时插画或错误 font 名一并抄进新稿。

## 8. 合规与预期管理

- 推荐/智能判断加脚注：「初步判断，最终以机构审核为准」类表述按业务法务定稿  
- AI 对话壳保留「部分内容由 AI 生成…」类声明  
- 免赔额、等待期、医院范围等限制靠近相关结论，不藏在无关折叠里  


---


# 历史稿模式地图

Source file: [`ZXibIc4lflyHRoTF7OQV0L`](https://www.figma.com/design/ZXibIc4lflyHRoTF7OQV0L/skill?node-id=0-1) · Page `历史稿` (`0:1`)

节点坐标会变；用**分区标题文字**检索。下列分类是可迁移模式，不是绑死某一业务的唯一流程。

## 如何用这份地图

1. 新需求先判断属于哪一模式族。  
2. 在文件中搜索同名分区标题。  
3. `get_screenshot` 参考结构。  
4. 用支付宝基础组件重建，替换业务内容。  

## 模式族总览

### A. 阵地 / 门户

| 分区标题 | 模式要点 |
|---|---|
| 门户（向导阵地页） | 服务首页：保单资产、理赔入口、管家/咨询、查查类能力 |
| 旧版理赔门户 | 对照旧信息架构；优先参考新版结构 |
| 长辈版 | 更大点击与更少并列入口的变体 |
| 药品查查 / 医院查查 | 工具型入口模块，可嵌入阵地 |

### B. 条件分流（出界面前先定状态）

| 分区标题 | 模式要点 |
|---|---|
| 金额=0 / 金额>0 | 空资产 vs 有可展示金额 |
| 有理赔记录 / 无理赔记录 | 列表/空态两套 |
| 首次开箱弹窗 | 首次引导 |
| 有安心赔 / 无安心赔 | 权益有无影响材料页与说明 |
| 未订阅用户 / 已订阅用户 / 快捷报销可使用 | 订阅与能力解锁 |
| 未提交报案 / 已提交未结案 / 待补材… / 理赔结案 | 生命周期阶段 |
| 用户有申请未提交评价 | 评价回收入口 |

### C. 个性化卡片

| 分区标题 | 模式要点 |
|---|---|
| 个性化卡片：理赔进度 | 未完成申请挽回；主 CTA「继续填写」 |
| 安心赔卡片 | 权益说明卡 |
| 热门疾病+医院引导 | 双主题引导 |
| 热门疾病+关怀 | 关怀向运营 |
| 先进药械 | 专题能力卡 |
| 就医快捷报销 | 能力入口卡 |
| 经验之谈 | 内容/社区向 |
| 个性化卡片：兜底样式 | 无精准运营时的保底卡 |

时间窗变体：`T+0～T+25`、`T+26～T+30`（文案与紧迫度不同）。

### D. 结论 / 状态卡矩阵

通过类：已打款 / 待打款 / 赔付零结（有解读版与通用版）  
未通过类：智能解读版、普通版  
关闭类：已关闭/已取消  
异常：reject-reason 为空  
拒赔分因：混合、医院不符合、一般免责、纯门诊、既往症、等待期、重复理赔、非保期、材料不齐  
其他：多进度、仅赔付零结  

结构通式见 [status-and-result-cards.md](status-and-result-cards.md)。

### E. 申请链路模块

| 分区标题 | 模式要点 |
|---|---|
| 方式一：理赔说明页 | 说明页发起 |
| 方式二：小保内发起 | 对话/助手内发起 |
| 预申请 | 预填/预检 |
| 模式选择 | 路径分叉选择 |
| 医院选择 | 含历史医院、选项过长省略 |
| 上传材料 / 材料检索 | 上传与检索 |
| 再次询问 | 澄清问答 |
| 材料必传字段确认卡 | 必传字段确认 |
| 补材卡片 | 补传 |
| 出险信息确认 | 出险字段确认；含「是否手术」等修改流 |
| 基础信息确认 | 基础信息 |
| 签名 | 签名 |
| 提交完成 | 完成页 + 后续提问引导 |
| 保单浮层 | 选保单浮层 |
| 理赔通知书支持下载 | 结果附件能力 |
| 补充·条件编辑 / 补充·对比 | 条件编辑与对比 |

### F. 对话式向导壳

历史稿中「理赔流程说明 / 服务·对话」帧：

- 顶区服务状态（服务中、进度%）  
- Tab：服务 | 对话  
- AI 生成声明  
- 底区语音/输入  
- 结束态引导「如何查询进度」等下一问  

新需求做助手壳时复用壳层，不复用具体对话剧本。

## 代表节点（定位线索）

| 用途 | 示例 nodeId |
|---|---|
| 门户帧 | `1:93` |
| 进度挽回卡 | `1:3650` |
| 审核未通过解读卡 | `1:2864` |
| 材料准备页（无安心赔） | `1:4873` |
| 对话向导说明 | `1:5875` |
| 提交完成 | `1:8114` |

检索失败时用分区中文标题在文件内搜索。


---


# 阵地页与个性化卡片

模式来源：历史稿「门户（向导阵地页）」「个性化卡片*」「安心赔卡片」等。

## 阵地 / 门户页结构

```text
TopBar / 体系导航
资产或身份摘要（保单数、保障对象、投入金额…）
主任务入口（申请 / 进度查询 / 服务）
能力入口行（查查类、工具类）— 可横滑或宫格
个性化卡片区（按用户状态插入 1 张主卡）
咨询 / 管家入口（次级）
```

要点：

- 先资产与主任务，再运营卡  
- 长辈版：减少并列入口，放大主 CTA  
- 旧版门户仅作对照，新稿对齐基础组件与当前信息层级  

## 个性化卡片通式

```text
眉标或状态点（可选）
一句结论（用户现在最需要知道的）
1–3 行关键字段（对象 / 产品 / 时间）
主按钮（继续 / 查看 / 去使用）
次级：咨询更多 / 文字链（可选）
底注或权益卖点短句（可选，不抢主按钮）
```

### 进度挽回卡（示例结构）

- 结论：申请还差一点就完成 / 信息已为你保存  
- 字段：保障对象、申请时间、保险产品、状态「申请中」  
- 主按钮：继续填写…  
- 次级：咨询更多  

时间窗不同（T+0～25 vs T+26～30）可改紧迫文案，结构不变。

### 运营 / 能力卡类型

| 类型 | 内容重心 | 主行动 |
|---|---|---|
| 理赔进度 | 未完成申请 | 继续填写 |
| 安心赔 | 权益说明 | 了解 / 使用权益 |
| 疾病+医院引导 | 双主题信息 | 去查查 / 去了解 |
| 疾病+关怀 | 关怀话术 | 轻量了解 |
| 先进药械 | 专题能力 | 查看专题 |
| 快捷报销 | 能力入口 | 去报销 |
| 经验之谈 | 内容 | 去阅读 |
| 兜底样式 | 通用引导 | 通用主行动 |

同一屏通常只强调**一张**个性化主卡；其余入口降级为列表或宫格。

## 分流后再选卡

出卡前根据状态选择模板，而不是一张卡塞所有情况：

- 无记录 → 空态 / 开箱 / 能力介绍  
- 有未完成申请 → 进度挽回  
- 有权益 → 权益卡或材料页带权益差异  
- 无精准运营 → 兜底样式  

## 视觉

- 卡宽随内容区（常 702 内宽或 718）  
- 圆角 24；内边距 24  
- 主按钮用组件；「咨询更多」为次级文字或弱按钮  
- 避免卡片内再套多层厚阴影卡  


---


# 状态卡与结论解读

模式来源：历史稿大量「理赔审核*」「拒赔*」「多进度」帧。可迁移到任意「审核 / 申请结果」类界面。

## 结论卡通式

```text
次级入口（咨询更多）
一句导语（可选，口语化）
结论标题（通过 / 未通过 / 已关闭…）
申请信息摘要（时间、原因、医院等一行）
原因或解读区块（可折叠/可分段）
主 CTA（查看详情 / 去补齐 / 重新申请…）
辅助卖点或服务承诺短句（可选）
```

## 信息顺序（固定）

1. **结论**  
2. **申请摘要**  
3. **原因 / 解读**  
4. **行动**  

不要先堆政策再给结论。

## 变体矩阵（按需裁剪）

### 通过

- 已打款  
- 待打款  
- 赔付零结  
- 仅赔付零结  

每类可有「有解读版」与「通用/普通版」。解读版在结论下增加白话说明；无解读时留白或短说明，外框尺寸尽量稳定。

### 未通过 / 拒赔

按**原因类型**出不同解释与行动，而不是同一句「失败」：

- 医院不符合  
- 一般免责  
- 纯门诊  
- 既往症  
- 等待期  
- 重复理赔  
- 非保期  
- 材料不齐  
- 混合原因  

行动随原因变：换医院说明、去补材、查看条款、联系客服等。

### 关闭与异常

- 已关闭 / 已取消  
- 原因字段为空 → 降级文案（「暂未返回详细原因，可咨询客服」），不要对用户展示 `reject-reason`  

### 多进度

多条申请并存时：列表或多卡，每条自带结论与 CTA；避免合成一句含糊总状态。

## 文案规则

- 结论短、可扫读  
- 原因用用户语言；法务条款可放「了解详情」  
- 导语可口语，但不替代结论标题  
- 主按钮与结论一致（未通过却写「完成」是错误）  

## 视觉

- 结论色：成功绿 / 警示橙 / 失败红 — 用于图标与标题点缀，不做整卡大底色  
- 卡圆角 24；内边距 24  
- 「查看详情」为主或次按场景；「咨询更多」保持次级  


---


# 申请链路与材料模块

模式来源：历史稿「方式一/二」「预申请…提交完成」「准备理赔材料」等。可迁移到任意多步骤申请 / 上报 / 提交类流程。

## 两种发起方式

| 方式 | 特征 | 复用点 |
|---|---|---|
| 说明页发起 | 独立说明页 → 同意协议并申请 | 材料清单 + 范围说明 + 底栏协议主按钮 |
| 助手内发起 | 对话/向导壳内推进 | 保留壳；步骤用卡片或半屏模块插入 |

## 推荐模块顺序（可裁剪）

```text
说明 / 预申请
→ 模式选择（若有分叉）
→ 对象或地点选择（如医院）
→ 上传 / 检索材料
→ 再次询问（澄清）
→ 必传字段确认
→ 补材（若缺）
→ 事件信息确认
→ 基础信息确认
→ 签名
→ 提交完成
```

不是每个需求都要全链路；按业务删减，但**不要打乱「先材料预期 → 再采集 → 再确认 → 再提交」的大顺序**。

## 材料准备页通式

```text
标题：准备…材料
必备材料清单（条目清晰）
了解范围（医院 / 时间 / 可赔项 / 费用类型…）
限制注记（免赔额等，靠近相关结论）
底栏：同意协议并申请（或等价主按钮）
```

权益差异（如有/无某服务）用同页变体，不另造无关布局。

## 选择与表单模块

- **模式选择**：大选项卡，一选一路径  
- **列表选择**：历史项置顶；选项文案过长用省略（历史稿注：超过约 15 字省略）  
- **必传字段确认卡**：只确认关键必传，不要做成冗长说明书  
- **补材卡**：缺什么、怎么补、主按钮去上传  
- **信息确认**：分组字段 + 可点改（如「是否手术」修改流单独成态）  
- **保单浮层**：半屏/浮层选对象，确认后回主流程  

## 提交完成页

```text
成功结论
后续预期（多久联系 / 如何查进度）
申请详情摘要
回到助手时的建议问法（若在向导壳内）
```

完成页仍保留一个清晰下一动（看详情 / 查进度 / 结束服务）。

## 对话向导壳（可选）

```text
状态条（服务中 / 进度）
Tab：服务 | 对话
内容区（说明卡或对话）
AI 声明
输入：按住说话 / 键盘
退出服务 | 人工 | 自助（按产品）
```

壳与业务步骤分离：换需求时换步骤内容，壳可复用。

## 组件提示

- 底栏主按钮：L 主按钮或 ButtonGroup  
- 协议：优先组件库协议+按钮变体  
- 上传、列表、筛选：用基础库 List / 上传模式，不手绘  
- 浮层：BottomSheet / FunctionalPopup，不用营销弹窗做确认  
