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

// TODO Custom checkboxes (e.g. for TOS/Privacy/etc.)

export default function AuthenticationForm_SignUp(props) {
  const inputs = props.form.inputs ? props.form.inputs : []
  return (
    <div>
      {props.form.title && <p style={defaultTitleStyle}>{props.form.title}</p>}
      {inputs.hasOwnProperty('username') && (
        <FormInput
          type='text'
          name='usernameInput'
          title={inputs.username.title ? inputs.username.title : 'Username'}
          placeholder={inputs.username.placeholder}
          value={props.input.username}
          onChange={props.onChangeInput}
        />
      )}
      {inputs.hasOwnProperty('email') && (
        <FormInput
          type='email'
          name='emailInput'
          title={inputs.email.title ? inputs.email.title : 'Email'}
          placeholder={inputs.email.placeholder}
          value={props.input.email}
          onChange={props.onChangeInput}
        />
      )}
      {inputs.hasOwnProperty('password') && (
        <FormInput
          type='password'
          name='passwordInput'
          title={inputs.password.title ? inputs.password.title : 'Password'}
          placeholder={inputs.password.placeholder}
          value={props.input.password}
          onChange={props.onChangeInput}
        />
      )}
      {inputs.hasOwnProperty('confirmPassword') && (
        <FormInput
          type='password'
          name='confirmPasswordInput'
          title={
            inputs.confirmPassword.title
              ? inputs.confirmPassword.title
              : 'Confirm password'
          }
          placeholder={inputs.confirmPassword.placeholder}
          value={props.input.confirmPassword}
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
