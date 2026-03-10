import React from 'react'

function Message({ variant = 'error', children }) {
  const colors = {
    error: '#f8d7da',
    success: '#d4edda',
    info: '#d1ecf1',
  }
  return (
    <div
      style={{
        background: colors[variant] || colors.info,
        padding: '0.75rem 1rem',
        borderRadius: '6px',
        marginBottom: '1rem',
        color: '#333',
      }}
    >
      {children}
    </div>
  )
}

export default Message
