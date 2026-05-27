import type { NestedGridProps } from 'src/types'
import { cx, toCssSize } from 'src/utils'
import { NestedGridNodes } from './renderNode'
import { NestedGridContext, type NestedGridContextValue } from './context'
import { themeToVars } from './themeToVars'

const DEFAULT_COLUMNS = 1

export function NestedGrid<TData = unknown>({
  nodes,
  defaultColumns = DEFAULT_COLUMNS,
  groupGap,
  itemGap,
  theme,
  className,
  renderGroup,
  renderItem,
  style,
  ...restProps
}: NestedGridProps<TData>) {
  const contextValue: NestedGridContextValue<TData> = {
    defaultColumns,
    groupGap: toCssSize(groupGap),
    itemGap: toCssSize(itemGap),
    theme,
    renderGroup,
    renderItem,
  }

  return (
    <NestedGridContext.Provider value={contextValue}>
      <div
        className={cx('rng-root', className)}
        style={{ ...themeToVars(theme), ...style }}
        {...restProps}
      >
        <NestedGridNodes nodes={nodes} depth={0} />
      </div>
    </NestedGridContext.Provider>
  )
}
