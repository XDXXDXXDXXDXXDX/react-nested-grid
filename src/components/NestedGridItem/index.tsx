import { type CSSProperties, type HTMLAttributes, type ReactNode, useState } from 'react'
import { Flex } from 'src/components/Flex'
import type { NestedGridNode, NestedGridTheme } from 'src/types'
import { cx } from 'src/utils'
import { themeToVars } from '../NestedGrid/themeToVars'

export interface NestedGridItemTitleExtraProps {
  expanded: boolean
}

export type NestedGridItemTitleExtra =
  | ReactNode
  | ((props: NestedGridItemTitleExtraProps) => ReactNode)

export interface NestedGridItemStyles {
  header?: CSSProperties
  body?: CSSProperties
}

export interface NestedGridItemProps<TData = unknown> extends HTMLAttributes<HTMLDivElement> {
  node: NestedGridNode<TData>
  titleExtra?: NestedGridItemTitleExtra
  showContent?: boolean
  theme?: NestedGridTheme
  styles?: NestedGridItemStyles
}

export function NestedGridItem<TData = unknown>({
  node,
  titleExtra,
  showContent = false,
  className,
  theme,
  style,
  styles,
  ...restProps
}: NestedGridItemProps<TData>) {
  const [isActive, setIsActive] = useState(false)
  const hasContent = Boolean(node.content)
  const isExpanded = showContent || (isActive && hasContent)
  const renderedTitleExtra =
    typeof titleExtra === 'function' ? titleExtra({ expanded: isExpanded }) : titleExtra
  const hasTitleExtra =
    renderedTitleExtra !== undefined && renderedTitleExtra !== null && renderedTitleExtra !== false

  return (
    <Flex
      vertical
      justify="center"
      className={cx('rng-item', isActive && 'rng-item-active', className)}
      style={{ ...themeToVars(theme), ...style }}
      {...restProps}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Flex
        align="center"
        justify="space-between"
        gap={8}
        className="rng-item-header"
        style={styles?.header}
      >
        {node.title && <div className="rng-item-title">{node.title}</div>}
        {hasTitleExtra && (
          <Flex align="center" gap={8} className="rng-item-title-extra">
            {renderedTitleExtra}
          </Flex>
        )}
      </Flex>
      {hasContent && (
        <div
          className={cx('rng-item-body', isExpanded && 'rng-item-body-expanded')}
          style={styles?.body}
        >
          <div className="rng-item-content">{node.content}</div>
        </div>
      )}
    </Flex>
  )
}
