# 改稿纪律与反例

## 必做

1. 改前截图 + metadata；改后截图验收。  
2. 整页任务：`figma-use` + `figma-generate-design`；`skillNames` 带上二者。  
3. 分区施工：结论 → 卡片/清单 → 底栏；每区完成后 `screenshot`。  
4. 更新已有 Frame：保留背景矩形与 TopBar Instance，只动内容。  
5. 按钮：`importComponentSetByKeyAsync` 或克隆画板实例；设文案时按节点实际 `fontName` loadFont。  
6. Auto Layout 组织有结构关系的子节点；先 `appendChild` 再设 `FILL`/`HUG`。  
7. 返回所有创建/修改的 nodeId。  

## 禁止 / 易错

| 反例 | 正确做法 |
|---|---|
| 无视 demo 自造流程分支 | 按粘贴图与双场景地图 |
| 把结果页做成成功插画页 | 材料核对诊断结构 |
| 挂号页做 3+ 个同权入口 | 仅双兜底 CTA |
| 删除并重画整页含背景 | 保背景与 TopBar |
| 手绘圆角蓝按钮 | Button 组件实例 |
| emoji 当正式图标 | 矢量 / 功能图标组件 |
| `createRoundedRectangle` | `createRectangle` + `cornerRadius` |
| 字号 54+ 撑破卡片 | 遵循 Title/Body 阶梯 |
| 两颗同色主按钮 | 主 + 次 |
| 本地变量空 = 无 token | 再查库变量 / 沿用语义色值 |

## 字体陷阱

部分 Button 实例文本 font family 可能写成 `Pingfang SC`（错误大小写）。  
`loadFontAsync` 失败时：改用 `PingFang SC` Medium/Regular 写回后再改 `characters`。

## 与用户反馈的对应

| 用户反馈 | 固化规则 |
|---|---|
| 内容要跟产品 demo | Demo 真源优先 |
| 挂号有两个兜底 | 双 CTA，不扩路径 |
| 结果页是材料核对 | 诊断信息架构 |
| 多材料要重排层级 | 异常 → 核心凭证 → 时间降序 |
| 不要改背景 | 保背景层 |
| 不要 AI 很丑的通用风 | 支付宝 token + 组件 |
| 不要乱发明可赔概率 | 无 demo 不写 |

## 最小交付包

每次改页交付：

1. 变更说明（保留了什么 / 重建了什么）  
2. 关键 nodeId  
3. 整页截图  
4. 若有双状态（齐全/未齐），两态都截  
