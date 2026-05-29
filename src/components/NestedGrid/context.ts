import { type CSSProperties, createContext, useContext } from 'react'
import type { NestedGridProps, NestedGridTheme } from 'src/types'

export interface NestedGridContextValue<TData = unknown> {
  defaultColumns: number
  gridStyle?: CSSProperties
  groupGap?: CSSProperties['gap']
  itemGap?: CSSProperties['gap']
  theme?: NestedGridTheme
  showContent?: boolean
  onNodeClick?: NestedGridProps<TData>['onNodeClick']
  renderGroup?: NestedGridProps<TData>['renderGroup']
  renderItem?: NestedGridProps<TData>['renderItem']
}

export const NestedGridContext = createContext<NestedGridContextValue<any>>({
  defaultColumns: 1,
})

export function useNestedGridContext<TData = unknown>() {
  return useContext(NestedGridContext) as NestedGridContextValue<TData>
}
