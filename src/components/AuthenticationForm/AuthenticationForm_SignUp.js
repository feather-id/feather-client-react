import React from 'react'
import {
  defaultTitleStyle,
  defaultInputStyle,
  defaultInputFieldStyle,
  defaultInputTitleStyle,
  defaultForgotPasswordButtonStyle,
  defaultFormStyleButton,
  defaultSubmitButtonStyle
} from './AuthenticationFormStyles.js'

// TODO Custom checkboxes (e.g. for TOS/Privacy/etc.)

export default function AuthenticationForm_SignUp(props) {
  const inputs = props.form.inputs ? props.form.inputs : []
  return (
    <div>
      {props.form.title && <p style={defaultTitleStyle}>{props.form.title}</p>}
      {inputs.hasOwnProperty('username') && (
        <div style={defaultInputStyle}>
          <p style={defaultInputTitleStyle}>
            {inputs.username.title ? inputs.username.title : 'Username'}
          </p>
          <input
            type='text'
            name='usernameInput'
            onChange={props.onChangeInput}
            value={props.input.username}
            style={defaultInputFieldStyle}
          />
        </div>
      )}
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
      {inputs.hasOwnProperty('password') && (
        <div style={defaultInputStyle}>
          <p style={defaultInputTitleStyle}>
            {inputs.password.title ? inputs.password.title : 'Password'}
          </p>
          <input
            type='password'
            name='passwordInput'
            onChange={props.onChangeInput}
            value={props.input.password}
            style={defaultInputFieldStyle}
          />
        </div>
      )}
      {inputs.hasOwnProperty('confirmPassword') && (
        <div style={defaultInputStyle}>
          <p style={defaultInputTitleStyle}>
            {inputs.confirmPassword.title
              ? inputs.confirmPassword.title
              : 'Confirm password'}
          </p>
          <input
            type='password'
            name='confirmPasswordInput'
            onChange={props.onChangeInput}
            value={props.input.confirmPassword}
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
        {props.linkToSignIn && (
          <button
            type='button'
            name='sign_in'
            onClick={props.onClickFormTypeButton}
            style={defaultFormStyleButton}
          >
            {props.form.TODO ? props.form.TODO : 'I have an account'}
          </button>
        )}
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
