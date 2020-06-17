import React from 'react'

export default function AuthenticationForm_ComponentConfigWarning(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        background: '#f00',
        color: '#fff',
        padding: '16px'
      }}
    >
      <p style={{ fontSize: '1.5em', fontWeight: 500 }}>WARNING</p>
      {props.warnings.map((warning) => (
        <p key={warning}>{warning}</p>
      ))}
    </div>
  )
}
