# AGENTS.md

## Build

```bash
npm run build    # vite build && tsc && tsc-alias --dir dist
npm run dev      # vite dev server → examples/
npm run format   # biome format --write
npm run lint     # biome check
```

## Rules

- 每次新增或修改功能后，执行 `npm run build` 确认编译通过。
- 使用 `npm run format` 格式化代码（biome）。
- 同步更新 `README.md`（英文）和 `README.zh-CN.md`（中文），保持内容一致。
- 文档要简练，不写啰嗦的说明，多用示例。
- 源码中不使用注释，除非要解释非显而易见的 WHY。
- 不引入不必要的抽象，不改动无关代码。
