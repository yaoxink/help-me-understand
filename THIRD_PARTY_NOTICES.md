# 来源与第三方说明

本文件记录当前1.2.0发布包的来源与许可边界，不为整包新增许可证。

## help-me-understand 原始输入包

本包来自用户现有的 help-me-understand 个人技能。原有来源记录提到输入包 help-me-understand.zip；未据此核定整包完整权利来源，因此继续保留未指定整包许可证的状态，不新增MIT或Apache-2.0等整包授权。

1.2.0只更新发布副本，保留理解卡点、中文保真、来源边界、反馈修正和自拟教学材料；未修改本机个人技能。整包再分发与商业许可范围由维护者核定。本文件中的第三方许可只适用于相应组件。

## 内置图解运行代码与参考

- 来源项目：[nicobailon/visual-explainer](https://github.com/nicobailon/visual-explainer)，本次纳入的本地版本为0.14.0。
- MIT，Copyright (c) 2025 Nico Bailon。完整声明见 [`VISUAL-EXPLAINER-LICENSE`](skills/help-me-understand/assets/runtime/VISUAL-EXPLAINER-LICENSE)。
- 用途：必要的样式、SVG/数据组件、步骤回放、图文联动、读者反馈、Mermaid渲染和几何检查。本次已随包提供，**不再要求单独安装其他Skill**。
- 改动：增加单包脚本入口、去除远程字体引用、检查器采用禁网内存载入方式；增加禁JS与打印修复、浏览器探测及真实图文件导出。修改只在本发布包发生。
- 未纳入第二个Skill入口、上游宿主插件或全部视频/幻灯片工作流。

## Pele Mermaid 引擎与图标

- 离线Mermaid渲染器随图解库分发，MIT，Copyright (c) 2026 kepano。
- 其中Lucide图标按其ISC许可分发。
- 完整版权及许可见 [`PELE-LICENSE`](skills/help-me-understand/assets/runtime/kit/vendor/PELE-LICENSE)。

## playwright-core 浏览器客户端

- 来源：[Microsoft Playwright](https://github.com/microsoft/playwright)，本次内置 playwright-core 1.64.1。
- Apache-2.0；保留原始 [`LICENSE`](skills/help-me-understand/assets/runtime/browser-client/LICENSE)、[`NOTICE`](skills/help-me-understand/assets/runtime/browser-client/NOTICE)及 [`ThirdPartyNotices.txt`](skills/help-me-understand/assets/runtime/browser-client/ThirdPartyNotices.txt)。
- 用于本机隔离浏览器检查和图文件导出；不包含浏览器二进制，不自动下载浏览器。
- 移除了该客户端中仅供其CLI安装用的Skill文档与示例，API运行代码和许可保留。本包只有一个Skill入口。

## 方法参考

- [Andrej Karpathy 原帖](https://x.com/karpathy/status/2105819303471976479)：关于用清晰文字、图示、HTML 与定制视频理解模型输出的个人建议。原文与附图不随包分发。2026-10-29 直接请求原帖返回 403；相关文字通过[公开镜像](https://xitter.cf/karpathy/status/2105819303471976479)核对。
- [ASD-STE100 官方介绍](https://www.asd-ste100.org/about_STE.html)与[下载入口](https://www.asd-ste100.org/STE_downloads.html)：只借鉴清晰表达原则，不分发完整标准、词典或译本；不是官方中文 STE 认证或授权产品。
- [danyuchn/asd-ste100-skill](https://github.com/danyuchn/asd-ste100-skill)：原技能来源记录中的社区参考；未复制其程序，也未把其结构检查视为中文语义或理解效果证明。

本项目不表示上述作者或组织对本技能的背书。方法建议、结构检查与实际理解收益分别取证。
