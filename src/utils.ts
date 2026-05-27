export type ClassNameValue = string | false | null | undefined

export function cx(...classNames: ClassNameValue[]) {
  return classNames.filter(Boolean).join(' ')
}

export type CssSize = number | string

export function toCssSize(value: CssSize | [CssSize, CssSize] | undefined): string | undefined {
  if (value === undefined) return undefined
  if (typeof value === 'number') return `${value}px`
  if (Array.isArray(value))
    return value.map((v) => (typeof v === 'number' ? `${v}px` : v)).join(' ')
  return value
}
