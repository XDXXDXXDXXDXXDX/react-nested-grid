import { useState } from 'react'
import ProductCatalog from './product-catalog'
import ArchitectureDiagram from './architecture-diagram'

const examples = [
  { key: 'product-catalog', label: 'Product Catalog', Component: ProductCatalog },
  { key: 'architecture-diagram', label: 'Architecture Diagram', Component: ArchitectureDiagram },
]

export function App() {
  const [active, setActive] = useState(examples[0].key)
  const Example = examples.find((e) => e.key === active)!.Component

  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <h1 className="app-title">react-nested-grid</h1>
        <nav className="app-nav">
          {examples.map(({ key, label }) => (
            <button
              key={key}
              className={`app-nav-btn${active === key ? ' app-nav-btn--active' : ''}`}
              onClick={() => setActive(key)}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="app-main">
        <Example />
      </main>
    </div>
  )
}
