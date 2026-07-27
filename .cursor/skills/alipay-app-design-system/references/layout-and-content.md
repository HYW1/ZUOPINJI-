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
