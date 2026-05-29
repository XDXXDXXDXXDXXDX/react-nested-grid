import type { NestedGridNode } from 'react-nested-grid'

export interface PhotoData {
  src: string
  alt: string
  aspectRatio: number
}

const photos = Array.from({ length: 36 }, (_, i) => {
  const id = i + 1
  return {
    id: `photo-${id}`,
    data: {
      src: `https://picsum.photos/seed/${id}/${400 + (id % 3) * 100}/${300 + (id % 4) * 80}`,
      alt: `Photo ${id}`,
      aspectRatio: (400 + (id % 3) * 100) / (300 + (id % 4) * 80),
    } as PhotoData,
  }
})

const largeIndices = new Set([0, 5, 11, 18, 24, 31])
const tallIndices = new Set([3, 8, 15, 21, 28, 33])
const wideIndices = new Set([7, 13, 20, 26])

export const photoNodes: NestedGridNode<PhotoData>[] = [
  {
    id: 'root',
    columns: 6,
    virtual: true,
    children: photos.map((p, i) => {
      const isLarge = largeIndices.has(i)
      const isTall = tallIndices.has(i)
      const isWide = wideIndices.has(i)

      const span = isLarge ? 2 : isWide ? 2 : 1
      const rowSpan = isLarge ? 2 : isTall ? 2 : 1

      return {
        ...p,
        span,
        rowSpan,
      }
    }),
  },
]
