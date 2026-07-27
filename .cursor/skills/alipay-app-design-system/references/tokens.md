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
