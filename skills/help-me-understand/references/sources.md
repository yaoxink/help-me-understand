# 来源、许可与分发边界

独立分发版：1.2.0，2026-11-11。保留用户本地 help-me-understand 1.0.0 的卡点判断、中文保真、来源边界、反馈修正和教学材料；未修改本机原版。

本版将本地 visual-explainer 0.14.0 的必要图解样式、组件、SVG/Mermaid渲染、回放/联动/读者反馈及几何检查代码作为普通运行库纳入 assets/runtime（MIT，版权声明见 VISUAL-EXPLAINER-LICENSE）。这是单个Skill的支持文件，无第二个SKILL.md，不调用外部Skill。部分配套方法参考来自该版本并按独立包路径适配；原文英文文风不覆盖本入口中文保真规则。

修改：新增统一脚本入口与严格检查结果，去除远程字体链接；几何检查改为禁网、内存载入生成HTML，不导航文件URL或使用用户登录浏览器；新增本机浏览器探测与真实SVG/PNG/PDF导出；增加禁JS时完整图可读且隐藏失效播放器的静态回退，PDF图形导出按图尺寸单页排版避免裁切。修改后的源码仅位于本发布包。

Pele离线Mermaid引擎及其图标许可见 assets/runtime/kit/vendor/PELE-LICENSE。浏览器客户端 playwright-core 1.64.1 按Apache-2.0分发，保留 assets/runtime/browser-client/LICENSE、NOTICE及其附带第三方许可文件。未随包提供浏览器二进制。已剔除浏览器客户端中仅供其CLI安装用的Skill文档与示例，保留API运行代码及许可证；本包没有这些嵌套技能。

需要 Node.js 20+，真实页面检查/导出需要本机 Chrome/Edge/Chromium。包已含JavaScript依赖，不需其他Skill、npm下载、API密钥或付费服务。缺少工具不等于通过，按入口报告未完成项。

中文表达借鉴清晰技术表达目标，不是官方中文STE规范、完整译本或认证。教学材料与模型均为自拟，不是真实研究或产品证据。具体行为与输出验收由包外报告给出，引用案例不等于案例已通过。
