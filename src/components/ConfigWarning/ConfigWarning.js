import React from 'react'
import { css } from 'emotion'
import { configWarningCSS } from '../styles.js'

export default function ConfigWarning(props) {
  return (
    <div
      className={css`
        ${configWarningCSS}
      `}
    >
      <p style={{ fontSize: '1.5em', fontWeight: 500 }}>WARNING</p>
      {props.warnings.map((warning) => (
        <p key={warning}>{warning}</p>
      ))}
    </div>
  )
}
