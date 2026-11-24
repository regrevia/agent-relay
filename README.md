# Agent Relay

轻量的外部 agent 审阅接力规范。

它解决几个常见问题。多个 agent 同时修改同一工作区，审阅对象漂移，复制整个仓库浪费 token，静态截图被误当成真实 UI 证据，以及上一轮意见无法交接到下一轮。

## 使用

```bash
node scripts/validate-handoff.mjs handoff.json
node scripts/create-prompt.mjs handoff.json review-prompt.txt
```

`handoff.json` 只保存项目根目录、入口、证据路径、审阅问题和接下来由主 agent 执行的动作。外部 agent 只读检查，原始结果应保存到 `.agent-relay/raw/`。

支持的适配方式包括 Claude Code CLI、WorkBuddy、网页端 ChatGPT、Gemini 和 DSH。网页端使用 Computer Use，命令行 agent 使用只读命令。协议本身不绑定具体模型，也不要求所有项目采用同一视觉风格。

## 运行原则

- 一个绝对 `PROJECT_ROOT`
- 一次只运行一个 reviewer
- 同一 commit、同一入口、同一证据包
- 先保存原始结果，再合并意见
- P0/P1/P2 必须带可定位证据
- 主 agent 负责修复、提交和发布

详细规范见 [SKILL.md](SKILL.md)。

## 许可证

MIT
