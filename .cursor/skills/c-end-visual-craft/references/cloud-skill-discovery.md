# Cloud：菜单显示 vs 仓库技能加载

> 验证会话：Cloud Agent「云菜单仓库技能显示」  
> 仓库：`HYW1/zuopinji-` · 技能：`c-end-visual-craft`  
> 日期：2026-07-27

## 现象

在 Cursor Cloud 中，斜杠菜单 / 技能选择器**有时只列出内置（或插件）技能**，看不到仓库里的项目技能（如 `/c-end-visual-craft`）。

同一会话里，Agent **仍可加载并遵循**仓库中的项目技能文件。

## 已核实路径

本仓库双路径安装（提高发现率）：

| 路径 | 作用 |
|------|------|
| `.cursor/skills/c-end-visual-craft/` | Cursor 项目技能约定路径 |
| `.agents/skills/c-end-visual-craft/` | Agents 发现路径（与上同步） |

本次 Cloud 会话中：

1. UI 菜单可能未暴露 `c-end-visual-craft`
2. 工作区仍包含完整 `SKILL.md` + references
3. 用户显式说「用 c-end-visual-craft skill」后，Agent 可直接读取并按 Skill 流程执行

## 结论

| 层 | 行为 |
|----|------|
| **前端菜单** | 偶发只显示内置项 → 不可作为「技能未安装」的证据 |
| **后端 / 工作区** | 仍会检出并可读仓库技能 → 显式点名即可启用 |

## 推荐用法（Cloud）

菜单里看不到时，仍可这样触发：

```text
用 c-end-visual-craft skill
```

或描述触发词（见 `SKILL.md` description）：视觉质感 / 去AI感 / 主视觉 / 材质光影 / 参考图拆解 等。

Agent 应：

1. 读取 `.cursor/skills/c-end-visual-craft/SKILL.md`（或 `.agents/skills/...` 副本）
2. 按强制工作顺序执行（先参考拆解 → 技巧固化 → 诊断 → 模块生图 → 验收）
3. **不要**因菜单缺失而改用通用模板或跳过本 Skill

## 安装维护

- 合并到 `main` 后，新 Cloud 会话才能稳定读到技能文件
- 改 Skill 时同步更新 `.cursor/skills` 与 `.agents/skills` 两处副本
- 菜单发现失败 ≠ 卸载；先查工作区文件是否存在
