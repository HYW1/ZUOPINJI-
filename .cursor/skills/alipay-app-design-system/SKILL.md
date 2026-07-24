---
name: alipay-app-design-system
description: Use this skill when designing, rebuilding, or reviewing Alipay/Ant-style mobile, mini-program, or H5 product interfaces in Figma. Applies the provided 支付宝 APP 基础精简 design system, including semantic tokens, 750px canvas rules, typography, spacing, navigation, buttons, lists, inputs, feedback, empty states, popups, and bottom sheets. Trigger for 支付宝、蚂蚁、小程序、保险、理赔、金融服务、750 稿、APP 基础规范, or when a design should stop looking generically AI-generated and conform to the source Figma component library.
---

# Alipay APP Design System

Use the supplied Figma library as the source of truth:

- File: `4Q2KGg9fstrN2BWCwYChzi`
- Page: `23:1873` — `Components通用基础组件`
- URL: <https://www.figma.com/design/4Q2KGg9fstrN2BWCwYChzi/支付宝APP基础精简--Copy-?node-id=23-1873>

This is a product design system, not a visual mood board. Reuse its semantic variables and published components before drawing new primitives.

## Required workflow

1. **Confirm the platform**
   - Distinguish 小程序, H5, and native APP.
   - Default Figma canvas is `750 × 1624` at 2× design scale.
   - Keep all values in this skill at Figma scale. Divide numeric dimensions by 2 only when implementing a 375px logical-width interface in code.

2. **Load the Figma workflow**
   - Before any `use_figma` call, load `figma-use`.
   - For full screens, also load `figma-generate-design`.
   - Inspect the target file for existing instances before importing components.

3. **Use semantic tokens**
   - Use the `APP` collection for product UI.
   - Use `Base` only to understand or extend the scale.
   - Never replace semantic text colors with arbitrary grays.
   - Never create a second blue that competes with `Color/Brand`.

4. **Reuse components**
   - Import or clone the source component when a matching pattern exists.
   - Preserve component variant axes and native dimensions.
   - Do not detach instances merely to change copy.
   - See [components.md](references/components.md) for component keys and selection guidance.

5. **Structure the screen**
   - Use Auto Layout for navigation, content groups, lists, cards, forms, and bottom actions.
   - Page width is 750; standard content width is 718 with 16px side padding.
   - Use a card only when content is a meaningful group, not as decoration around every paragraph.
   - Keep one primary action per screen. Use `ButtonGroup` when agreement or secondary actions are required.

6. **Design all relevant states**
   - Default, selected, disabled, loading, success, warning/failure, empty, and retry states.
   - Use the library's `Result`, `Toast`, `Banner`, `BlankPage`, and popup components instead of inventing status banners.

7. **Validate**
   - Screenshot every representative screen.
   - Check text hierarchy, long Chinese copy, numeric alignment, component dimensions, content clipping, fixed action-bar overlap, and platform-specific navigation.

## Core visual rules

### Color

- Brand, button, and link: `#1677FF`
- Primary text: black at 80%
- Secondary text: black at 60%
- Tertiary text: black at 40%
- Disabled text: black at 10%
- Divider: black at 6%
- Page background: `#F0F3F7`
- Card background: `#FFFFFF`
- Inner card background: `#F9FAFC`
- Success: `#00B865`
- Notice: `#FF5E1A`
- Alert/failure: `#FF1A3C`

Do not use semantic status colors as large decorative backgrounds. Use them for icons, labels, borders, and action-critical messages.

### Typography

- Chinese: PingFang SC
- Numbers and money: Alibaba Sans 102 Ver2
- Display: 48 / 72, Medium
- Status title: 40 / 60, Medium
- Title L: 36 / 56, Medium
- Title M: 32 / 48, Medium
- Title S: 28 / 42, Medium
- Body L: 30 / 45, Regular
- Body M: 28 / 42, Regular
- Body S / Caption: 24 / 36, Regular
- Tag: 20 / 30, Regular

Use Medium for hierarchy, not blanket emphasis. Use the number font for prices, totals, balances, dates, and identifiers when the surrounding component does so.

### Spacing and radius

- Base spacing scale: `4, 8, 12, 16, 24, 32, 40, 48, 64, 72, 80, 88, 96`
- Page padding: 16
- Card gap: 16
- Card and inner-card padding: 24
- Page card radius: 32
- Card radius: 24
- Inner card radius: 16
- Element radius: 8
- Dialog radius: 48
- Button radius: 100

Use the named semantic spacing first. Do not select a spacing value merely because it looks close.

## Product-writing rules

- Name actions by their result: `提交申请`, `重新上传`, `查看进度`.
- Put the conclusion before the explanation.
- Keep button language consistent with the following result or toast.
- Error states must say what failed and how to recover.
- Empty states must provide the next available action.
- Avoid promotional wording in transactional flows.

## Anti-patterns

- Do not use AI-purple gradients, glassmorphism, glow, or decorative blobs.
- Do not add a gradient hero to ordinary product forms or claim flows.
- Do not place every text block in a rounded floating card.
- Do not mix custom icons with library icons.
- Do not use two equally dominant primary buttons.
- Do not make all text bold.
- Do not use illustrations when a status component or direct explanation is sufficient.
- Do not create custom checkboxes, switches, top bars, toasts, dialogs, or result pages when the library has them.
- Do not use marketing popup variants for functional confirmation.

## Reference files

- [tokens.md](references/tokens.md) — complete semantic token values and typography scale
- [components.md](references/components.md) — component keys, dimensions, and when to use them
- [layout-and-content.md](references/layout-and-content.md) — page anatomy, content hierarchy, states, and QA checklist
