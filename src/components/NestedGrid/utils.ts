import type { NestedGridNode } from 'src/types'

export function hasChildren<TData>(node: NestedGridNode<TData>) {
  return Array.isArray(node.children)
}
