import type { CSSProperties } from 'react'
import type { NestedGridNode } from 'src/types'
import { NestedGridItem } from 'src/components/NestedGridItem'
import { NestedGridGroup } from 'src/components/NestedGridGroup'
import { hasChildren } from './utils'
import { useNestedGridContext } from './context'

export interface NestedGridNodesProps<TData = unknown> {
  nodes: NestedGridNode<TData>[]
  depth: number
  parent?: NestedGridNode<TData>
  parentColumns?: number
}

export function NestedGridNodes<TData = unknown>({
  nodes,
  depth,
  parent,
  parentColumns,
}: NestedGridNodesProps<TData>) {
  const { defaultColumns, groupGap, itemGap } = useNestedGridContext<TData>()
  const columns = parentColumns || defaultColumns
  const hasGroup = nodes.some((n) => hasChildren(n))
  const resolvedGap = hasGroup ? groupGap : itemGap

  return (
    <div
      className="rng-grid"
      style={
        {
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          ...(resolvedGap === undefined ? {} : { gap: resolvedGap }),
        } as CSSProperties
      }
    >
      {nodes.map((node, index) => (
        <NodeRenderer key={node.id} node={node} depth={depth} index={index} parent={parent} />
      ))}
    </div>
  )
}

interface NodeRendererProps<TData = unknown> {
  node: NestedGridNode<TData>
  depth: number
  index: number
  parent?: NestedGridNode<TData>
}

function NodeRenderer<TData = unknown>({ node, depth, index, parent }: NodeRendererProps<TData>) {
  const { renderGroup, renderItem, onNodeClick } = useNestedGridContext<TData>()
  const cellStyle: CSSProperties = {
    ...(node.span && { gridColumn: `span ${node.span}` }),
    ...(node.rowSpan && { gridRow: `span ${node.rowSpan}` }),
  }
  const depthClass = `rng-depth-${depth} ${depth % 2 === 0 ? 'rng-depth-even' : 'rng-depth-odd'}`
  const cellClass = `rng-node ${depthClass}`

  if (hasChildren(node)) {
    const renderedChildren = (
      <NestedGridNodes
        nodes={node.children ?? []}
        depth={depth + 1}
        parent={node}
        parentColumns={node.columns}
      />
    )

    if (node.virtual) {
      return (
        <div
          className={cellClass}
          style={cellStyle}
          onClick={(e) => {
            e.stopPropagation()
            onNodeClick?.(node)
          }}
        >
          {renderedChildren}
        </div>
      )
    }

    const defaultGroup = <NestedGridGroup node={node}>{renderedChildren}</NestedGridGroup>

    return (
      <div
        className={cellClass}
        style={cellStyle}
        onClick={(e) => {
          e.stopPropagation()
          onNodeClick?.(node)
        }}
      >
        {renderGroup
          ? renderGroup({
              node,
              depth,
              index,
              parent,
              children: renderedChildren,
              oriNode: defaultGroup,
            })
          : defaultGroup}
      </div>
    )
  }

  const defaultItem = <NestedGridItem node={node} />

  return (
    <div
      className={cellClass}
      style={cellStyle}
      onClick={(e) => {
        e.stopPropagation()
        onNodeClick?.(node)
      }}
    >
      {renderItem
        ? renderItem({
            node,
            depth,
            index,
            parent,
            oriNode: defaultItem,
          })
        : defaultItem}
    </div>
  )
}
