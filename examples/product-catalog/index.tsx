import { NestedGrid, NestedGridItem } from 'react-nested-grid'
import { nodes, type ProductData, tagColors } from './data'

export default function Example() {
  return (
    <NestedGrid
      nodes={nodes}
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
      renderItem={({ node, parent }) => (
        <NestedGridItem
          node={node}
          showContent={(node.data as ProductData)?.featured}
          styles={
            parent?.id === 'highlights'
              ? {
                  header: {
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    justifyContent: 'center',
                  },
                }
              : undefined
          }
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
  )
}
