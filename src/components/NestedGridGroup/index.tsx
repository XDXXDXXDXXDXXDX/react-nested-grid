import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { Flex } from 'src/components/Flex'
import type { NestedGridNode, NestedGridTheme } from 'src/types'
import { cx } from 'src/utils'
import { themeToVars } from '../NestedGrid/themeToVars'

export interface NestedGridGroupStyles {
  header?: CSSProperties
  body?: CSSProperties
}

export interface NestedGridGroupProps<TData = unknown> extends HTMLAttributes<HTMLDivElement> {
  node: NestedGridNode<TData>
  children: ReactNode
  theme?: NestedGridTheme
  styles?: NestedGridGroupStyles
}

export function NestedGridGroup<TData = unknown>({
  node,
  children,
  className,
  theme,
  style,
  styles,
  ...restProps
}: NestedGridGroupProps<TData>) {
  return (
    <Flex
      vertical
      className={cx('rng-group', className)}
      style={{ ...themeToVars(theme), ...style }}
      {...restProps}
    >
      {node.title && (
        <div className="rng-group-header" style={styles?.header}>
          <div className="rng-group-title">{node.title}</div>
        </div>
      )}
      <div className="rng-group-body" style={styles?.body}>
        {children}
      </div>
    </Flex>
  )
}
