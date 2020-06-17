import React from 'react'
import {
  defaultTitleStyle,
  defaultInputStyle,
  defaultInputFieldStyle,
  defaultInputTitleStyle,
  defaultForgotPasswordButtonStyle,
  defaultFormStyleButton,
  defaultSubmitButtonStyle
} from '../styles.js'

export default function AuthenticationForm_ForgotPassword(props) {
  const inputs = props.form.inputs ? props.form.inputs : []
  return (
    <div>
      {props.form.title && <p style={defaultTitleStyle}>{props.form.title}</p>}
      {inputs.hasOwnProperty('email') && (
        <div style={defaultInputStyle}>
          <p style={defaultInputTitleStyle}>
            {inputs.email.title ? inputs.email.title : 'Email'}
          </p>
          <input
            type='email'
            name='emailInput'
            onChange={props.onChangeInput}
            value={props.input.email}
            style={defaultInputFieldStyle}
          />
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%'
        }}
      >
        <button
          type='button'
          name='sign_in'
          onClick={props.onClickFormTypeButton}
          style={defaultFormStyleButton}
        >
          {props.form.cancelButtonTitle
            ? props.form.cancelButtonTitle
            : 'Cancel'}
        </button>
        <button
          type='submit'
          onClick={props.onSubmit}
          style={defaultSubmitButtonStyle}
        >
          {props.form.submitButtonTitle
            ? props.form.submitButtonTitle
            : 'Continue'}
        </button>
      </div>
    </div>
  )
}
