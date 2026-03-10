import React from 'react'

function FormComponent({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: 500 }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.6rem 0.8rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '0.95rem',
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}

export default FormComponent
