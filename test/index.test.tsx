import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { NestedGrid, themeToVars } from '../src'
import type { NestedGridNode } from '../src/types'

describe('NestedGrid', () => {
  it('uses defaultColumns for the root grid', () => {
    render(<NestedGrid nodes={[{ id: 'a', title: 'A' }]} defaultColumns={3} />)

    const grid = document.querySelector('.rng-grid')

    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    })
  })

  it('applies span, rowSpan, and cellStyle to the cell wrapper', () => {
    render(
      <NestedGrid
        nodes={[
          {
            id: 'a',
            title: 'A',
            span: 2,
            rowSpan: 3,
            cellStyle: { alignSelf: 'center' },
          },
        ]}
      />,
    )

    const cell = screen.getByText('A').closest('.rng-node')

    expect(cell).toHaveStyle({
      gridColumn: 'span 2',
      gridRow: 'span 3',
      alignSelf: 'center',
    })
  })

  it('renders virtual nodes without a group wrapper', () => {
    const nodes: NestedGridNode[] = [
      {
        id: 'root',
        title: 'Root',
        children: [
          {
            id: 'virtual',
            title: 'Virtual',
            virtual: true,
            children: [{ id: 'leaf', title: 'Leaf' }],
          },
        ],
      },
    ]

    render(<NestedGrid nodes={nodes} />)

    expect(screen.queryByText('Virtual')).not.toBeInTheDocument()
    expect(screen.getByText('Leaf')).toBeInTheDocument()
    expect(document.querySelectorAll('.rng-group')).toHaveLength(1)
  })

  it('passes node metadata into renderItem and renderGroup', () => {
    const renderGroup = vi.fn(({ oriNode }) => oriNode)
    const renderItem = vi.fn(({ oriNode }) => oriNode)
    const nodes: NestedGridNode[] = [
      {
        id: 'group',
        title: 'Group',
        children: [{ id: 'item', title: 'Item' }],
      },
    ]

    render(<NestedGrid nodes={nodes} renderGroup={renderGroup} renderItem={renderItem} />)

    expect(renderGroup).toHaveBeenCalledWith(
      expect.objectContaining({
        depth: 0,
        index: 0,
        parent: undefined,
      }),
    )
    expect(renderItem).toHaveBeenCalledWith(
      expect.objectContaining({
        depth: 1,
        index: 0,
        parent: expect.objectContaining({ id: 'group' }),
      }),
    )
  })

  it('calls onNodeClick for nested nodes without bubbling to parents', () => {
    const onNodeClick = vi.fn()
    const nodes: NestedGridNode[] = [
      {
        id: 'group',
        title: 'Group',
        children: [{ id: 'item', title: 'Item' }],
      },
    ]

    render(<NestedGrid nodes={nodes} onNodeClick={onNodeClick} />)

    fireEvent.click(screen.getByText('Item'))

    expect(onNodeClick).toHaveBeenCalledTimes(1)
    expect(onNodeClick).toHaveBeenCalledWith(expect.objectContaining({ id: 'item' }))
  })
})

describe('themeToVars', () => {
  it('converts theme keys into CSS variables', () => {
    expect(
      themeToVars({
        groupBgEven: '#eee',
        itemHoverBg: '#333',
        contentAnimDuration: '150ms',
      }),
    ).toEqual({
      '--rng-group-bg-even': '#eee',
      '--rng-item-hover-bg': '#333',
      '--rng-content-anim-duration': '150ms',
    })
  })
})
