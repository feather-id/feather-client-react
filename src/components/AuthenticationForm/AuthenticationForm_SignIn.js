import React from 'react'
import FormInput from '../FormInput'
import { css } from 'emotion'
import { defaultStyle } from '../styles.js'

// defaultTitleStyle,
// defaultFormStyleButton,
// defaultSubmitButtonStyle

export default function AuthenticationForm_SignIn(props) {
  const inputs = props.form.inputs ? props.form.inputs : []
  return (
    <div>
      {props.form.title && (
        <p
          className={css`
            ${defaultStyle.title}
          `}
        >
          {props.form.title}
        </p>
      )}
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
          helpButton={
            props.linkToForgotPassword && {
              title: inputs.password.forgotPasswordButtonTitle
                ? inputs.password.forgotPasswordButtonTitle
                : 'Forgot password?',
              onClick: props.onClickFormTypeButton,
              name: 'forgot_password'
            }
          }
          value={props.input.password}
          onChange={props.onChangeInput}
        />
      )}
      <div
        className={css`
          display: flex;
          flex-direction: row;
          width: 100%;
        `}
      >
        {props.linkToSignUp && (
          <button
            type='button'
            name='sign_up'
            onClick={props.onClickFormTypeButton}
            className={css`
              ${defaultStyle.secondaryCtaButton}
            `}
          >
            {props.form.secondaryCtaButtonTitle
              ? props.form.secondaryCtaButtonTitle
              : 'Create an account'}
          </button>
        )}
        <button
          type='submit'
          onClick={props.onSubmit}
          className={css`
            ${defaultStyle.primaryCtaButton}
          `}
        >
          {props.form.primaryCtaButtonTitle
            ? props.form.primaryCtaButtonTitle
            : 'Continue'}
        </button>
      </div>
    </div>
  )
}
