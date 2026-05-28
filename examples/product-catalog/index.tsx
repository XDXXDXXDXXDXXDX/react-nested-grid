import { NestedGrid, NestedGridGroup, NestedGridItem } from 'react-nested-grid'
import { catalog, highlights, tagColors, type ProductData } from './data'

export default function Example() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <NestedGrid
        nodes={catalog}
        groupGap={[16, 8]}
        itemGap={8}
        theme={{
          groupBorder: 'none',
          groupTitleColor: '#4338ca',
          groupBgEven: '#eef2ff',
          groupBgOdd: '#e0e7ff',
          itemBorder: 'none',
          itemShadow: '0 1px 3px rgb(0 0 0 / 8%)',
          itemHoverBg: '#4338ca',
          itemHoverColor: '#ffffff',
          contentAnimDuration: '150ms',
        }}
        renderGroup={({ node, children }) => (
          <NestedGridGroup node={node}>{children}</NestedGridGroup>
        )}
        renderItem={({ node }) => (
          <NestedGridItem
            node={node}
            showContent={(node.data as ProductData)?.featured}
            titleExtra={
              (node.data as ProductData)?.tag
                ? ({ expanded }) => {
                    const c = tagColors[(node.data as ProductData).tag!]
                    return (
                      <span
                        style={{
                          padding: '1px 8px',
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 600,
                          background: c.bg,
                          color: c.text,
                          opacity: expanded ? 1 : 0.7,
                          transition: 'opacity 150ms',
                        }}
                      >
                        {(node.data as ProductData).tag}
                      </span>
                    )
                  }
                : undefined
            }
          />
        )}
      />
      <style>{`.vertical .rng-item-header { writing-mode: vertical-rl; transform: rotate(180deg); justify-content: center; }`}</style>
      <NestedGrid
        className="vertical"
        nodes={highlights}
        style={{ flex: '0 0 100px' }}
        itemGap={8}
        theme={{
          groupBorder: 'none',
          groupTitleColor: '#4338ca',
          groupBgEven: '#eef2ff',
          itemBorder: 'none',
          itemHoverBg: '#4338ca',
          itemHoverColor: '#ffffff',
          itemTitleFontSize: '14px',
        }}
      />
    </div>
  )
}
