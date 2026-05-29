# react-nested-grid

A lightweight React component for rendering JSON-driven nested grid layouts.

![demo](./examples/example.png)

## Install

```bash
npm install react-nested-grid
```

## Quick Start

```tsx
import { NestedGrid, type NestedGridNode } from 'react-nested-grid'

const nodes: NestedGridNode[] = [
  {
    id: 'inventory',
    title: 'Inventory',
    columns: 2,
    children: [
      {
        id: 'electronics',
        title: 'Electronics',
        children: [
          { id: 'laptop', title: 'Laptop', content: '14" and 16" models in stock' },
          { id: 'monitor', title: 'Monitor', content: '4K USB-C displays' },
        ],
      },
      {
        id: 'furniture',
        title: 'Furniture',
        children: [
          { id: 'desk', title: 'Desk', content: 'Adjustable standing desks' },
          { id: 'chair', title: 'Chair', content: 'Ergonomic mesh chairs' },
        ],
      },
    ],
  },
]

export function App() {
  return <NestedGrid nodes={nodes} />
}
```

More examples in [`examples/`](./examples).

## Node Schema

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

- A node with `children` is a **group**; without `children` it is an **item**.
- `title` is shown in the group header or item header. Optional — nodes without a title still participate in layout.
- `content` is hidden by default and expands on hover (items only). Use `showContent` to keep it always visible.
- `columns` sets `grid-template-columns` of the node's child grid. A `number` is shorthand for `repeat(n, minmax(0, 1fr))`. Pass a `string` for any valid CSS value (e.g. `"200px 1fr 1fr"`). Falls back to `defaultColumns` (default `1`).
- `span` makes the node span multiple columns in its parent grid. Maps to `gridColumn: span {n}`.
- `rowSpan` makes the node span multiple rows in its parent grid. Maps to `gridRow: span {n}`.
- `virtual` makes the node layout-only — no group wrapper is rendered, children are placed directly in the cell. Useful for root nodes that only provide a `columns` grid.
- `gridStyle` passes additional CSS properties to the child grid container (e.g. `gridAutoRows`, `alignItems`). Merged after `columns`, `gap`, etc.
- `cellStyle` passes additional CSS properties to the cell wrapper (e.g. `alignSelf`, `justifySelf`, `order`). Merged after `span` / `rowSpan`.
- `data` is an arbitrary payload forwarded to render callbacks. Access it via `node.data` in `renderItem`/`renderGroup`.

## Usage

### NestedGrid

The root component. All props except `nodes` are optional.

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

`groupGap` / `itemGap` accept a single value or a `[row, column]` tuple. Every grid level auto-detects whether it contains groups or only items and picks the matching gap.

### NestedGridGroup & NestedGridItem

The default group and item components. Both support `theme`, `styles`, and standard HTML attributes.

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

| NestedGridItem props | Type | Description |
|---|---|---|
| `node` | `NestedGridNode` | The node to render |
| `titleExtra` | `ReactNode \| ({ expanded }) => ReactNode` | Content beside the title |
| `showContent` | `boolean` (default `false`) | Keep content always visible |
| `styles` | `{ header?, body? }` | Inline styles for sub-elements |
| `theme` | `NestedGridTheme` | Per-component theme override |

| NestedGridGroup props | Type | Description |
|---|---|---|
| `node` | `NestedGridNode` | The group node |
| `children` | `ReactNode` | The rendered child grid |
| `styles` | `{ header?, body? }` | Inline styles for sub-elements |
| `theme` | `NestedGridTheme` | Per-component theme override |

Both extend `HTMLAttributes<HTMLDivElement>`, so `className`, `style`, `onClick`, etc. are also accepted.

### Custom Rendering

`renderGroup` and `renderItem` replace the default rendering. Both callbacks receive:

```ts
{ node, depth, index, parent, oriNode }
```

`renderGroup` also receives `children` (the already-rendered child grid). `oriNode` is the default component — use it when you only need to add a wrapper.

```tsx
<NestedGrid
  nodes={nodes}
  renderItem={({ node, oriNode }) => (
    <a href={`/items/${node.id}`}>{oriNode}</a>
  )}
/>
```

### Context & Utilities

`useNestedGridContext()` returns `{ defaultColumns, groupGap, itemGap, theme, showContent, onNodeClick }` for building custom components.

`themeToVars(theme)` converts a `NestedGridTheme` to a CSS-variable style object.

## Styling

### Theme

The `theme` prop sets CSS custom properties, inherited by all descendants. Pass it on `NestedGrid`, `NestedGridGroup`, or `NestedGridItem` — the closest ancestor wins.

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

All keys are prefixed with `--rng-` (e.g. `groupBgEven` → `--rng-group-bg-even`).

| Group | CSS property | Default |
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

| Item | CSS property | Default |
|---|---|---|
| `itemBorder` | `border` | `1px solid #e5e7eb` |
| `itemBorderRadius` | `border-radius` | `4px` |
| `itemBg` | `background` | `#ffffff` |
| `itemShadow` | `box-shadow` | — |
| `itemPadding` | `padding` | `10px 12px` |
| `itemHoverBg` | `background` (hover) | `#f3f4f6` |
| `itemHoverColor` | `color` (hover) | — |
| `itemTitleFontSize` | `font-size` | — |
| `itemTitleFontWeight` | `font-weight` | `600` |

| Content | CSS property | Default |
|---|---|---|
| `contentColor` | `color` | — |
| `contentFontSize` | `font-size` | `13px` |
| `contentLineHeight` | `line-height` | `20px` |
| `contentPaddingTop` | `padding-top` (expanded) | `8px` |
| `contentAnimDuration` | transition duration | `200ms` |

### Depth Classes

Every cell wrapper automatically gets `rng-depth-{n}`, `rng-depth-even` / `rng-depth-odd`.

```css
.rng-depth-0 > .rng-group { border-width: 2px; }
.rng-depth-even > .rng-group { background: #f1f5f9; }
```

### Direct Class Overrides

Stable `rng-*` classes for anything `theme` doesn't cover:

```css
.rng-item-title { text-transform: uppercase; }
.rng-node { min-width: 200px; }
```
