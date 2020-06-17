import React from 'react'
import FormInput from '../FormInput'
import {
  defaultTitleStyle,
  defaultInputStyle,
  defaultInputFieldStyle,
  defaultInputTitleStyle,
  defaultForgotPasswordButtonStyle,
  defaultFormStyleButton,
  defaultSubmitButtonStyle
} from '../styles.js'

export default function AuthenticationForm_SignIn(props) {
  const inputs = props.form.inputs ? props.form.inputs : []
  return (
    <div>
      {props.form.title && <p style={defaultTitleStyle}>{props.form.title}</p>}
      {inputs.hasOwnProperty('username') && (
        <FormInput
          type='text'
          name='usernameInput'
          title={inputs.username.title ? inputs.username.title : 'Username'}
          value={props.input.username}
          onChange={props.onChangeInput}
        />
      )}
      {inputs.hasOwnProperty('email') && (
        <FormInput
          type='email'
          name='emailInput'
          title={inputs.email.title ? inputs.email.title : 'Email'}
          value={props.input.email}
          onChange={props.onChangeInput}
        />
      )}
      {inputs.hasOwnProperty('password') && (
        <FormInput
          type='password'
          name='passwordInput'
          title={inputs.password.title ? inputs.password.title : 'Password'}
          helpButton={{
            title: props.forgotPasswordButtonTitle
              ? props.forgotPasswordButtonTitle
              : 'Forgot password?',
            onClick: props.onClickFormTypeButton,
            name: 'forgot_password'
          }}
          value={props.input.password}
          onChange={props.onChangeInput}
        />
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
            type='button'
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
