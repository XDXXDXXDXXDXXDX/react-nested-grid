import { NestedGrid, NestedGridItem, type NestedGridTheme } from 'react-nested-grid'
import { frontendNodes, backendNodes, infraNodes } from './data'

const dot = (color: string) => (
  <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
)

const blue: NestedGridTheme = {
  groupBorder: '1px solid #bfdbfe',
  groupBgEven: '#eff6ff',
  groupBgOdd: '#dbeafe',
  groupTitleColor: '#1e40af',
  itemBorder: '1px solid #bfdbfe',
  itemHoverBg: '#3b82f6',
  itemHoverColor: '#fff',
  itemTitleFontSize: '14px',
}

const green: NestedGridTheme = {
  groupBorder: '1px solid #bbf7d0',
  groupBgEven: '#f0fdf4',
  groupBgOdd: '#dcfce7',
  groupTitleColor: '#166534',
  itemBorder: '1px solid #bbf7d0',
  itemHoverBg: '#10b981',
  itemHoverColor: '#fff',
  itemTitleFontSize: '14px',
}

const purple: NestedGridTheme = {
  groupBorder: '1px solid #ddd6fe',
  groupBgEven: '#f5f3ff',
  groupTitleColor: '#5b21b6',
  itemBorder: 'none',
  itemHoverBg: '#8b5cf6',
  itemHoverColor: '#fff',
  itemTitleFontSize: '14px',
}

export default function Example() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <NestedGrid
          nodes={frontendNodes}
          groupGap={[12, 8]}
          itemGap={8}
          theme={blue}
          renderItem={({ node }) => <NestedGridItem node={node} titleExtra={dot('#3b82f6')} />}
        />
        <NestedGrid
          nodes={backendNodes}
          groupGap={[12, 8]}
          itemGap={8}
          theme={green}
          renderItem={({ node }) => <NestedGridItem node={node} titleExtra={dot('#10b981')} />}
        />
      </div>
      <style>{`.vertical .rng-item-header { writing-mode: vertical-rl; transform: rotate(180deg); justify-content: center;}`}</style>
      <NestedGrid
        className="vertical"
        nodes={infraNodes}
        style={{ flex: '0 0 100px' }}
        itemGap={8}
        theme={purple}
      />
    </div>
  )
}
