# 来源与组合边界

本组合版整理日期：2026-10-13。可移植发布封装日期：2026-10-29。

## 用户提供的基础包

- 输入：`help-me-understand.zip`，内部主入口为 `help-me-understand/SKILL.md`。
- 采用其理解卡点选择、中文表达适配、语义与来源保真、反馈调整，以及自拟资料处理器和行为案例。
- 原包的 `references/sources.md` 记载了 2026-10-09 的规范与研究核验声明。本次没有重新核验全部外部文献，也不把原包的声明升级为组合版已验证结果。
- 原包的 SVG 与 HTML 示例没有作为本版绘图模板；图解由用户明确指定的 visual-explainer 负责。

## 方法线索

- [Karpathy 原帖](https://x.com/karpathy/status/2105819303471976479)：文字、图示、网页与定制讲解视频的建议。2026-10-29 原帖直接读取返回 403；本次通过[公开镜像](https://xitter.cf/karpathy/status/2105819303471976479)核对了相关文字。它是个人建议，不能视为已经验证的理解收益。
- [ASD-STE100 官方介绍](https://www.asd-ste100.org/about_STE.html) 与 [官方下载入口](https://www.asd-ste100.org/STE_downloads.html)：正式英文规范及词典的权威入口。此 Skill 只借鉴表达原则，不附官方完整规范、词典或其翻译。
- [社区 asd-ste100-skill](https://github.com/danyuchn/asd-ste100-skill)：本次会话此前检查了其英文改写规则与结构检查器。未复制其程序，也不把检查通过作为中文语义、业务门禁或理解效果证明。

## 图解依赖与开发参考

- [nicobailon/visual-explainer](https://github.com/nicobailon/visual-explainer)：图解和 HTML 实现依赖。2026-10-13 整合时读取版本 0.12.0；2026-10-29 本机入口标记为 0.14.0。后续运行读取目标环境当前安装版本，不冻结或复制整份依赖。Codex 默认入口为 `~/.codex/skills/visual-explainer/SKILL.md`，安装源目录见上游 README。
- 依赖的 `references/style-guide.md` 和按需 `references/diagrams.md`：样式、SVG 与交互方法。
- Codex 内置 `skill-creator`：开发时参考其技能结构、渐进加载、UI 元数据及验证规范；不是运行本技能的附加依赖。

用户指定的 visual-explainer 需在目标环境中可读。单独分发本包不表示该依赖已同时安装；不得伪报调用成功。

## 新增的个人使用约定

实际用途先行、按需展开、交接可独立续接、当前权威状态优先，以及把文件、页面检查、AI 接手、真人理解与真实使用分开报告。它们服务于当前用户的工作方式，不是 STE 标准中的规则。
