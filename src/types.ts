import type { CSSProperties, HTMLAttributes, Key, ReactNode } from 'react'

export interface NestedGridTheme {
  // Group
  groupBgEven?: CSSProperties['background']
  groupBgOdd?: CSSProperties['background']
  groupBorder?: CSSProperties['border']
  groupBorderRadius?: CSSProperties['borderRadius']
  groupTitleColor?: CSSProperties['color']
  groupTitleFontSize?: CSSProperties['fontSize']
  groupTitleFontWeight?: CSSProperties['fontWeight']
  groupPadding?: CSSProperties['padding']
  groupHeaderPadding?: CSSProperties['padding']
  groupBodyPadding?: CSSProperties['padding']

  // Item
  itemBg?: CSSProperties['background']
  itemBorder?: CSSProperties['border']
  itemBorderRadius?: CSSProperties['borderRadius']
  itemShadow?: CSSProperties['boxShadow']
  itemPadding?: CSSProperties['padding']
  itemHoverBg?: CSSProperties['background']
  itemHoverColor?: CSSProperties['color']
  itemTitleFontSize?: CSSProperties['fontSize']
  itemTitleFontWeight?: CSSProperties['fontWeight']

  // Content
  contentColor?: CSSProperties['color']
  contentFontSize?: CSSProperties['fontSize']
  contentLineHeight?: CSSProperties['lineHeight']
  contentPaddingTop?: CSSProperties['paddingTop']
  contentAnimDuration?: string
}

export interface NestedGridNode<TData = unknown> {
  id: Key
  title?: ReactNode
  content?: ReactNode
  children?: NestedGridNode<TData>[]
  columns?: number
  span?: number
  rowSpan?: number
  data?: TData
}

export interface NestedGridRenderInfo<TData = unknown> {
  node: NestedGridNode<TData>
  depth: number
  index: number
  parent?: NestedGridNode<TData>
}

export interface NestedGridItemRenderProps<TData = unknown> extends NestedGridRenderInfo<TData> {
  oriNode: ReactNode
}

export interface NestedGridGroupRenderProps<TData = unknown> extends NestedGridRenderInfo<TData> {
  children: ReactNode
  oriNode: ReactNode
}

export interface NestedGridProps<TData = unknown> extends HTMLAttributes<HTMLDivElement> {
  nodes: NestedGridNode<TData>[]
  defaultColumns?: number
  groupGap?: number | string | [number | string, number | string]
  itemGap?: number | string | [number | string, number | string]
  theme?: NestedGridTheme
  onNodeClick?: (node: NestedGridNode<TData>) => void
  renderGroup?: (props: NestedGridGroupRenderProps<TData>) => ReactNode
  renderItem?: (props: NestedGridItemRenderProps<TData>) => ReactNode
}
