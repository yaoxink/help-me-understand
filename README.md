# 让我看懂｜把复杂内容讲明白

看不懂文档、技术方案或复杂概念时，用通俗中文、具体例子、流程图或交互网页，帮你弄清“是什么、怎么运作、为什么”。没懂的地方可以继续追问，换个例子或拆开步骤解释，同时保留关键事实、适用条件和不确定性。

`help-me-understand` 是一个用于 Codex 等技能宿主的中文理解技能。当前独立分发版为 **1.2.1**：单个 Skill，自带图解方法、渲染工具和必要 JavaScript 库，**不需要另外安装或调用其他 Skill**。

**大小：ZIP 2.22 MB，解压后 9.55 MB（9,548,759 字节），低于 10 MB 上限。** 保持原有技能流程、图解框架和运行功能；仅移除未使用的浏览器调试界面资源，并精简运行代码的格式空白。

## 下载与安装

- [下载 1.2.1 独立技能包](https://github.com/yaoxink/help-me-understand/releases/download/v1.2.1/help-me-understand-1.2.1.zip)
- [查看版本发布页](https://github.com/yaoxink/help-me-understand/releases/tag/v1.2.1)
- 技能源码位于 [`skills/help-me-understand/`](skills/help-me-understand/)。

ZIP 内根目录是 `SKILL.md`、`agents/`、`references/`、`scripts/` 和 `assets/`。解压时新建名为 `help-me-understand` 的文件夹，再把整个文件夹放入宿主的技能目录。Codex 默认目录是 `~/.codex/skills/`；已有同名技能时先比较，不直接覆盖。

也可以克隆仓库。在仓库根目录执行以下 PowerShell 命令，将技能文件夹复制到 Codex；目标已存在会停止：

```powershell
git clone https://github.com/yaoxink/help-me-understand.git
Set-Location help-me-understand
$skillsRoot = Join-Path $env:USERPROFILE '.codex\skills'
$skillDestination = Join-Path $skillsRoot 'help-me-understand'
if (Test-Path -LiteralPath $skillDestination) { throw '目标已存在，请先比较现有版本。' }
New-Item -ItemType Directory -Path $skillsRoot -Force | Out-Null
Copy-Item -LiteralPath '.\skills\help-me-understand' -Destination $skillDestination -Recurse
```

重新打开 Codex 聊天，在技能选择器中确认“让我看懂”，或显式调用 `$help-me-understand`。其他宿主按其技能加载规则安装；本仓库不承诺所有宿主都自动发现。

## 怎么用

把材料、文件或可访问的链接交给 AI，再说：

```text
$help-me-understand 帮我看懂这份材料，解释它怎样运作、有什么限制。
$help-me-understand 用文字解释这句话，给一个具体例子。
$help-me-understand 把这份方案的流程、失败分支和核验环节画成 HTML。
$help-me-understand 让我调节参数，观察材料中有依据的关系如何变化。
$help-me-understand 还是没懂，为什么生成完成不代表内容已经核对？
```

| 需要看懂什么 | 默认交付 |
| --- | --- |
| 一个术语、判断或论述 | 通俗中文和必要例子 |
| 组成、流程、关系或方案差异 | 简短结论和 HTML 图解 |
| 参数、情景或时间变化 | 有依据的交互 HTML |

用户指定的形式优先。简单问题不强制做网页；没有依据的内容不会靠猜测补齐。教学模型与真实预测分开标注。

## 图解运行条件

文字解释需要能读取材料的 AI 助手。使用内置图解工具与实际浏览器检查，还需要：

- **Node.js 20+**。
- 本机已有 **Chrome、Edge 或 Chromium**。
- 生成文件的读取和写入权限。

JavaScript 依赖已随包提供，**不需要 npm 下载、API 密钥或付费服务**。浏览器二进制没有塞进 ZIP。缺少运行条件时必须说明未完成项，不能把跳过检查写成通过。

在仓库根目录可以先验证环境：

```powershell
node skills/help-me-understand/scripts/preflight.mjs
```

渲染与导出示例：

```powershell
node skills/help-me-understand/scripts/render.mjs diagrams/example.src.html
node skills/help-me-understand/scripts/export.mjs diagrams/example.html --format svg --out diagrams/example.svg
node skills/help-me-understand/scripts/export.mjs diagrams/example.html --format png --out diagrams/example.png
node skills/help-me-understand/scripts/export.mjs diagrams/example.html --format pdf --out diagrams/example.pdf
```

源文件及图解方法见 [SKILL.md](skills/help-me-understand/SKILL.md) 和 [图解方法](skills/help-me-understand/references/visual-methods.md)。默认输出离线可用的单文件 HTML；Mermaid 实际渲染成 SVG。图文联动、步骤回放、读者评论和问题汇总均在包内实现。反馈不会自动向外发送。

PDF 默认导出适合图形尺寸的单页；需要整个网页的 A4 打印版时使用 `--page`。多个 SVG 时应使用 `--selector` 指定要导出的图。

## 已验证的范围

1.2.1 已进行独立调用与对照验收：

- 对同一份原版源码，原有核心 CSS、JS、SVG 保持一致；额外修复禁用 JavaScript 和打印时的可读性。
- 在既有独立试用基础上复跑 **42 项真实离线浏览器检查**，另完成 **7 组综合复核**；两者有重叠，不能相加为独立样本数。
- 检查包括流程与证据边界、桌面/窄屏、播放暂停重置、键盘、图文联动、反馈汇总、计算与无效输入、禁 JS、打印、Mermaid 以及 SVG/PNG/PDF 导出。
- 最终 ZIP 解压后的运行检查、技能结构检查与 SkillHub 本地发布预检通过。未据此声称已经发布到 SkillHub。

技能仍需对每份新材料核对事实与图形关系。上述检查不证明所有模型与系统输出相同，也不证明真人已理解或具有实际业务收益。

[行为验收案例](skills/help-me-understand/references/acceptance-cases.md)与[教学材料](skills/help-me-understand/references/teaching-source.md)可用于后续复验；其中的系统、观察和模型均为自拟教学数据。

## 边界与许可

正式视频、旁白和 MP4 仍需另行选择并授权相应制作工具或项目流程；本技能不会自动付费、上传或发布。

来源及修改见[来源说明](skills/help-me-understand/references/sources.md)与[第三方说明](THIRD_PARTY_NOTICES.md)。本仓库未为整包新增许可证。所捆绑运行库的 MIT、Apache-2.0 和附带第三方许可均保留在技能目录内；这些许可不自动覆盖其他文件。
