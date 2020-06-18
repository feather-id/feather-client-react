import React from 'react'
import FormInput from '../FormInput'
import { css } from 'emotion'
import { defaultStyles } from '../styles.js'

// TODO Custom checkboxes (e.g. for TOS/Privacy/etc.)

export default function AuthenticationForm_SignUp(props) {
  const inputs = props.form.inputs ? props.form.inputs : []
  return (
    <div>
      {props.form.title && (
        <p
          className={css`
            ${defaultStyles.title}
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
        className={css`
          display: flex;
          flex-direction: row;
          width: 100%;
        `}
      >
        {props.linkToSignIn && (
          <button
            type='button'
            name='sign_in'
            onClick={props.onClickFormTypeButton}
            className={css`
              ${defaultStyles.secondaryCtaButton}
            `}
          >
            {props.form.secondaryCtaButtonTitle
              ? props.form.secondaryCtaButtonTitle
              : 'I have an account'}
          </button>
        )}
        <button
          type='submit'
          onClick={props.onSubmit}
          className={css`
            ${defaultStyles.primaryCtaButton}
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
