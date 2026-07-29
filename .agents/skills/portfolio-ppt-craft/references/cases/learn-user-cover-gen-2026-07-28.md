# 学习拆解：用户封面生图能力（2026-07-28）

**只学不改。** Figma 未动用户稿。

用户点名：学习封面，**主要学习生图能力**。

页 `210:1793` 上两版封面并置：

| 帧 | 主视觉 hash | 气质 |
|----|-------------|------|
| `384:1795` | `cee3bd06…` | 夜工位写实/拟真 · 暖台灯×冷环境 |
| `423:1815` | `35bfd10f…` | 软 3D UI 控制台 · 靛蓝紫氛围 |

---

## 参考图 A：`384:1795` 夜工位

1. **主视觉锚点**
   - 满幅夜景工位；第一眼落在 **磨砂玻璃工具砖（内嵌 Figma/Sketch 等 3D 标）+ 暖台灯**，不是字本身

2. **生图怎么做氛围**
   - **一整张 16:9 满幅场景**进 `主视觉满幅` FILL；字在 Figma 叠，不烧进图
   - 左暗右亮：左留给字；右是灯、屏、道具
   - 景深浅：前景键帽/玻璃砖实，洞洞板过程稿虚

3. **材质清单（可命名 ≥ 5）**
   - 木纹台面、磨砂/透光亚克力砖、哑光键帽、纸面线稿、金属灯臂、多肉

4. **光**
   - 主：台灯钨丝暖；辅：冷蓝环境/屏光；短软接触影；局部高光在玻璃棱

5. **可迁移生图要点**
   - 软件标必须是 **厚玻璃砖/立体块**，不是平面贴纸
   - 过程稿钉在洞洞板上作次层叙事（User Journey / Wireframe / Flow）
   - 左可读区靠场景暗部 + 可选线性罩（本帧有 `左侧可读罩`）

6. **不要学成**
   - 空桌白模；只有一颗抽象球当封面；无光源方向的平光棚拍

---

## 参考图 B：`423:1815` 软 3D UI 控制台（生图重点）

1. **主视觉锚点**
   - **厚实体 UI 控制台板**（浮雕按钮 / 开关 / UX 立体字 / 状态条）+ 压在板上的 **线稿本** + 彩软标砖

2. **生图怎么做氛围**
   - 仍是 **单张满幅 16:9**；左上更空暗，给白字；右下道具堆密度高
   - 靛蓝 / 深紫氛围底（非平涂紫渐变墙，是场景色温）
   - 无单独可读罩层——**可读性写进生图构图**

3. **材质清单（可命名 ≥ 5）**
   - 哑光金属/塑胶控制台、软圆角粘土感控件、透光紫 UX 体块、纸本+便利贴、毛绒点缀、彩漆软标砖

4. **光**
   - 右向主光、长软影向左；控件自发光边缘克制；无满屏 bloom

5. **字阶（用户手叠 · 只学结构）**
   - `2026` 60 白 @0.6 → `DESIGN PORTFOLIO` 40 白 → `设计作品集` 160 FZChaoCuHei tracking 3% → 细分隔线 → `何怡文` 40 @0.5
   - 生图 **零烧字**；姓名是否出现以用户稿为准（本帧用户自加）

6. **可迁移生图要点（相对 Agent 旧错）**
   - ❌ 单物体棚拍（孤立玻璃球/飘带）当封面主锚  
   - ✅ **叙事场景**：工具实体化 + 过程纸本 + 控件板，一帧讲「我是做体验/界面的」
   - ❌ 假 UI 糊成不可读手机框  
   - ✅ UI 以 **可触摸浮雕控件 / 状态按钮** 出现，不是糊截图
   - ❌ 平面 logo 贴图  
   - ✅ logo 是 **彩色立体砖 / 玻璃砖内嵌**

7. **不要学**
   - 为满而塞无叙事杂物；彩虹霓虹；把姓名烧进主视觉图

---

## 生图能力：对照表（用户稿 vs Agent 旧法）

| 维度 | 用户封面生图 | Agent 易错 |
|------|--------------|------------|
| 画幅 | 满幅 16:9 一整场 | 方图单物再硬塞 |
| 主锚 | 可叙述的工位/控制台场景 | 抽象装饰物冒充封面 |
| 材质密度 | 单帧 ≥ 4–5 种可命名材质 | 一种塑料/一种玻璃 |
| 工具识别 | 立体软标砖 / 玻璃砖 | 平面贴纸或无识别 |
| 过程感 | 线稿本 / 洞洞板图 | 无过程层 |
| 光 | 有方向的暖冷对打或侧光 | 平光棚拍 |
| 字 | Figma 叠字，图内无标题 | 偶发烧字或左区不够暗 |
| 色彩 | 夜工位青绿橙 **或** 靛蓝软 3D | 脏饱和蓝 / 乱紫 |

---

## 可复用提示词骨架（封面场景 · 从用户稿反推）

```text
[类型] 满幅封面主视觉场景（单张 16:9），非整页假 PPT
[平台气质] Designer portfolio cover, cinematic, premium, screen-readable
[构图] Left third darker/clearer for typography overlay; right denser props
[主锚二选一]
  A) Night desk: warm desk lamp × cool ambient; frosted acrylic tool bricks
     with 3D software marks; pegboard process papers; wood desk; keyboard
  B) Soft-3D UI console board: thick relief buttons/toggles/UX block;
     colorful physical software tiles; open wireframe sketchbook + sticky notes;
     deep indigo atmosphere
[材质] ≥4 nameable: frosted acrylic / matte plastic / paper fiber / metal /
       wood or soft clay relief — mixed in one frame
[光] Clear key direction; short soft contact shadows; restrained edge glow only
[禁止] Flat logo stickers; empty white clay stage; single abstract sphere as hero;
       burned-in titles; fake unreadable phone UI; neon rainbow; film grain
[输出] Full-bleed 1920×1080-ready; no text in image; sharp hero, soft depth
```

---

## 协作

- 「学习」= 只写 cases / techniques / playbook，**不改** `384:1795` / `423:1815`
- 后续封面生图：优先复刻上表「用户封面生图」列，再叠用户字阶
