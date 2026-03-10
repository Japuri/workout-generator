import React from 'react'

function Loader() {
  const dotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#aaa',
    animation: 'bounce 1.2s infinite ease-in-out',
  }

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '0.75rem 1rem',
        background: '#444654',
        borderRadius: '10px',
        alignSelf: 'flex-start',
        maxWidth: '80px',
      }}>
        <div style={{ ...dotStyle, animationDelay: '0s' }} />
        <div style={{ ...dotStyle, animationDelay: '0.2s' }} />
        <div style={{ ...dotStyle, animationDelay: '0.4s' }} />
      </div>
    </>
  )
}

export default Loader

