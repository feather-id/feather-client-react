import React from 'react'
import FormInput from '../FormInput'
import { css } from 'emotion'
import {
  defaultTitleStyle,
  defaultFormStyleButton,
  defaultSubmitButtonStyle
} from '../styles.js'

export default function AuthenticationForm_ForgotPassword(props) {
  const inputs = props.form.inputs ? props.form.inputs : []
  return (
    <div>
      {props.form.title && (
        <p
          className={css`
            ${defaultTitleStyle}
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
        />
      )}
      <div
        className={css`
          display: flex;
          flex-direction: row;
          width: 100%;
        `}
      >
        <button
          type='button'
          name='sign_in'
          onClick={props.onClickFormTypeButton}
          className={css`
            ${defaultFormStyleButton}
          `}
        >
          {props.form.cancelButtonTitle
            ? props.form.cancelButtonTitle
            : 'Cancel'}
        </button>
        <button
          type='submit'
          onClick={props.onSubmit}
          className={css`
            ${defaultSubmitButtonStyle}
          `}
        >
          {props.form.submitButtonTitle
            ? props.form.submitButtonTitle
            : 'Continue'}
        </button>
      </div>
    </div>
  )
}
