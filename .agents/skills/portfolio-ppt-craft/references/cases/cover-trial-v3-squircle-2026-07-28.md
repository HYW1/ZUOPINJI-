# 案例纠偏：试稿 v3 · 禁立砖 → 大圆角正方形软标（2026-07-28）

用户反馈：

> 谁家好人作品集里用砖，你想砸死谁，都是正方形啊，大圆角，你这啥啊

**协作**：只改 Agent 试稿 `435:1793`；未动用户 `384` / `423`。

---

## 形状纠偏

| | 错（v1–v2） | 对（v3） |
|--|------------|---------|
| 外形 | 高立矩形「奖杯亚克力砖 / 墓碑砖」 | **正方形面 + 大圆角**（squircle / iOS icon 感） |
| 厚度感 | 像能砸人的实心砖 | 短厚软标板 / 软触 app-icon 体 |
| 术语 | 误把「工具砖」理解成立砖 | 改称 **软标砖 / squircle 软标** |

主视觉 hash：`c6a71fc4d3372a6e728f9e5dda7c9d34099b2016`  
本地：`/opt/cursor/artifacts/assets/cover-trial-squircle-right-v7.png`  
Figma：https://www.figma.com/design/ZXibIc4lflyHRoTF7OQV0L/skill?node-id=435-1793  
帧名：`封面 · Agent试稿 v3（大圆角正方形软标·禁立砖）`

顺带：标放右侧，左 1/3 留给字（v6 曾压字，已弃）。

保留：MacBook 硬件锚；无 Win 机械键盘。

---

## 生图闸门补丁

1. 软件识别物必须是 **正方形 + 大圆角**（圆角半径约边长 20%+）  
2. **禁止** 高立矩形亚克力奖杯砖 / 墓碑砖 / 建筑砖块感  
3. 提示词禁用 `tall rectangular acrylic brick/trophy/tombstone`；改用 `squircle tile` / `rounded-square soft app-icon slab`  
4. 标落右密区，勿压左字阶  

---

## 对旧文档的词义纠正

此前 T-036 写「磨砂工具砖」——用户稿语境是 **厚圆角软体块**，不是立砖。后续一律写「大圆角正方形软标」。
