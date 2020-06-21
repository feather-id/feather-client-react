import React from 'react'
import FormInput from '../FormInput'
import { css } from 'emotion'

// TODO Custom checkboxes (e.g. for TOS/Privacy/etc.)

export default function AuthenticationForm_SignUp(props) {
  const inputs = props.form.inputs ? props.form.inputs : []
  return (
    <div>
      {props.form.title && (
        <p
          className={css`
            ${props.styles.title}
          `}
        >
          {props.form.title}
        </p>
      )}
      {inputs.hasOwnProperty('email') && (
        <FormInput
          type='email'
          name='emailInput'
          title={inputs.email.title ? inputs.email.title : 'Email'}
          placeholder={inputs.email.placeholder}
          value={props.input.email}
          onChange={props.onChangeInput}
          styles={props.styles}
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
          styles={props.styles}
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
          styles={props.styles}
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
              ${props.styles.secondaryCtaButton}
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
            ${props.styles.primaryCtaButton}
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
