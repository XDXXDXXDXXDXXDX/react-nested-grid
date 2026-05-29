# react-nested-grid

轻量级 React 组件，用于渲染 JSON 驱动的嵌套网格布局。

![demo](./examples/example.png)

## 安装

```bash
npm install react-nested-grid
```

## 快速开始

```tsx
import { NestedGrid, type NestedGridNode } from 'react-nested-grid'

const nodes: NestedGridNode[] = [
  {
    id: 'inventory',
    title: '库存管理',
    columns: 2,
    children: [
      {
        id: 'electronics',
        title: '电子产品',
        children: [
          { id: 'laptop', title: '笔记本电脑', content: '14" 和 16" 型号有货' },
          { id: 'monitor', title: '显示器', content: '4K USB-C 显示器' },
        ],
      },
      {
        id: 'furniture',
        title: '家具',
        children: [
          { id: 'desk', title: '办公桌', content: '可调节升降桌' },
          { id: 'chair', title: '办公椅', content: '人体工学网布椅' },
        ],
      },
    ],
  },
]

export function App() {
  return <NestedGrid nodes={nodes} />
}
```

更多示例见 [`examples/`](./examples)。

## 节点结构

```ts
interface NestedGridNode<TData = unknown> {
  id: React.Key
  title?: React.ReactNode
  content?: React.ReactNode
  children?: NestedGridNode<TData>[]
  columns?: number | string
  span?: number
  rowSpan?: number
  virtual?: boolean
  gridStyle?: CSSProperties
  cellStyle?: CSSProperties
  data?: TData
}
```

- 有 `children` 的为**分组**（group），没有的为**条目**（item）。
- `title` 显示在 group 或 item 的头部。可选 — 没有标题的节点仍参与布局。
- `content` 默认隐藏，hover 时展开（仅 item 有效）。使用 `showContent` 可始终显示。
- `columns` 设置节点子网格的 `grid-template-columns`。`number` 为 `repeat(n, minmax(0, 1fr))` 快捷方式。传 `string` 可使用任意 CSS 值（如 `"200px 1fr 1fr"`）。未设时回退到 `defaultColumns`（默认 `1`）。
- `span` 让节点在父网格中跨多列。映射为 `gridColumn: span {n}`。
- `rowSpan` 让节点在父网格中跨多行。映射为 `gridRow: span {n}`。
- `virtual` 设为 true 时该节点仅用于布局，不渲染 group 包装，子节点直接放入网格单元。适合仅提供 `columns` 的根节点。
- `gridStyle` 向子网格容器透传额外 CSS 属性（如 `gridAutoRows`、`alignItems`）。在 `columns`、`gap` 之后合并。
- `cellStyle` 向单元容器透传额外 CSS 属性（如 `alignSelf`、`justifySelf`、`order`）。在 `span` / `rowSpan` 之后合并。
- `data` 为自定义数据，透传到 `renderItem` / `renderGroup` 回调中，通过 `node.data` 访问。

## 使用

### NestedGrid

根组件。除 `nodes` 外所有属性均可选。

```tsx
<NestedGrid
  nodes={nodes}
  defaultColumns={3}
  groupGap={12}
  itemGap={8}
  showContent
  onNodeClick={(node) => console.log(node.id)}
  theme={{ itemHoverBg: '#2563eb', itemHoverColor: '#fff' }}
/>
```

`groupGap` / `itemGap` 接受单值或 `[行间距, 列间距]` 元组。每层网格自动检测是否包含 group，自动选用对应间距。

### NestedGridGroup & NestedGridItem

默认的分组和条目组件。均支持 `theme`、`styles` 和标准 HTML 属性。

```tsx
import { NestedGrid, NestedGridGroup, NestedGridItem } from 'react-nested-grid'

<NestedGrid
  nodes={nodes}
  renderGroup={({ node, children, depth }) => (
    <NestedGridGroup node={node} styles={{ header: { borderBottom: '1px solid #ddd' } }}>
      {children}
    </NestedGridGroup>
  )}
  renderItem={({ node }) => (
    <NestedGridItem
      node={node}
      showContent
      titleExtra={({ expanded }) => (expanded ? '▼' : '▶')}
      styles={{ header: { writingMode: 'vertical-rl' } }}
    />
  )}
/>
```

| NestedGridItem 属性 | 类型 | 说明 |
|---|---|---|
| `node` | `NestedGridNode` | 要渲染的节点 |
| `titleExtra` | `ReactNode \| ({ expanded }) => ReactNode` | 标题旁的额外内容 |
| `showContent` | `boolean`（默认 `false`） | 始终展示内容 |
| `styles` | `{ header?, body? }` | 子元素内联样式 |
| `theme` | `NestedGridTheme` | 单组件主题覆盖 |

| NestedGridGroup 属性 | 类型 | 说明 |
|---|---|---|
| `node` | `NestedGridNode` | 要渲染的分组节点 |
| `children` | `ReactNode` | 已渲染的子网格 |
| `styles` | `{ header?, body? }` | 子元素内联样式 |
| `theme` | `NestedGridTheme` | 单组件主题覆盖 |

两者均继承 `HTMLAttributes<HTMLDivElement>`，`className`、`style`、`onClick` 等也可使用。

### 自定义渲染

`renderGroup` 和 `renderItem` 替换默认渲染。回调参数：

```ts
{ node, depth, index, parent, oriNode }
```

`renderGroup` 额外接收 `children`（已渲染的子网格）。`oriNode` 为默认组件，只加包装时直接用。

```tsx
<NestedGrid
  nodes={nodes}
  renderItem={({ node, oriNode }) => (
    <a href={`/items/${node.id}`}>{oriNode}</a>
  )}
/>
```

### Context & 工具函数

`useNestedGridContext()` 返回 `{ defaultColumns, groupGap, itemGap, theme, showContent, onNodeClick }`，用于构建自定义组件。

`themeToVars(theme)` 将 `NestedGridTheme` 转为 CSS 变量 style 对象。

## 样式

### Theme

`theme` 属性设置 CSS 自定义属性，所有子组件继承。可传给 `NestedGrid`、`NestedGridGroup` 或 `NestedGridItem`，最近祖先优先。

```tsx
import { type NestedGridTheme } from 'react-nested-grid'

const theme: NestedGridTheme = {
  groupBorder: 'none',
  groupBgEven: '#eef2ff',
  groupBgOdd: '#e0e7ff',
  groupTitleColor: '#4338ca',

  itemBorder: 'none',
  itemShadow: '0 1px 3px rgb(0 0 0 / 8%)',
  itemHoverBg: '#4338ca',
  itemHoverColor: '#fff',

  contentFontSize: '13px',
  contentColor: '#64748b',
  contentAnimDuration: '150ms',
}
```

所有 key 前缀为 `--rng-`（如 `groupBgEven` → `--rng-group-bg-even`）。

| Group | CSS 属性 | 默认值 |
|---|---|---|
| `groupBorder` | `border` | `1px solid #e5e7eb` |
| `groupBorderRadius` | `border-radius` | `8px` |
| `groupBg` | `background` | — |
| `groupBgEven` | `background` | — |
| `groupBgOdd` | `background` | — |
| `groupTitleColor` | `color` | — |
| `groupTitleFontSize` | `font-size` | — |
| `groupTitleFontWeight` | `font-weight` | `600` |
| `groupPadding` | `padding` | `8px 16px` |
| `groupHeaderPadding` | `padding` | `0` |
| `groupBodyPadding` | `padding` | `8px 0 0` |

| Item | CSS 属性 | 默认值 |
|---|---|---|
| `itemBorder` | `border` | `1px solid #e5e7eb` |
| `itemBorderRadius` | `border-radius` | `4px` |
| `itemBg` | `background` | `#ffffff` |
| `itemShadow` | `box-shadow` | — |
| `itemPadding` | `padding` | `10px 12px` |
| `itemHoverBg` | `background`（hover） | `#f3f4f6` |
| `itemHoverColor` | `color`（hover） | — |
| `itemTitleFontSize` | `font-size` | — |
| `itemTitleFontWeight` | `font-weight` | `600` |

| Content | CSS 属性 | 默认值 |
|---|---|---|
| `contentColor` | `color` | — |
| `contentFontSize` | `font-size` | `13px` |
| `contentLineHeight` | `line-height` | `20px` |
| `contentPaddingTop` | `padding-top`（展开时） | `8px` |
| `contentAnimDuration` | 过渡动画时长 | `200ms` |

### 深度类名

每个 cell 自动添加 `rng-depth-{n}`、`rng-depth-even` / `rng-depth-odd`。

```css
.rng-depth-0 > .rng-group { border-width: 2px; }
.rng-depth-even > .rng-group { background: #f1f5f9; }
```

### CSS 类名覆盖

`theme` 无法覆盖的细节，可直接覆盖 `rng-*` 类名：

```css
.rng-item-title { text-transform: uppercase; }
.rng-node { min-width: 200px; }
```
