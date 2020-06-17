import React from 'react'
import {
  defaultInputStyle,
  defaultInputFieldStyle,
  defaultInputTitleStyle,
  defaultForgotPasswordButtonStyle
} from '../styles.js'

export default function FormInput(props) {
  return (
    <div style={defaultInputStyle}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%'
        }}
      >
        <p style={defaultInputTitleStyle}>{props.title}</p>
        {props.helpButton && (
          <button
            type='button'
            name={props.helpButton.name}
            onClick={props.helpButton.onClick}
            style={defaultForgotPasswordButtonStyle}
          >
            {props.helpButton.title}
          </button>
        )}
      </div>
      <input
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        style={defaultInputFieldStyle}
      />
    </div>
  )
}
