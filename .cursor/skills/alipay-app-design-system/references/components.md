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
