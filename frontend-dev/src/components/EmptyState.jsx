import React from 'react'

function EmptyState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#aaa',
        gap: '1rem',
      }}
    >
      <h2 style={{ fontSize: '1.8rem', color: '#ececec' }}>Welcome!</h2>
      <p>Start a new conversation by typing a message below.</p>
      <p style={{ fontSize: '0.85rem', color: '#888' }}>
        This AI can only discuss specific topics.
      </p>
    </div>
  )
}

export default EmptyState
