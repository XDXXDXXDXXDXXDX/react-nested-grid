import styles from './styles.css?inline'

export const STYLE_ELEMENT_ID = 'react-nested-grid-styles'

export function injectStyles(cssText = styles) {
  if (!cssText || typeof document === 'undefined') {
    return
  }

  let styleElement = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null

  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = STYLE_ELEMENT_ID
    styleElement.setAttribute('data-react-nested-grid', '')
    document.head.appendChild(styleElement)
  }

  if (styleElement.textContent !== cssText) {
    styleElement.textContent = cssText
  }
}

injectStyles()
