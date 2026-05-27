import { createContext, useContext, type CSSProperties } from 'react'
import type { NestedGridProps, NestedGridTheme } from 'src/types'

export interface NestedGridContextValue<TData = unknown> {
  defaultColumns: number
  groupGap?: CSSProperties['gap']
  itemGap?: CSSProperties['gap']
  theme?: NestedGridTheme
  renderGroup?: NestedGridProps<TData>['renderGroup']
  renderItem?: NestedGridProps<TData>['renderItem']
}

export const NestedGridContext = createContext<NestedGridContextValue<any>>({
  defaultColumns: 1,
})

export function useNestedGridContext<TData = unknown>() {
  return useContext(NestedGridContext) as NestedGridContextValue<TData>
}
