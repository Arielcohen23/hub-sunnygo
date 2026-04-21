import { useRef, useState } from 'react'

export default function ListeDynamique({ items, onChange, renderItem, onAdd, addLabel }) {
  const dragIndex = useRef(null)
  const [dragOver, setDragOver] = useState(null)

  function handleDragStart(e, index) {
    dragIndex.current = index
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(e, index) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOver(index)
  }

  function handleDrop(e, index) {
    e.preventDefault()
    setDragOver(null)
    if (dragIndex.current === null || dragIndex.current === index) return
    const newItems = [...items]
    const [removed] = newItems.splice(dragIndex.current, 1)
    newItems.splice(index, 0, removed)
    dragIndex.current = null
    onChange(newItems)
  }

  function handleDragEnd() {
    dragIndex.current = null
    setDragOver(null)
  }

  function handleDelete(index) {
    const newItems = items.filter((_, i) => i !== index)
    onChange(newItems)
  }

  function handleItemChange(index, value) {
    const newItems = items.map((item, i) => i === index ? value : item)
    onChange(newItems)
  }

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        overflow: 'hidden',
      }}
    >
      {items.length === 0 && (
        <div
          style={{
            padding: '20px',
            textAlign: 'center',
            color: '#9CA3AF',
            fontSize: '13px',
            fontFamily: 'Quicksand, sans-serif',
          }}
        >
          Aucun élément — cliquez sur &quot;{addLabel}&quot; pour ajouter
        </div>
      )}

      {items.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={e => handleDragStart(e, index)}
          onDragOver={e => handleDragOver(e, index)}
          onDrop={e => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            padding: '10px 12px',
            background: dragOver === index
              ? 'rgba(4,37,91,0.05)'
              : index % 2 === 0
                ? '#F9FAFB'
                : 'white',
            borderBottom: index < items.length - 1 ? '1px solid #F3F4F6' : 'none',
            borderTop: dragOver === index ? '2px solid #04255B' : '2px solid transparent',
            transition: 'background 0.15s',
          }}
        >
          {/* Drag handle */}
          <span
            style={{
              cursor: 'grab',
              color: '#D1D5DB',
              fontSize: '16px',
              lineHeight: 1,
              paddingTop: '2px',
              flexShrink: 0,
              userSelect: 'none',
            }}
            title="Glisser pour réordonner"
          >
            ⠿
          </span>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {renderItem(item, index, (newVal) => handleItemChange(index, newVal))}
          </div>

          {/* Delete button */}
          <button
            onClick={() => handleDelete(index)}
            title="Supprimer"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#D1D5DB',
              fontSize: '16px',
              padding: '2px 4px',
              borderRadius: '4px',
              flexShrink: 0,
              lineHeight: 1,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
            onMouseLeave={e => e.currentTarget.style.color = '#D1D5DB'}
          >
            🗑
          </button>
        </div>
      ))}

      {/* Add button */}
      {onAdd && (
        <div style={{ padding: '10px 12px', borderTop: items.length > 0 ? '1px solid #F3F4F6' : 'none' }}>
          <button
            onClick={onAdd}
            style={{
              background: 'none',
              border: '1.5px dashed #D1D5DB',
              borderRadius: '8px',
              color: '#6B7280',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              padding: '8px 16px',
              cursor: 'pointer',
              width: '100%',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#04255B'
              e.currentTarget.style.color = '#04255B'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#D1D5DB'
              e.currentTarget.style.color = '#6B7280'
            }}
          >
            + {addLabel}
          </button>
        </div>
      )}
    </div>
  )
}
