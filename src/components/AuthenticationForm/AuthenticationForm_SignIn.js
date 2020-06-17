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

export default function AuthenticationForm_SignIn(props) {
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%'
            }}
          >
            <p style={defaultInputTitleStyle}>
              {inputs.password.title ? inputs.password.title : 'Password'}
            </p>
            {props.linkToForgotPassword && (
              <button
                type='submit'
                name='forgot_password'
                onClick={props.onClickFormTypeButton}
                style={defaultForgotPasswordButtonStyle}
              >
                {props.forgotPasswordButtonTitle
                  ? props.forgotPasswordButtonTitle
                  : 'Forgot password?'}
              </button>
            )}
          </div>
          <input
            type='password'
            name='passwordInput'
            onChange={props.onChangeInput}
            value={props.input.password}
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
        {props.linkToSignUp && (
          <button
            type='submit'
            name='sign_up'
            onClick={props.onClickFormTypeButton}
            style={defaultFormStyleButton}
          >
            {props.form.TODO ? props.form.TODO : 'Create an account'}
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
