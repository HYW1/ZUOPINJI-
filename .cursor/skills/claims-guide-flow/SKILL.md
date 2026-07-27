---
name: claims-guide-flow
description: Product experience skill for 理赔向导 / 医疗费用快捷报销. Encodes the Figma design drafts, demo-fed copy, dual-scenario flow (已就医 / 仅挂号), materials diagnosis result page, registration fallback dual CTAs, and edit constraints. Load together with alipay-app-design-system for any claim-guide, reimbursement, medical-service, fallback, or materials-check design task — even when the user only pastes a Figma link or says 改下这个页面.
---

# 理赔向导流程体验规范

本 skill 把**用户喂入的业务规范**与**已落地的设计稿**合并成可执行约束。视觉与组件层遵循 [支付宝 APP 基础规范](../alipay-app-design-system/SKILL.md)；本 skill 负责**信息架构、场景分流、页面模板、文案结论、材料排序、改稿纪律**。

## 何时启用

自动用于：

- 理赔向导、快捷报销、就医服务、材料核对、疾病查查
- Figma 文件 `DLepVQbX1Ll21Y2fh1kmyU` 上的改稿、补页、连线
- 用户粘贴 demo 截图 / 产品图并要求「按这个做」
- 模糊指令：`把后续流程做完`、`重新设计兜底`、`结果页改成材料核对`

不替代支付宝设计系统。二者冲突时：

1. 用户当次明确要求  
2. Demo / 粘贴图中的真实内容  
3. 本 skill 的场景与页面规则  
4. 支付宝 APP 设计系统  
5. 通用 UI 灵感  

## 设计源文件

| 项 | 值 |
|---|---|
| File | `DLepVQbX1Ll21Y2fh1kmyU` |
| URL | https://www.figma.com/design/DLepVQbX1Ll21Y2fh1kmyU/Untitled |
| Canvas | `750 × 1624`（2×） |
| Font | PingFang SC（Regular / Medium / Semibold） |
| Number font | Alibaba Sans 102 Ver2（金额、数量） |

场景行标签：

- `1、已就医`（约 x≈2001）
- `2、仅挂号`（约 x≈9415）

完整节点地图见 [flow-map.md](references/flow-map.md)。

## 核心工作纪律（来自反复反馈）

1. **Demo 优先**：用户粘贴的产品图 / 截图是文案与结构的真源。禁止自由发明路径、概率文案、额外入口。
2. **先结论后解释**：页面首屏先说系统判断结果，再展开依据与操作。
3. **一页一主动作**：次要动作用次按钮或文字链，不要两个同权主按钮。
4. **改内容不改背景**：更新已有画板时，默认保留背景层与 TopBar；只重建内容区与底栏（用户明确要求改背景除外）。
5. **复用组件实例**：按钮、TopBar、Home Indicator 用库组件或画板现有实例克隆，禁止手绘双按钮冒充规范。
6. **拒绝 AI 通用皮**：无紫渐变、无玻璃拟态、无装饰光晕、无大段宣传腔、无 emoji 堆砌充当图标。
7. **挂号场景只有两个兜底**：精准查询能不能赔 + 理赔申请协助（落地按钮文案见下方模板）。

## 双场景分流

```text
入口（授权 / 发现可报销票据）
        │
        ├─ 已就医 ──► 选就医记录 → 选保单 → 确认就医情况 → 材料核对结果 → 申请
        │
        └─ 仅挂号 ──► 就医服务兜底（保单仍保障）
                        ├─ 查查能不能赔（疾病查查）
                        └─ 了解报销规则（理赔说明 / 申请协助）
```

详细步骤与代表节点：[flow-map.md](references/flow-map.md)  
各页模板：[page-patterns.md](references/page-patterns.md)

## 关键页面模板（摘要）

### A. 材料核对结果页（已就医终点）

不是「提交成功」庆祝页，而是**材料核对诊断页**。

信息顺序固定：

1. **结论** — 例如「已核对，可申请理赔」/「已预存材料，待收齐」  
2. **统计** — 已保存 / 识别成功（或未上传）/ 待处理  
3. **材料清单** — 门诊病历、医疗票据、费用明细清单…（必传标签 + 示例）  
4. **规则 / 帮助** — 「材料准备有困难？咨询理赔向导」  
5. **行动** — 主按钮对齐结论（如「材料齐全，申请理赔」）

多份材料排序规则见 [materials-diagnosis.md](references/materials-diagnosis.md)：

- 异常 / 待处理置顶  
- 核心凭证优先（病历 → 发票 → 费用清单）  
- 同类型按就诊时间降序  

### B. 仅挂号 · 就医服务兜底

结构：

1. 蓝底结论卡：「你的保单继续保障中」  
2. 保单状态确认（产品名 + 保障中 + 免赔额提示）  
3. 后续服务已准备就绪（恰好 3 条可执行承诺）  
4. **双兜底底栏**  
   - 次按钮：`了解报销规则`（理赔申请协助 / 规则说明）  
   - 主按钮：`查查能不能赔`（精准查询）

禁止再加第三条主路径、可赔概率条、营销堆叠。详见 [registration-fallback.md](references/registration-fallback.md)。

### C. 保单选择 / 就医情况（步骤页）

- 步骤指示：`第 N 步 / 3`  
- 标题说清任务：`选择用于报销的保单` / `确认就医情况`  
- 推荐保单给「推荐」标签 + 一句推荐理由（基于发票类型，不作最终承保承诺）  
- 合规脚注保留：`*推荐仅基于发票类型初步判断，最终以保险公司审核结论为准`

### D. 授权 / 就医选择

- 首句任务：`以下可以快捷申请理赔` / `获取你的就医发票`  
- 列表字段：医院、就诊时间、就诊金额、票据号码  
- 底栏：`取消` + `下一步`；旁路文案可保留 `没就医，先查查疾病能不能赔`

## Figma 改稿流程

1. 加载 `figma-use`；整页改稿再加载 `figma-generate-design`。  
2. `get_metadata` + `get_screenshot` 确认当前节点；对照 demo 图。  
3. 先查画板已有实例（Button / TopBar），再 `search_design_system`。  
4. **按区块改**：结论 → 清单/卡片 → 底栏；每区截图校验。  
5. 保留背景与 TopBar ID；删除并重建的是内容层。  
6. 字体断言：正文必须是 `PingFang SC`（注意组件内偶发错误名 `Pingfang SC`，改文案前先 load / 回退到正确 family）。  
7. 禁止 `figma.createRoundedRectangle`；用 `createRectangle` + `cornerRadius`。  

细则：[working-rules.md](references/working-rules.md)

## 文案语气

- 用用户词：就医记录、费用清单、收款账户、能不能赔  
- 不用实现词：OCR、接口、命中模型、路由  
- 动作按结果命名：`申请理赔`、`查查能不能赔`、`了解报销规则`  
- 异常说清「缺什么 + 怎么补」  
- 交易流程避免宣传腔与表情符号当信息图标  

## 验收清单

- [ ] 场景归属正确（已就医 / 仅挂号），没有串戏入口  
- [ ] 结论在解释之前出现  
- [ ] 挂号兜底仍是且仅是两个底栏动作  
- [ ] 结果页是材料诊断，不是空成功页  
- [ ] 材料排序符合核心凭证 / 时间 / 异常规则  
- [ ] 背景与 TopBar 未被误改（除非用户要求）  
- [ ] 底栏按钮为组件实例，主/次层级正确  
- [ ] 截图检查无裁切、无重叠、无过大标题撑破卡片  
- [ ] 文案与 demo 一致；无自造概率或额外分支  

## 参考文件

- [source-of-truth.md](references/source-of-truth.md) — 真源优先级与文件坐标  
- [flow-map.md](references/flow-map.md) — 场景与画板节点地图  
- [page-patterns.md](references/page-patterns.md) — 页面结构模板  
- [materials-diagnosis.md](references/materials-diagnosis.md) — 材料核对页与排序  
- [registration-fallback.md](references/registration-fallback.md) — 挂号双兜底  
- [working-rules.md](references/working-rules.md) — 改稿纪律与反例  
