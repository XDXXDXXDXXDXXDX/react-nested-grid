import { NestedGrid } from 'react-nested-grid'
import { type PhotoData, photoNodes } from './data'

export default function Example() {
  return (
    <NestedGrid
      nodes={photoNodes}
      groupGap={4}
      itemGap={4}
      renderItem={({ node }) => (
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          <img
            src={(node.data as PhotoData).src}
            alt={(node.data as PhotoData).alt}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          />
        </div>
      )}
    />
  )
}
