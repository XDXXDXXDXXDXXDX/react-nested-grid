import type { CSSProperties, HTMLAttributes } from 'react'
import { cx, toCssSize, type CssSize } from 'src/utils'

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  vertical?: boolean
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  gap?: CssSize | [CssSize, CssSize]
  flex?: CSSProperties['flex']
  wrap?: boolean | CSSProperties['flexWrap']
}

export function Flex({
  vertical = false,
  align,
  justify,
  gap,
  flex,
  wrap = false,
  className,
  style,
  ...restProps
}: FlexProps) {
  const flexWrap = typeof wrap === 'boolean' ? (wrap ? 'wrap' : undefined) : wrap
  const flexStyle = {
    alignItems: align,
    justifyContent: justify,
    gap: toCssSize(gap),
    flex,
    flexWrap,
    flexDirection: vertical ? 'column' : 'row',
    ...style,
  } as CSSProperties

  return <div className={cx('rng-flex', className)} style={flexStyle} {...restProps} />
}
