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

## Node Schema

```ts
interface NestedGridNode<TData = unknown> {
  id: React.Key
  title?: React.ReactNode
  content?: React.ReactNode
  children?: NestedGridNode<TData>[]
  columns?: number
  span?: number
  data?: TData
}
```

- A node with `children` is a **group**; without `children` it is an **item**.
- `columns` sets how many columns the node's child grid uses. Falls back to `defaultColumns` (default `1`).
- `span` makes the node span multiple columns in its parent grid.
- `data` is an arbitrary payload passed through to render callbacks.

## Components

### NestedGrid

The root component. Accepts a `nodes` array and renders the full nested grid.

```tsx
<NestedGrid
  nodes={nodes}
  defaultColumns={3}
  groupGap={12}
  itemGap={8}
  renderGroup={...}
  renderItem={...}
/>
```

### NestedGridItem

The default leaf item. Content is hidden at rest and expands on hover. Exported so custom `renderItem` implementations can reuse it.

```tsx
import { NestedGrid, NestedGridItem } from 'react-nested-grid'
;<NestedGrid
  nodes={nodes}
  renderItem={({ node }) => (
    <NestedGridItem node={node} showContent titleExtra={({ expanded }) => (expanded ? '▼' : '▶')} />
  )}
/>
```

| Prop          | Type                                       | Default  | Description                               |
| ------------- | ------------------------------------------ | -------- | ----------------------------------------- |
| `node`        | `NestedGridNode`                           | required | The node to render                        |
| `titleExtra`  | `ReactNode \| ({ expanded }) => ReactNode` | —        | Content beside the title                  |
| `showContent` | `boolean`                                  | `false`  | Always show content instead of hover-only |
| `className`   | `string`                                   | —        | Additional CSS class                      |
| `style`       | `CSSProperties`                            | —        | Inline styles                             |

### NestedGridGroup

The default group wrapper. Renders the group border, title header, and body area. Exported for use in custom `renderGroup` implementations.

```tsx
import { NestedGrid, NestedGridGroup } from 'react-nested-grid'
;<NestedGrid
  nodes={nodes}
  renderGroup={({ node, children, depth }) => (
    <NestedGridGroup node={node} style={{ background: depth % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
      {children}
    </NestedGridGroup>
  )}
/>
```

| Prop        | Type             | Description              |
| ----------- | ---------------- | ------------------------ |
| `node`      | `NestedGridNode` | The group node to render |
| `children`  | `ReactNode`      | The rendered child grid  |
| `className` | `string`         | Additional CSS class     |
| `style`     | `CSSProperties`  | Inline styles            |

### themeToVars

`themeToVars(theme)` converts a `NestedGridTheme` to a CSS-variable style object. All built-in components use it internally — pass a `theme` prop to any of them to set/override variables at that level.

```tsx
import { NestedGridGroup, themeToVars } from 'react-nested-grid'

;<NestedGridGroup node={node} theme={{ groupBorder: '2px solid red' }}>
  ...
</NestedGridGroup>
```

## Custom Rendering

Both `renderGroup` and `renderItem` let you replace the default rendering. They share a common shape:

```ts
{
  node // the current node
  depth // nesting depth (root = 0)
  index // position within siblings
  parent // parent node (undefined at root)
  oriNode // the default rendered element
}
```

`renderGroup` also receives `children` (the already-rendered child grid).

Custom render results are placed inside a framework-managed wrapper div that handles grid placement (`gridColumn` span, `min-width`). You only need to focus on content and styling.

```tsx
<NestedGrid
  nodes={nodes}
  renderGroup={({ node, children, depth, oriNode }) => (
    <NestedGridGroup node={node} style={{ background: depth === 0 ? '#f0fdf4' : undefined }}>
      {children}
    </NestedGridGroup>
  )}
  renderItem={({ node, oriNode }) => (
    <a href={`/item/${node.id}`} style={{ textDecoration: 'none' }}>
      {oriNode}
    </a>
  )}
/>
```

## Custom Design

### Theme

The `theme` prop is the recommended way to customize appearance. It accepts a flat object of CSS values, which are set as CSS custom properties on the root element and inherited by all children.

```tsx
import { NestedGrid, type NestedGridTheme } from 'react-nested-grid'

const theme: NestedGridTheme = {
  // Group
  groupBorder: 'none',
  groupTitleColor: '#2563eb',
  groupBgEven: '#eff6ff',
  groupBgOdd: '#dbeafe',

  // Item
  itemBorder: 'none',
  itemShadow: '0 2px 6px rgb(0 0 0 / 6%)',
  itemHoverBg: '#2563eb',
  itemHoverColor: '#ffffff',

  // Content
  contentFontSize: '13px',
  contentColor: '#64748b',
  contentAnimDuration: '150ms',
}

<NestedGrid nodes={nodes} theme={theme} />
```

| Theme key                    | CSS property             | Default             |
| ---------------------------- | ------------------------ | ------------------- |
| `groupBorder`                | `border`                 | `1px solid #e5e7eb` |
| `groupBorderRadius`          | `border-radius`          | `8px`               |
| `groupBgEven` / `groupBgOdd` | `background`             | —                   |
| `groupTitleColor`            | `color`                  | —                   |
| `groupTitleFontSize`         | `font-size`              | —                   |
| `groupTitleFontWeight`       | `font-weight`            | `600`               |
| `groupHeaderPadding`         | `padding`                | `8px 16px`          |
| `groupBodyPadding`           | `padding`                | `0 16px 8px`        |
| `itemBorder`                 | `border`                 | `1px solid #e5e7eb` |
| `itemBorderRadius`           | `border-radius`          | `4px`               |
| `itemBg`                     | `background`             | `#ffffff`           |
| `itemShadow`                 | `box-shadow`             | —                   |
| `itemPadding`                | `padding`                | `10px 12px`         |
| `itemHoverBg`                | `background` (hover)     | `#f3f4f6`           |
| `itemHoverColor`             | `color` (hover)          | —                   |
| `itemTitleFontSize`          | `font-size`              | —                   |
| `itemTitleFontWeight`        | `font-weight`            | `600`               |
| `contentColor`               | `color`                  | —                   |
| `contentFontSize`            | `font-size`              | `13px`              |
| `contentLineHeight`          | `line-height`            | `20px`              |
| `contentPaddingTop`          | `padding-top` (expanded) | `8px`               |
| `contentAnimDuration`        | transition duration      | `200ms`             |

### Depth Classes

Every grid cell wrapper receives `rng-depth-{n}`, `rng-depth-even` (or `rng-depth-odd`) classes automatically, so you can style by nesting level without manual `className` logic.

```css
/* first-level group border */
.rng-depth-0 > .rng-group {
  border-width: 2px;
}

/* alternating group backgrounds via depth classes */
.rng-depth-even > .rng-group {
  background: #f1f5f9;
}
.rng-depth-odd > .rng-group {
  background: #ffffff;
}
```

### CSS Class Overrides

All components expose stable `rng-*` class names. Override them directly when you need control beyond what `theme` provides.

```css
.rng-item-title {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.rng-item-content-panel {
  transition-duration: 150ms;
}

.rng-node {
  min-width: 200px;
}
```

## Props Reference

```ts
interface NestedGridTheme {
  groupBgEven?: CSSProperties['background']
  groupBgOdd?: CSSProperties['background']
  groupBorder?: CSSProperties['border']
  groupBorderRadius?: CSSProperties['borderRadius']
  groupTitleColor?: CSSProperties['color']
  groupTitleFontSize?: CSSProperties['fontSize']
  groupTitleFontWeight?: CSSProperties['fontWeight']
  groupHeaderPadding?: CSSProperties['padding']
  groupBodyPadding?: CSSProperties['padding']
  itemBg?: CSSProperties['background']
  itemBorder?: CSSProperties['border']
  itemBorderRadius?: CSSProperties['borderRadius']
  itemShadow?: CSSProperties['boxShadow']
  itemPadding?: CSSProperties['padding']
  itemHoverBg?: CSSProperties['background']
  itemHoverColor?: CSSProperties['color']
  itemTitleFontSize?: CSSProperties['fontSize']
  itemTitleFontWeight?: CSSProperties['fontWeight']
  contentColor?: CSSProperties['color']
  contentFontSize?: CSSProperties['fontSize']
  contentLineHeight?: CSSProperties['lineHeight']
  contentPaddingTop?: CSSProperties['paddingTop']
  contentAnimDuration?: string
}

interface NestedGridProps<TData = unknown> {
  nodes: NestedGridNode<TData>[]
  defaultColumns?: number // default 1
  groupGap?: number | string | [number | string, number | string]
  itemGap?: number | string | [number | string, number | string]
  className?: string
  renderGroup?: (props: NestedGridGroupRenderProps<TData>) => ReactNode
  renderItem?: (props: NestedGridItemRenderProps<TData>) => ReactNode
}

interface NestedGridGroupProps<TData = unknown> {
  node: NestedGridNode<TData>
  children: ReactNode
  className?: string
  style?: CSSProperties
}

interface NestedGridItemProps<TData = unknown> {
  node: NestedGridNode<TData>
  titleExtra?: ReactNode | ((props: { expanded: boolean }) => ReactNode)
  showContent?: boolean
  className?: string
  style?: CSSProperties
}
```

## Build

```bash
npm install
npm run build
```

The library build uses Vite library mode. React is externalized, declarations are generated by `vite-plugin-dts`, and styles are inlined into the package entry so consumers do not need a separate CSS import.

## Local Development

```bash
npm run dev
```

The Vite dev server serves the `examples` directory. The package name is aliased to `src/index.ts`, so source changes hot reload while keeping the example close to real package usage. See the `examples/` folder for a complete working example.
