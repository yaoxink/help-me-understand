# 让我看懂 · help-me-understand

一个用于 Codex 的中文技能：把复杂材料讲清楚，按理解卡点选择文字、图解或交互网页，同时保留原文的条件、证据和不确定性。

它适合这样的时刻：AI 回答了一大段，你却还不知道它在解决什么问题、各部分怎样关联，或下一步应该做什么。

## 怎么用

安装后在 Codex 中调用：

```text
$help-me-understand 让我看懂这份材料，解释它怎样运作，以及结论在什么条件下成立。
```

也可以指定形式：

```text
$help-me-understand 用文字解释这句话，给一个具体例子。
$help-me-understand 把这份方案的流程、失败分支和核验环节画成 HTML。
$help-me-understand 让我调节参数，观察材料中有依据的关系如何变化。
```

| 理解卡点 | 默认交付 |
| --- | --- |
| 术语、判断或论述 | 中文解释和必要例子 |
| 组成、流程、关系或方案差异 | 简短结论和包含图的 HTML |
| 参数、情景或时间变化 | 有依据的交互 HTML |

普通润色和简单事实问答不强制生成网页。用户已经选好的形式优先。

## 安装

本仓库包含 `skills/help-me-understand/`。把该文件夹复制到 Codex 的技能目录；默认是 `~/.codex/skills/`。如果你配置了其他技能根目录，使用实际目录。

先克隆本仓库：

```powershell
git clone https://github.com/yaoxink/help-me-understand.git
Set-Location help-me-understand
```

PowerShell 示例，在本仓库根目录执行；目标已存在时会停止，避免覆盖个人版本：

```powershell
$skillsRoot = Join-Path $env:USERPROFILE '.codex\skills'
$skillDestination = Join-Path $skillsRoot 'help-me-understand'
if (Test-Path -LiteralPath $skillDestination) { throw '目标已存在，请先比较现有版本。' }
New-Item -ItemType Directory -Path $skillsRoot -Force | Out-Null
Copy-Item -LiteralPath '.\skills\help-me-understand' -Destination $skillDestination -Recurse
```

重新打开 Codex 聊天，在技能选择器中确认“让我看懂”可用，或输入 `$help-me-understand` 调用。

### 图解需要 visual-explainer

文字解释可独立使用。生成或修改 HTML 图解时，技能会读取并使用 [nicobailon/visual-explainer](https://github.com/nicobailon/visual-explainer)。本仓库不捆绑该依赖。

按[上游安装说明](https://github.com/nicobailon/visual-explainer#install)，Codex 使用上游仓库中的 `plugins/visual-explainer/`，复制到 `~/.codex/skills/visual-explainer/`。下面的示例使用新的临时目录克隆，目标已存在时停止：

```powershell
$upstreamCheckout = Join-Path $env:TEMP ('visual-explainer-' + [guid]::NewGuid().ToString())
$visualDestination = Join-Path $env:USERPROFILE '.codex\skills\visual-explainer'
if (Test-Path -LiteralPath $visualDestination) { throw 'visual-explainer 已存在，请按上游说明比较或更新。' }
git clone --depth 1 https://github.com/nicobailon/visual-explainer.git $upstreamCheckout
if ($LASTEXITCODE -ne 0) { throw '克隆上游失败。' }
New-Item -ItemType Directory -Path (Split-Path -Parent $visualDestination) -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $upstreamCheckout 'plugins\visual-explainer') -Destination $visualDestination -Recurse
```

上游功能可能有各自的浏览器、Node.js 或其他工具要求，以安装版本的 README 和 SKILL.md 为准。依赖不可读时，本技能会说明图解部分未完成，不会声称已经调用成功。

## 为什么输出会不同

技能先识别卡点，再选择适合的表达。它会补足因果中间环节，让图里的箭头、条件和失败分支对应真实材料；同时保留“可能”“尚未验证”和样本范围。

其中的表达方法受到 [Karpathy 关于理解模型输出的建议](https://x.com/karpathy/status/2105819303471976479)启发，并借鉴 [ASD-STE100](https://www.asd-ste100.org/about_STE.html) 的清晰表达原则。HTML 绘图由独立的 visual-explainer 实现。这是方法组合，不是新的模型，也没有已验证的通用理解率或节时收益。

## 能力与边界

- 解释需要原始材料或可定位的来源；不可读的内容会标明缺口。
- 教学例子和假设模型会显式标注，不充当真实研究或性能证据。
- 页面生成、页面检查、AI 接手和真人理解分别报告，不能相互替代。
- 正式视频、旁白与 MP4 制作仍遵循所在项目的视频流程；本技能不会自动启动付费生成。

仓库中的[行为验收案例](skills/help-me-understand/references/acceptance-cases.md)用于检查选路、语义保真、依赖缺失与交互计算。其[教学材料](skills/help-me-understand/references/teaching-source.md)是自拟测试数据，不是真实产品结果。

## 来源与许可

详见[来源说明](skills/help-me-understand/references/sources.md)及[第三方说明](THIRD_PARTY_NOTICES.md)。本次仅封装现有个人技能并移除本机路径；没有复制第三方项目源码、官方 STE 规范或私人对话。本仓库当前未指定整包许可证；visual-explainer 按上游 MIT 许可单独分发。
